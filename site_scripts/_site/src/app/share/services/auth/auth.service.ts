/**
 * @author: giscafer
 * @date: 2018-05-24 16:22:53
 * @description: 登录等权限控制服务
 */

import { Injectable } from '@angular/core';
import { RebirthHttp, BaseUrl, Body, POST, JSONP, GET, Query } from 'rebirth-http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {
  PASSPORT_URL,
  LOGOUT_URL,
  OAUTH_LOGIN_URL,
  CUR_USERINFO_URL,
  TOKEN_KEY,
  USER_PEMISSION_KEY,
  USER_PEMISSION_ROUTE_KEY,
  NO_GUARD_CONTROL
} from '../../config/config';

import { StorageType } from 'rebirth-storage';

import './logout.ts';
import { ReStorageService } from '../storage/storage.service';


@Injectable()
@BaseUrl(PASSPORT_URL)
export class PassPortService extends RebirthHttp {
  constructor(
    http: HttpClient,
    private storage: ReStorageService,
  ) {
    super(http);
  }

  // 只支持JSONP请求
  @JSONP(LOGOUT_URL)
  logout( @Query("callback") callback: string): Observable<any> {
    return null;
  }

}

@Injectable()
export class AuthService extends RebirthHttp {

  constructor(
    http: HttpClient,
    private passPortService: PassPortService,
    private storage: ReStorageService
  ) {
    super(http);
  }

  /**检查是否存在token */
  checkLogin() {
    let access_token = this._getUrlParam("access_token");
    if (!_.isEmpty(access_token)) {
      this.storage.save(TOKEN_KEY, access_token);
      this.initUserInfo();
      return true;
    } else {
      //本地是否有token信息
      access_token = this.storage.get(TOKEN_KEY);
      if (_.isEmpty(access_token)) {
        this.setUser(null);
        return false;
      } else {
        // this.initUserInfo();
        return true;
      }
    }
  }

  private _getUrlParam(name) {
    let reg = new RegExp(name + "=([^&]*)(&|$)");
    let url = window.location.hash;
    let r = url.match(reg); //匹配目标参数
    if (r != null) return (<any>window).unescape(r[1]);
    return null;
  }

  /**
   * 获取登陆用户信息
   */
  initUserInfo() {
    this.getCurrUser().subscribe(json => {
      const userInfo = json.content;
    });
  }

  setUser(user = {}) {
    if (user === null) {
      this.storage.remove(TOKEN_KEY);
    }
  }

  logout() {
    this.storage.clear(StorageType.sessionStorage);
    this.passPortService.logout('_logoutCallback').subscribe(json => {
      this.setUser(null);
      this.goToLogin();
    })
  }

  goToLogin() {
    window.location.href = OAUTH_LOGIN_URL;
  }

  /**获取当前登录用户 */
  @POST(CUR_USERINFO_URL)
  getCurrUser(): Observable<any> {
    return null;
  }
}


