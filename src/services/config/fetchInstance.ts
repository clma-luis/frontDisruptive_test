import { BASE_URL_API } from "@/shared/config";
import { getLocalStorage } from "@/shared/utils/localStorageUtils";
import { HEADERS_APPLICATION_JSON } from "./const";
import { TOKEN } from "@/shared/constants/localStorageVariables";

const controllerInstanceAuth = new AbortController();

export const instanceAuthHeaders = () => {
  const token = getLocalStorage(TOKEN);

  if (!token) return "";
  return `${token}`;
};

const fetchInstance: FetchInstance = async (props: FetchInstanceProps) => {
  const { url, body, headers = HEADERS_APPLICATION_JSON, options } = props;

  try {
    const response = await fetch(`${BASE_URL_API}${url}`, {
      ...options,
      signal: controllerInstanceAuth.signal,
      headers: { ...headers, token: instanceAuthHeaders() },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    result.ok = response.ok;
    result.statusCode = response.status;

    return result;
  } catch (error) {
    throw new Error("Ha ocurrido un error en la petición");
  }
};

export { fetchInstance };

export interface FetchInstanceProps {
  url: string;
  body?: any;
  headers?: HeadersInit | undefined;
  options?: any | {};
}

export type FetchInstance = (props: FetchInstanceProps) => Promise<any>;
