import {
  type R3qInstance,
  type R3qRequestConfig,
  type R3qResponse,
  type HttpMethod,
  type Url,
} from "./types";

// Malandragem de performance: Reutilizar objeto de headers para evitar alocação excessiva
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "r3q/0.0.1",
};

function createInstance(): R3qInstance {
  const request = async function (
    urlOrConfig: string | R3qRequestConfig,
    config?: R3qRequestConfig
  ): Promise<R3qResponse> {
    // Suporte para sobrecarga: (url, config?) ou (config)
    let url: string;
    let finalConfig: R3qRequestConfig;

    if (typeof urlOrConfig === "string") {
      url = urlOrConfig;
      finalConfig = config || {};
    } else {
      finalConfig = urlOrConfig;
      const configWithUrl = finalConfig as R3qRequestConfig & { url?: string | Url };
      url = (configWithUrl.url ? String(configWithUrl.url) : "") || "";
      if (!url) {
        throw new Error("URL is required");
      }
    }

    const {
      method = "GET",
      headers = {},
      params,
      data,
      baseURL,
      ...customConfig
    } = finalConfig;

    // Performance: Montagem eficiente de URL
    let finalUrl = (baseURL ? baseURL + url : url) as string;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value != null) {
          searchParams.append(key, String(value));
        }
      });
      const qs = searchParams.toString();
      if (qs) {
        finalUrl += (finalUrl.includes("?") ? "&" : "?") + qs;
      }
    }

    // Performance: Tratamento eficiente de Body
    let body: BodyInit | null = data;
    const finalHeaders = { ...DEFAULT_HEADERS, ...headers } as Record<
      string,
      string
    >;

    // Verificar se body é um objeto simples (não é BodyInit nativo)
    if (body && typeof body === "object") {
      const isBodyInit =
        body instanceof FormData ||
        body instanceof URLSearchParams ||
        body instanceof Blob ||
        body instanceof ArrayBuffer ||
        ArrayBuffer.isView(body);

      if (!isBodyInit) {
        // Se for objeto simples e não enviei headers de form, assumo JSON
        if (
          !finalHeaders["Content-Type"] ||
          finalHeaders["Content-Type"].includes("application/json")
        ) {
          body = JSON.stringify(body);
        }
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
      config: finalConfig,
    };
  } as R3qInstance;

  // Atalhos Axios-like
  request.get = (url, config) =>
    request(url, { ...config, method: "GET" as HttpMethod });
  request.delete = (url, config) =>
    request(url, { ...config, method: "DELETE" as HttpMethod });
  request.head = (url, config) =>
    request(url, { ...config, method: "HEAD" as HttpMethod });
  request.options = (url, config) =>
    request(url, { ...config, method: "OPTIONS" as HttpMethod });

  request.post = (url, data, config) =>
    request(url, { ...config, data, method: "POST" as HttpMethod });
  request.put = (url, data, config) =>
    request(url, { ...config, data, method: "PUT" as HttpMethod });
  request.patch = (url, data, config) =>
    request(url, { ...config, data, method: "PATCH" as HttpMethod });

  return request;
}

export const r3q = createInstance();
export default r3q;
