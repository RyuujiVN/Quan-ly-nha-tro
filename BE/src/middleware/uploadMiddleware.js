import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'

cloudinary.config({
  cloud_name: 'de16pxlgo',
  api_key: '246251184537799',
  api_secret: 'Gt_QN21vOidcx_MSW5cpdt-57Xk' // Click 'View API Keys' above to copy your API secret
});


const uploadCloudinary = (req, res, next) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      // console.log(req.file)
      req.body[req.file.fieldname] = result.secure_url
      next()
    }

    upload(req);
  }
  else {
    next();
  }
}

const uploadMiddleware = {
  uploadCloudinary
}

export default uploadMiddleware