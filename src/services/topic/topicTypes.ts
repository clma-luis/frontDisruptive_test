export interface TopicResponseService {
  message: string;
  result: TopicResult;
  ok: boolean;
}

export interface TopicResult {
  data: Topic[];
  page: number;
  total: number;
  totalPages: number;
}

export interface Topic {
  title: string;
  categories: string[];
  videoYoutube?: string;
  image?: string;
  pdf?: string;
  id: string;
}

//=================================================
//==============GET ONE TOPIC======================
//=================================================

export interface OneTopicResponseService {
  message: string;
  result: Topic;
  ok: boolean;
}
