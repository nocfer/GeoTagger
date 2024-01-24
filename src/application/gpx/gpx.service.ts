import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { create, convert } from 'xmlbuilder2';
import { GPXFile } from './gpx.types';

const DEFAULT_FILE_PATH = 'out/newGPX.gpx';

export const loadGPX = (filePath: string) => {
  const GPX = convert(readFileSync(filePath, 'utf8'), {
    format: 'object'
  });

  return GPX as GPXFile;
};

export const buildGPX = (obj: GPXFile, filePath?: string, options?: { writeFile?: boolean }) => {
  const destinationPath = path.join(__dirname, filePath || DEFAULT_FILE_PATH);

  const gpx = create(obj);

  const gpxFile = gpx.end({ prettyPrint: true });

  if (options?.writeFile) writeFileSync(destinationPath, gpxFile);

  return gpxFile;
};

export const findClosestGPXLogTime = (gpx: GPXFile, date: Date) => {
  const positions = gpx['gpx']['trk']['trkseg']['trkpt'];
  let delta: number | undefined = undefined;
  let nearestPosition = positions[0];

  for (const position of positions) {
    const positionTime = new Date(position['time']).getTime();

    if (!delta) {
      delta = positionTime;
    }

    const deltaAbs = Math.abs(positionTime - date.getTime());
    if (deltaAbs <= delta) {
      delta = deltaAbs;
      nearestPosition = { ...position };
    }
  }

  return { ...nearestPosition, time: date.toISOString() };
};
