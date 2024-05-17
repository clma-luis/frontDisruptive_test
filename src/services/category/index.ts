import { ErrorResponse } from "@/shared/interfaces";
import { connection } from "../config/connection";
import { CATEGORY_PATHS_SERVICE } from "./categoryPaths";
import { CategoriesResponseService } from "./categoryTypes";

const API = connection();

const { GET_ALL_CATEGORIES } = CATEGORY_PATHS_SERVICE;

export const getAllCategories = async (): Promise<CategoriesResponseService | ErrorResponse> => {
  const response = await API.get(GET_ALL_CATEGORIES);
  return response;
};
