import { environment } from "../environments/environment.local";

/**应用名称 */
export const APP_NAME = 'SCM';

/**SCM API服务地址 */
export const API_BASE_URL = environment.API_BASE_URL;
// export const API_BASE_URL = (<any>window).API_BASE_URL;

/**IPS API服务地址 */
export const IPS_BASE_URL =  environment.IPS_BASE_URL;
/**IPS免密登录账号(异常反馈用的帐号) */
export const IPS_LOGIN_ACCOUNT =  environment.IPS_LOGIN_ACCOUNT;
export const IPS_CERTIFICATE_KEY = 'V6TI6ikg2NZOqcwE'; // IPS免密登录密匙


/**passport服务地址 */
export const PASSPORT_URL = environment.PASSPORT_URL;
/**登陆服务地址 */
export const OAUTH_LOGIN_URL = PASSPORT_URL + 'oauth/authorize?client_id=scm&response_type=token&redirect_uri=' + window.location.href + '/';
/**退出登陆服务 */
export const LOGOUT_URL = '/logout';
/**访问领域（获取当前登录用户url），token */
export const CUR_USERINFO_URL = '/user/me';

/**缓存KEY值变量 */
export const TOKEN_KEY = '_access_tk_'; // jwt token
export const USER_INFO_KEY = '_usr_k_'; // 用户信息
export const USER_PEMISSION_KEY = '_usr_pms_'; // 菜单
export const USER_PEMISSION_ROUTE_KEY = '_usr_pms_route_'; // 路由
export const IPS_TOKEN_KEY = '_ips_access_tk_'; // ips token

/**需要忽略拦截的接口 */
export const IGNORE_API_INTERCEPT = [
  'baseConfig/upload',
];

/**供测试取消功能权限控制的配置 true为关闭功能权限控制 */
export const NO_GUARD_CONTROL = !false; // 无用了
