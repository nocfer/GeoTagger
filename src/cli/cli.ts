import { Command } from 'commander';
import { geotag } from '../application/geotagger';

const program = new Command();

program
  .command('tag')
  .description(
    'Geotag photos using a gpx file. The programs looks up the closest gpx log time for each photo creation time and then tags it with the gps coordinates from the gpx file'
  )
  .requiredOption('-d, --photos-dir <dirPath>', 'The directory path of the photos to tag')
  .requiredOption('-gpx, --gpx <gpxPath>', 'The path to the gpx file to use to geotag the photos')
  .action((dirPath: string, gpxFilePath: string) => geotag(dirPath, gpxFilePath));

export const start = () => program.parse();
