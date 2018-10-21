import ky from "ky";

// Preloaders don't need to reject (if they fail then the render should proceed)
export const loadImage = src =>
  new Promise(resolve => {
    const image = new Image();
    // Workaround weird chrome cache problems with Image.onload when it's already loaded/cached
    const timeout = setTimeout(() => resolve(src), 1000);

    image.addEventListener("load", () => {
      resolve(src);
      clearTimeout(timeout);
    });
    image.addEventListener("error", () => resolve(src));

    image.src = src;
  });
export const loadVideo = src =>
  new Promise(resolve => {
    const video = document.createElement("video");
    video.muted = true;

    // Workaround weird chrome cache problems with Video.canplay when it's already loaded/cached
    const timeout = setTimeout(() => resolve(src), 1000);

    video.addEventListener("canplay", () => {
      resolve(src);
      clearTimeout(timeout);
    });
    video.addEventListener("error", () => resolve(src));

    video.src = src;
  });

export const loadProduct = slug => ky.get(`/api/products/${slug}`).json();

export const loadProducts = () => ky.get("/api/products").json();
