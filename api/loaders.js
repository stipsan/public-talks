import ky from "ky";

export const loadProductsListComponent = () =>
  import("../components/ProductsList");

export const loadProductDetailsComponent = () =>
  import("../components/ProductDetails");

// Preloaders
export const loadImage = src =>
  new Promise((resolve, reject) => {
    const image = new Image();
    // Workaround weird chrome cache problems with Image.onload when it's already loaded/cached
    const timeout = setTimeout(() => resolve(src), 5000);

    image.addEventListener("load", () => {
      clearTimeout(timeout);
      resolve(src);
    });
    image.addEventListener("error", () => resolve(src));

    image.src = src;
  });
export const loadVideo = src =>
  new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.muted = true;

    // Workaround weird chrome cache problems with Video.canplay when it's already loaded/cached
    const timeout = setTimeout(() => resolve(src), 5000);

    video.addEventListener("canplay", () => {
      clearTimeout(timeout);
      resolve(src);
    });
    video.addEventListener("error", () => resolve(src));

    video.src = src;
  });

export const loadProduct = slug => ky.get(`/api/products/${slug}`).json();

export const loadProducts = () => ky.get("/api/products").json();
