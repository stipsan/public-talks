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

export const VideoResource = createResource(
  src =>
    new Promise((resolve, reject) => {
      const video = document.createElement("video");

      video.addEventListener("canplay", () => resolve(src));
      video.addEventListener("error", reject);

      video.src = src;
    })
);

export const ProductResource = createResource(async slug => {
  const res = await fetch(`/api/products/${slug}`);
  return res.json();
});

export const ProductsResource = createResource(async () => {
  const res = await fetch("/api/products");
  return res.json();
});
