// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HttpResult<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};
