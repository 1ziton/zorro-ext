import { USER_INFO_KEY, IPS_TOKEN_KEY, TOKEN_KEY, OAUTH_LOGIN_URL } from "../../config/config";


/**退出登陆JSONP回调方法 */
(<any>window)._logoutCallback = (e) => {
    // session级别
    sessionStorage.removeItem(USER_INFO_KEY);
    sessionStorage.removeItem(IPS_TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.clear();
    setTimeout(() => {
        window.location.href = OAUTH_LOGIN_URL;
    }, 100)
}