import { Cloudinary } from '@cloudinary/url-gen';

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'dcyou1pdh', // Thay bằng tên Cloud Name của bạn
  },
});

export default cloudinary;
