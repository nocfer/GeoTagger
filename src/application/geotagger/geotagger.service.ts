import moment from 'moment';
import { extractCreationDate, geotagPhotos } from '../exiftool';
import { loadGPX } from '../gpx';
import { buildGPX, findClosestGPXLogTime } from '../gpx/gpx.service';

export const geotag = (photosDir: string, gpxFilePath: string) => {
  const gpx = loadGPX(gpxFilePath);

  const photosCreationDates = extractCreationDate(photosDir);

  const mapped = photosCreationDates.map((photo) => {
    const parsedPhotoDate = moment(photo.DateTimeOriginal, 'YYYY:MM:DD HH:mm:ss').toDate();

    return findClosestGPXLogTime(gpx, parsedPhotoDate);
  });

  const newGPX = { ...gpx };

  newGPX.gpx.trk.trkseg.trkpt = mapped;

  buildGPX(newGPX, 'out/newGPX.gpx', { writeFile: true });

  geotagPhotos(photosDir, 'out/newGPX.gpx');
};
