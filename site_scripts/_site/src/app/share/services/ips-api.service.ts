
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseUrl, RebirthHttp, POST, Body } from "rebirth-http";
import { Md5 } from 'ts-md5/dist/md5';
// import { ReStorageService } from "@core/core.module";
import { Observable } from "rxjs";
import { IPS_BASE_URL, IPS_CERTIFICATE_KEY } from "../config/config";
import { NzNotificationService } from "ng-zorro-antd";

@BaseUrl(IPS_BASE_URL)
@Injectable()
export class IpsApiService extends RebirthHttp {
    md5;
    _cacheData: any = {};

    constructor(
        http: HttpClient,
        private _notification: NzNotificationService,
        // private storage: ReStorageService
    ) {
        super(http);
        this.md5 = new Md5();
    }

    @POST("/api.do")
    private api(@Body body): Observable<any> {
        return null;
    }
    /**
     *  ips接口请求兼容
     * @param args
     */
    call(...args: any[]): Observable<any> {
        if (args.length < 1) {
            throw new Error("At least one argument for $rpc call ");
        }
        let name = args[0];
        args = args.slice(1);
        name = name.substring(0, 1).toLowerCase() + name.substring(1);
        let request = {
            name: name,
            args: args
        };
        return this.api(request);
    }

    @POST("/login")
    private _login(@Body body): Observable<any> {
        return null;
    }
    /**
     * https://note.youdao.com/share/?id=41e12f713f84b749c91c351433c0dd3e&type=note#/
     * 
     * IPS免密登录验证
     * @param mobile 登录手机号
     * @return true登录成功，false登录失败
     */
    login(mobile: string): Observable<any> {
        let timestamp = new Date().getTime();
        let pubkey = `agent_phone_number=${mobile}&timestamp=${timestamp}`;
        let body = {
            "source": "Finance_ips",
            "iframeType": "Finance",
            "mobile": mobile,
            "pubkey": pubkey,
            "sign": Md5.hashStr(pubkey + '&' + IPS_CERTIFICATE_KEY)
        }
        return Observable.create(observer => {
            this._login(body).subscribe(json => {
                if (json.jwt) {
                    // this.storage.save(IPS_TOKEN_KEY, json.jwt);
                    observer.next(true);
                } else {
                    this._notification.create('error', 'IPS登录错误提示', 'IPS自动登录失败', { nzDuration: 5000 });
                    observer.next(false);
                }
            }, err => {
                this._notification.create('error', 'IPS登录错误提示', (err && err.error) || 'IPS自动登录失败', { nzDuration: 5000 });
                observer.next(false);
            });
        });
    }

    /**
     * ips 后端分页接口有问题，只有第一次是准确的，所以这里缓存第一次分页信息
     * @param json 
     */
    cachePageInfo(json) {
        let _result = json['result'] || {};
        if (_result.content && _result.number === 0) {
            // 第一页存储总记录数
            this._cacheData[name] = _result.totalElements;
            this._cacheData[name + '_totalPages'] = _result.totalPages;
        } else if (_result.content && _result.content.length) {
            // 非第一页则取缓存
            json['result']['totalElements'] = this._cacheData[name];
            json['result']['totalPages'] = this._cacheData[name + '_totalPages'];
        }

        return json;
    }
}
