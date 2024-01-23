import { execSync } from 'child_process';
import path from 'path';
import { PhotoMetadata } from './exiftool.types';

export const extractCreationDate = (dirPath: string) => {
  const photosPath = path.join(dirPath);

  const supportedExtensions = '-ext jpg -ext jpeg -ext png -ext cr2';
  const exiftoolCmd = `exiftool -datetimeoriginal ${photosPath} -j ${supportedExtensions}`;

  const exiftoolOutput = execSync(exiftoolCmd);

  return JSON.parse(exiftoolOutput.toString()) as PhotoMetadata[];
};

export const geotagPhotos = (dirPath: string, gpxFilePath: string) => {
  const photosPath = path.join(dirPath);
  const gpxPath = path.join(gpxFilePath);
  const exiftoolCmd = `exiftool -geotag ${gpxPath} ${photosPath}`;

  execSync(exiftoolCmd);
};
