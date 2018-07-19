import { RebirthHttp, JSONP, GET, POST, PUT, DELETE, PATCH, BaseUrl, Query, Path, Body } from 'rebirth-http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    /**地址-搜索-根据name或parentCode搜索 */
    //https://yapi.1ziton.com/mock/29/api/baseConfig/findAreaList
    @POST("baseConfig/findAreaList")
    findAreaList(@Body body): Observable<any> {
        return null;
    }

    /**地址-根据code获取地址信息 */
    //https://yapi.1ziton.com/mock/29/api/baseConfig/getAreaByCode
    @POST("baseConfig/getAreaByCode")
    getAreaByCode(@Body body): Observable<any> {
        return null;
    }

    /**地址-根据name获取分页地址 */
    @POST("baseConfig/findAreaPage")
    getAreaPage(@Body body): Observable<any> {
        return null;
    }

    @POST('file/upload')
    upload(@Body formData: FormData): Observable<any> {
        return null;
    }

    /**提货地址 */
    @POST('customer/getDefaultConsignorAddress')
    getPickAddr(@Body body): Observable<any> {
        return null;
    }

    /**客户品名 */
    @POST('priceManage/listCustomerProduct')
    getCustomerGood(@Body body): Observable<any> {
        return null;
    }

    /**客户品名及套餐集合 */
    @POST('priceManage/listComboAndCustomerProduct')
    getComboAndCustomerGood(@Body body): Observable<any> {
        return null;
    }

    /**标准品名 */
    @POST('priceManage/listStandardProduct')
    getStandarGood(@Body body): Observable<any> {
        return null;
    }

    /**发货人 */
    @POST('customer/findConsignorList')
    getConsignorList(@Body body): Observable<any> {
        return null;
    }

    /**网点-获取网点集合分页 */
    @POST('organize/findOutletsPage')
    findOutletsPage(@Body body): Observable<any> {
        return null;
    }
    getOutlets(body): Observable<any> {
        return this.findOutletsPage([{ page: 1, size: 20 }, body]);
    }

    /**网点-获取网点集合 */
    @POST('organize/getOutletsList')
    getOutletsList(@Body body): Observable<any> {
        return null;
    }

    /**网点-根据code获取网点信息 */
    @POST('organize/getOutletsByCode')
    getOutletsByCode(@Body body): Observable<any> {
        return null;
    }

    /**人员-获取员工列表 */
    @POST('organize/findOrgUser')
    findOrgUser(@Body body): Observable<any> {
        return null;
    }

    /**人员-获取员工列表 */
    @POST('taskDispatch/getTaskPermissionOutletsUser')
    getTaskPermissionOutletsUser(@Body body): Observable<any> {
        return null;
    }

    /**承运商-搜索承运商列表 */
    @POST('carrier/findCarrierList')
    findCarrierList(@Body body): Observable<any> {
        return null;
    }
}
