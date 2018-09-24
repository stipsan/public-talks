import ky from "ky";

const fakeLoadTime = () => Math.floor(Math.random() * 900 + 300);
const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));

export const loadProductsListComponent = async () => {
  await sleep(fakeLoadTime());
  return import("../components/ProductsList");
};

export const loadProductDetailsComponent = async () => {
  await sleep(fakeLoadTime());
  return import("../components/ProductDetails");
};

export const loadImage = src =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(src));
    image.addEventListener("error", reject);

    setTimeout(() => {
      image.src = src;
    }, fakeLoadTime());
  });

export const loadVideo = src =>
  new Promise((resolve, reject) => {
    const video = document.createElement("video");

    video.addEventListener("canplay", () => resolve(src));
    video.addEventListener("error", reject);

    setTimeout(() => {
      video.src = src;
    }, fakeLoadTime());
  });

export const loadProduct = async slug => {
  await sleep(fakeLoadTime());
  return ky.get(`/api/products/${slug}`).json();
};

export const loadProducts = async () => {
  await sleep(fakeLoadTime());
  return ky.get("/api/products").json();
};
