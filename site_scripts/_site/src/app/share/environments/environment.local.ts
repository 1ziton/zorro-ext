// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
(function () {
  console.log("mode===>local");
})();
export const environment = {
  production: false,
  uat: false,
  dev: true,
  test: false,
  hmr: false,
  IPS_LOGIN_ACCOUNT: '18300000000',
  IPS_BASE_URL: 'http://192.168.100.90:11101/',
  PASSPORT_URL: "http://192.168.100.38:7800/",
  API_BASE_URL: 'http://192.168.100.38:7600/api/', // 测试backend （后期7777端口对外不可访问）
  // API_BASE_URL: "https://yapi.1ziton.com/mock/29/api/" // yapi mock

  // API_BASE_URL:'http://192.168.3.101:7777/api/', // 张思源backend
  // API_BASE_URL:'http://192.168.3.169:7777/api/', // 罗有利backend
  // API_BASE_URL:'http://192.168.3.116:7600/api/', // 建荣 backend
  // API_BASE_URL:'http://192.168.2.161:7777/api/', // 星海 backend
  // API_BASE_URL:'http://192.168.7.176:7777/api/', // 俊荣 mac backend
  // API_BASE_URL: 'http://192.168.3.98:7777/api/', // 俊荣 backend
  // API_BASE_URL:'http://192.168.3.226:7777/api/', // 张蒙 backend
  // API_BASE_URL:'http://192.168.3.133:7777/api/', // 善玩 backend
  // API_BASE_URL: 'http://192.168.3.234:7777/api/', // 陈波 backend
  // API_BASE_URL: 'http://192.168.16.28:7777/api/', // 星海 backend
};
