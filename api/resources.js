import { createResource } from "simple-cache-provider";

export const ImageResource = createResource(
  src =>
    new Promise((resolve, reject) => {
      const image = new Image();

      image.addEventListener("load", () => resolve(src));
      image.addEventListener("error", reject);

      image.src = src;
    })
);
