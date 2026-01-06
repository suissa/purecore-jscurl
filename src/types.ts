export type Brand<K, T> = K & { readonly __brand: T };

export type Url = Brand<string, "Url">;
export type HttpMethod = Brand<
  "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS",
  "HttpMethod"
>;
export type StatusCode = Brand<number, "StatusCode">;
export type ContentType = Brand<string, "ContentType">;

export interface R3qRequestConfig extends RequestInit {
  url?: string | Url;
  baseURL?: Url;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
}

export interface R3qResponse<T = any> {
  data: T;
  status: StatusCode;
  statusText: string;
  headers: Headers;
  config: R3qRequestConfig;
  request?: Request;
}

export interface R3qInstance {
  (config: R3qRequestConfig): Promise<R3qResponse>;
  (url: string, config?: R3qRequestConfig): Promise<R3qResponse>;
  get<T = any>(url: string, config?: R3qRequestConfig): Promise<R3qResponse<T>>;
  delete<T = any>(
    url: string,
    config?: R3qRequestConfig
  ): Promise<R3qResponse<T>>;
  head<T = any>(
    url: string,
    config?: R3qRequestConfig
  ): Promise<R3qResponse<T>>;
  options<T = any>(
    url: string,
    config?: R3qRequestConfig
  ): Promise<R3qResponse<T>>;
  post<T = any>(
    url: string,
    data?: any,
    config?: R3qRequestConfig
  ): Promise<R3qResponse<T>>;
  put<T = any>(
    url: string,
    data?: any,
    config?: R3qRequestConfig
  ): Promise<R3qResponse<T>>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: R3qRequestConfig
  ): Promise<R3qResponse<T>>;
}
