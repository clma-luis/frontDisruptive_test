export const TOPIC_PATHS_SERVICE = {
  GET_ALL_TOPICS_PATH: "/api/topic/getAll?page=:currentpage&size=:currentsize&category=:currentCategory&term=:term",
  GET_ONE_TOPIC_PATH: "/api/topic/getOne/:id",
  REMOVE_ONE_TOPIC_PATH: "/api/topic/removeOne/:id",
  UPDATE_CATEGORIES_IN_TOPIC_PATH: "/api/topic/updateCategoriesInTopic/:id",
  UPDATE_TOPIC_PATH: "/api/topic/updateOne/:id",
  GET_ALL_TOPICS_BY_CATEGORY_ID_PATH: "/api/topic/findCategoryById/:id",
};
