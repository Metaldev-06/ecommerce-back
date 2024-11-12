import { v2 as Cloudinary } from 'cloudinary';

import { envs } from '@/config';

const { cloudName, apiKey, apiSecret } = envs.cloudinary;

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return Cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  },
};
