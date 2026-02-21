import Category from "../models/category";

export async function getCategories() {
  return Category.find();
}

export async function createCategory(data: any) {
  return Category.create(data);
}
