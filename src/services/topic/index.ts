import { GET_ALL_VALUE } from "@/shared/constants/defaultConsts";
import { ErrorResponse } from "@/shared/interfaces";
import { Pagination } from "@/shared/interfaces/general";
import { connection } from "../config/connection";
import { HEADERS_MULTIPART } from "../config/const";
import { TOPIC_PATHS_SERVICE } from "./topicPaths";
import { OneTopicResponseService, TopicResponseService } from "./topicTypes";

const API = connection();

const { CREATE_TOPIC_PATH, GET_ALL_TOPICS_PATH, GET_ONE_TOPIC_PATH, GET_ALL_TOPICS_BY_CATEGORY_ID_PATH } = TOPIC_PATHS_SERVICE;

export interface TopicPagination extends Pagination {
  category?: string;
}

export const createTopic = async (body: FormData): Promise<OneTopicResponseService | ErrorResponse> => {
  const response = await API.post(CREATE_TOPIC_PATH, body);
  return response;
};

export const getOneTopic = async (id: string): Promise<OneTopicResponseService | ErrorResponse> => {
  const response = await API.get(GET_ONE_TOPIC_PATH.replace(":id", id));
  return response;
};

export const getAllTopics = async (pagination: TopicPagination): Promise<TopicResponseService | ErrorResponse> => {
  const { page = "1", size = "10", category = "", term = "" } = pagination || {};
  let currentCategoryQuery = ":currentCategory";
  let currentCategoryValue = category;

  if (category === GET_ALL_VALUE || !category) {
    currentCategoryQuery = "&category=:currentCategory";
    currentCategoryValue = "";
  }

  const currentPath = GET_ALL_TOPICS_PATH.replace(":currentpage", page)
    .replace(":currentsize", size)
    .replace(":term", term)
    .replace(currentCategoryQuery, currentCategoryValue);
  const response = await API.get(currentPath);

  return response;
};

export const getTopicsByCategoryId = async (id: string): Promise<TopicResponseService | ErrorResponse> => {
  const response = await API.get(GET_ALL_TOPICS_BY_CATEGORY_ID_PATH.replace(":id", id));
  return response;
};
