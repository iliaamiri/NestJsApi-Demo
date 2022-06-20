export default interface IApiCalls {
  get(url: string, headers?: any): Promise<any>;

  post(url: string, data: object, headers?: any): Promise<any>;

  put(url: string, data: object, headers?: any): Promise<any>;

  delete(url: string, headers?: any): Promise<any>;

  patch(url: string, data: object, headers?: any): Promise<any>;
}
