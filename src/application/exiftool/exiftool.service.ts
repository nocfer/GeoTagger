import path from 'path';
import env from '../../config/env';
import { execSync } from 'child_process';
import { PhotoMetadata } from './exiftool.types';

const CONFIG_PATH = path.join(__dirname, env.exiftool.configFile);

export const extractCreationDate = (dirPath: string) => {
  const photosPath = path.join(dirPath);

  const supportedExtensions = env.exiftool.supportedExtensions
    .split(';')
    .map((ext) => `-ext ${ext}`)
    .join(' ');

  const exiftoolCmd = `exiftool -config ${CONFIG_PATH} ${photosPath} -date ${supportedExtensions} -j`;

  const exiftoolOutput = execSync(exiftoolCmd);

  return JSON.parse(exiftoolOutput.toString()) as PhotoMetadata[];
};

export const geotagPhotos = (dirPath: string, gpxFilePath: string) => {
  const photosPath = path.join(dirPath);
  const gpxPath = path.join(gpxFilePath);
  const exiftoolCmd = `exiftool -geotag ${gpxPath} ${photosPath}`;

  execSync(exiftoolCmd);
};
