export type GPXFile = {
  [key: string]: string | unknown;
  gpx: {
    '@version': string;
    '@creator': string;
    '@xmlns:xsi': string;
    '@xmlns': string;
    '@xsi:schemaLocation': string;
    trk: {
      name: string;
      trkseg: {
        trkpt: {
          '@lat': string;
          '@lon': string;
          ele: string;
          time: string;
          src: string;
        }[];
      };
    };
  };
};
