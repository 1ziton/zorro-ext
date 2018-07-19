
/**分页类型 */
export interface PageInfo {
    page: number;
    size: number;
    [propName: string]: number | string;
}
/**数组查询参数类型 */
export interface QueryArray {
    [index: number]: Object;
}
/**分页查询参数类型 */
export type PageQueryArray = [PageInfo, Object];