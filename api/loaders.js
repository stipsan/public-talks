import ky from "ky";

export const loadImage = src =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(src));
    image.addEventListener("error", reject);

    image.src = src;
  });

export const loadVideo = src =>
  new Promise((resolve, reject) => {
    const video = document.createElement("video");

    video.addEventListener("canplay", () => resolve(src));
    video.addEventListener("error", reject);

    video.src = src;
  });

export const loadProduct = slug => ky.get(`/api/products/${slug}`).json();

export const loadProducts = () => ky.get("/api/products").json();
