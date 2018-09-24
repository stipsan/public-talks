import { createResource } from "simple-cache-provider";

import { loadVideo, loadImage, loadProduct, loadProducts } from "./loaders";

export const ImageResource = createResource(loadImage);

export const VideoResource = createResource(loadVideo);

export const ProductResource = createResource(loadProduct);

export const ProductsResource = createResource(loadProducts);
