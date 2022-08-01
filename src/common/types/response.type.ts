export interface IResponse {
  statusCode?: number;
  message?: string;
  data?: {
    [key: string]: any;
  }
  success?: boolean;
}
