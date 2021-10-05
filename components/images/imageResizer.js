import Resizer from "react-image-file-resizer";

export const imageResizer = (files, setImages) => {

    for (let i = 0; i < files.length; i++){
        try {
          Resizer.imageFileResizer(
            files[i],
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
              setImages((prevImages) => [...prevImages, uri])
            },
            "base64",
            200,
            200
          );
        } catch (err) {
          console.log(err)
        }
      }

}