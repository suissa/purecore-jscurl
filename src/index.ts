import {
  type R3qInstance,
  type R3qRequestConfig,
  type R3qResponse,
  type HttpMethod,
  type Url,
} from "./types";
import { stringify } from "querystring";

// Malandragem de performance: Reutilizar objeto de headers para evitar alocação excessiva
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "r3q/0.0.1",
};

function createInstance(): R3qInstance {
  const request = async function (
    config: R3qRequestConfig
  ): Promise<R3qResponse> {
    const {
      url,
      method = "GET",
      headers = {},
      params,
      data,
      ...customConfig
    } = config;

    // Performance: Montagem eficiente de URL
    let finalUrl = (config.baseURL ? config.baseURL + url : url) as string;
    if (params) {
      const qs = stringify(params);
      finalUrl += (finalUrl.includes("?") ? "&" : "?") + qs;
    }

    // Performance: Tratamento eficiente de Body
    let body = data;
    const finalHeaders = { ...DEFAULT_HEADERS, ...headers } as Record<
      string,
      string
    >;

    if (
      body &&
      typeof body === "object" &&
      !InitBody.prototype.isPrototypeOf(body)
    ) {
      // Se for objeto simples e não enviei headers de form, assumo JSON
      if (
        !finalHeaders["Content-Type"] ||
        finalHeaders["Content-Type"].includes("application/json")
      ) {
        body = JSON.stringify(body);
      }
    }

    const fetchConfig: RequestInit = {
      method,
      headers: finalHeaders,
      body,
      ...customConfig,
    };

    const response = await fetch(finalUrl, fetchConfig);

    // Performance: Lazy parsing baseado no content-type
    const contentType = response.headers.get("content-type");
    let responseData;
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    return {
      data: responseData,
      status: response.status as any,
      statusText: response.statusText,
      headers: response.headers,
      config,
    };
  } as R3qInstance;

  // Atalhos Axios-like
  request.get = (url, config) =>
    request({ ...config, url, method: "GET" as HttpMethod });
  request.delete = (url, config) =>
    request({ ...config, url, method: "DELETE" as HttpMethod });
  request.head = (url, config) =>
    request({ ...config, url, method: "HEAD" as HttpMethod });
  request.options = (url, config) =>
    request({ ...config, url, method: "OPTIONS" as HttpMethod });

  request.post = (url, data, config) =>
    request({ ...config, url, data, method: "POST" as HttpMethod });
  request.put = (url, data, config) =>
    request({ ...config, url, data, method: "PUT" as HttpMethod });
  request.patch = (url, data, config) =>
    request({ ...config, url, data, method: "PATCH" as HttpMethod });

  return request;
}

export const r3q = createInstance();
export default r3q;
