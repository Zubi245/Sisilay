import Product from "../models/products";

export async function getProducts() {
  return Product.find();
}

export async function createProduct(data: any) {
  return Product.create(data);
}
