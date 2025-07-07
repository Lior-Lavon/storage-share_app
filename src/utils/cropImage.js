// export default function getCroppedImg(imageSrc, pixelCrop) {
//   return new Promise((resolve) => {
//     const image = new Image();
//     image.src = imageSrc;
//     image.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = pixelCrop.width;
//       canvas.height = pixelCrop.height;
//       const ctx = canvas.getContext("2d");

//       ctx.beginPath();
//       ctx.arc(
//         pixelCrop.width / 2,
//         pixelCrop.height / 2,
//         pixelCrop.width / 2,
//         0,
//         2 * Math.PI
//       );
//       ctx.closePath();
//       ctx.clip();

//       ctx.drawImage(
//         image,
//         pixelCrop.x,
//         pixelCrop.y,
//         pixelCrop.width,
//         pixelCrop.height,
//         0,
//         0,
//         pixelCrop.width,
//         pixelCrop.height
//       );

//       canvas.toBlob((blob) => {
//         resolve(blob);
//       }, "image/jpeg");
//     };
//   });
// }

// export default function getCroppedImg(imageSrc, pixelCrop, circular = false) {
//   return new Promise((resolve, reject) => {
//     const image = new Image();
//     image.src = imageSrc;
//     image.onload = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");

//       canvas.width = pixelCrop.width;
//       canvas.height = pixelCrop.height;

//       if (circular) {
//         // Create a circular clipping path
//         ctx.beginPath();
//         ctx.arc(
//           pixelCrop.width / 2,
//           pixelCrop.height / 2,
//           pixelCrop.width / 2,
//           0,
//           2 * Math.PI
//         );
//         ctx.closePath();
//         ctx.clip();
//       }

//       ctx.drawImage(
//         image,
//         pixelCrop.x,
//         pixelCrop.y,
//         pixelCrop.width,
//         pixelCrop.height,
//         0,
//         0,
//         pixelCrop.width,
//         pixelCrop.height
//       );

//       const mimeType = circular ? "image/png" : "image/jpeg"; // JPEG doesn't support transparency
//       resolve(canvas.toDataURL(mimeType));
//     };
//     image.onerror = reject;
//   });
// }

/**
 * @param {string} imageSrc - base64 image or data URL
 * @param {object} pixelCrop - { x, y, width, height }
 * @param {boolean} circular - whether to crop in a circular shape
 * @param {'blob' | 'base64'} outputType - determines the return type
 * @returns {Promise<Blob | string>}
 */
export default function getCroppedImg(
  imageSrc,
  pixelCrop,
  circular = false,
  outputType = "base64"
) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      if (circular) {
        ctx.beginPath();
        ctx.arc(
          pixelCrop.width / 2,
          pixelCrop.height / 2,
          pixelCrop.width / 2,
          0,
          2 * Math.PI
        );
        ctx.closePath();
        ctx.clip();
      }

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      // const mimeType = circular ? "image/png" : "image/jpeg";
      const mimeType = "image/jpeg";

      if (outputType === "blob") {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to convert canvas to blob"));
          }
        }, mimeType);
      } else {
        // Default: return base64 string
        const base64Data = canvas.toDataURL(mimeType);
        resolve(base64Data);
      }
    };

    image.onerror = () => reject(new Error("Failed to load image"));
  });
}
