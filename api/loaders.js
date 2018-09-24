import ky from "ky";

const fakeLoadTime = (min = 200, max = 800) =>
  Math.floor(Math.random() * max + min);
const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));

export const loadCreditsComponent = async () => {
  await sleep(fakeLoadTime());
  return import("../components/Credits");
};

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
    // Workaround weird chrome cache problems with Image.onload when it's already loaded/cached
    const timeout = setTimeout(() => resolve(src), 5000);

    image.addEventListener("load", () => {
      clearTimeout(timeout);
      resolve(src);
    });
    image.addEventListener("error", reject);

    setTimeout(() => {
      image.src = src;
    }, fakeLoadTime(500, 3000));
  });

export const loadVideo = src =>
  new Promise((resolve, reject) => {
    const video = document.createElement("video");
    // Workaround weird chrome cache problems with Video.canplay when it's already loaded/cached
    const timeout = setTimeout(() => resolve(src), 5000);

    video.addEventListener("canplay", () => {
      clearTimeout(timeout);
      resolve(src);
    });
    video.addEventListener("error", reject);

    setTimeout(() => {
      video.src = src;
    }, fakeLoadTime(1000, 3000));
  });

export const loadProduct = async slug => {
  await sleep(fakeLoadTime());
  return ky.get(`/api/products/${slug}`).json();
};

export const loadProducts = async () => {
  await sleep(fakeLoadTime());
  return ky.get("/api/products").json();
};
