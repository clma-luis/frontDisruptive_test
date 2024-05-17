export interface CategoriesResponseService {
  message: string;
  result: ResultCategory[];
  ok: boolean;
}

export interface ResultCategory {
  name: string;
  id: string;
}
