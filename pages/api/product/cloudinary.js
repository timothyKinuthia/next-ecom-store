import cloudinary from "cloudinary";
import dbConnect from "../../../utils/dbConnect";

export default async function imagesUpload(req, res) {
  await dbConnect();

  switch (req.method) {
    case "POST":
      await upload(req, res);
      break;
  }
}

const upload = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
  try {
    const { imagefiles } = req.body;

    let imgArr = [];

    for (let image of imagefiles) {
      const res = await cloudinary.uploader.upload(image, {
        upload_preset: "cpz79l5h",
      });

      imgArr.push({ url: res.secure_url, public_id: res.public_id });
    }

    res.status(201).json({ imgs: imgArr });
  } catch (err) {
    console.log(err);
  }
};

// exports.removeImage = async(req, res, next) => {
//     try {
//         await cloudinary.v2.uploader.destroy(req.body.id, (err, payload) => {
//             if (err) {
//                 return res.status(400).json({ msg: "failed to remove image" });
//             }
//             res.status(204).json({ msg: "deleted image" });
//         })

//     } catch (err) {
//         next(err)
//     }
// }
