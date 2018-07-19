/**
 * 通用API服务，用于简单的调用后端的Controller及其方法，避免后端人员自行处理Restful类型API的麻烦
 */
export class API {
    url: string;
    /**
     * 注入http服务
     * @param http
     */
    call(...args: any[]): any { };
    /**
     *  get请求
     * @param url
     * @param paramObj
     */
    get(url, paramObj) { };
    toQueryString(obj: any): any { };
    toQueryPair(key: any, value: any): any { };
}