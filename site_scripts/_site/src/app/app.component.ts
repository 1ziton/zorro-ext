import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { en_US, zh_CN, NzI18nService, NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { environment } from '../environments/environment';
import { ROUTER_LIST } from './router';
import { RebirthHttpProvider } from 'rebirth-http';
import { IPS_BASE_URL, API_BASE_URL, IPS_TOKEN_KEY, TOKEN_KEY } from './share/config/config';
import { AuthService } from './share/services/auth/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ReStorageService } from './share/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  hide = true;
  routerList = ROUTER_LIST;
  componentList = [];
  searchComponent = null;
  language = 'zh';
  oldVersionList = [
    '0.5.x',
    '0.6.x',
    '0.7.x'
  ];
  currentVersion = '1.1.1';

  switchLanguage(language) {
    const url = this.router.url.split('/');
    url.splice(-1);
    this.router.navigateByUrl(url.join('/') + '/' + language);
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  constructor(private router: Router,
    private title: Title,
    private auth: AuthService,
    private nzI18nService: NzI18nService,
    private rebirthHttpProvider: RebirthHttpProvider,
    private _notification: NzNotificationService,
    private storage: ReStorageService,
    private msg: NzMessageService) {

  }

  navigateToPage(url) {
    console.log(url);
    if (url) {
      this.router.navigateByUrl(url);
    }
  }

  navigateToVersion(version) {
    if (version !== this.currentVersion) {
      window.location.href = window.location.origin + `/version/` + version;
    } else {
      window.location.href = window.location.origin;
    }
    this.currentVersion = version;
  }

  ngOnInit(): void {
    this.routerList.components.forEach(group => {
      this.componentList = this.componentList.concat([...group.children]);
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentDemoComponent = this.componentList.find(component => `/${component.path}` === this.router.url);
        if (currentDemoComponent) {
          this.title.setTitle(`${currentDemoComponent.zh} ${currentDemoComponent.label} - NG-ZORRO`);
        }
        const currentIntroComponent = this.routerList.intro.find(component => `/${component.path}` === this.router.url);
        if (currentIntroComponent) {
          this.title.setTitle(`${currentIntroComponent.label} - NG-ZORRO`);
        }
        if (this.router.url !== '/' + this.searchComponent) {
          this.searchComponent = null;
        }
        this.language = this.router.url.split('/')[this.router.url.split('/').length - 1].split('#')[0];
        this.nzI18nService.setLocale(this.language === 'en' ? en_US : zh_CN);
        if (environment.production) {
          window.scrollTo(0, 0);
        }
        setTimeout(() => {
          const toc = this.router.parseUrl(this.router.url).fragment || '';
          if (toc) {
            document.querySelector(`#${toc}`).scrollIntoView();
          }
        }, 200);
      }
    });
    this.initColor();
    this.apiSetup();
  }

  ngAfterViewInit() {
    // 系统初始化时检查一下登陆情况
    if (!this.auth.checkLogin()) {
      this.auth.goToLogin();
    }
  }

  // region: color
  color = `#1890ff`;
  initColor() {
    const node = document.createElement('link');
    node.rel = 'stylesheet/less';
    node.type = 'text/css';
    node.href = '/assets/color.less';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  lessLoaded = false;
  changeColor(res: any) {
    const changeColor = () => {
      (window as any).less.modifyVars({
        '@primary-color': res.color.hex
      }).then(() => {
        this.msg.success(`应用成功`);
        this.color = res.color.hex;
        window.scrollTo(0, 0);
      });
    };

    const lessUrl = 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js';

    if (this.lessLoaded) {
      changeColor();
    } else {
      (window as any).less = {
        async: true
      };
      this.loadScript(lessUrl).then(() => {
        this.lessLoaded = true;
        changeColor();
      });
    }
  }

  loadScript(src: string) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  // endregion


  get api() {
    return API_BASE_URL;
  }
  
  /**http请求全局拦截器 */
  private apiSetup() {
    this.rebirthHttpProvider
      .baseUrl(this.api)
      .addInterceptor({
        request: request => {
          let keyStr = request.url.includes(IPS_BASE_URL) ? IPS_TOKEN_KEY : TOKEN_KEY
          let token = this.storage.get(keyStr) || 'anonymous.anonymous';
          let requestOpt = {
            setHeaders: { Authorization: `Bearer ${token}` }
          }
          return request.clone(requestOpt);
        },
        response: (response: HttpResponse<any>) => {
          if (response instanceof Error) {
            // new Error，避免两次 notification
            return;
          }
          // 接口统一错误提示
          let body = response.body || {};
          let resultCode = body.resultCode;
          let ipsJudgeFlag = (response.url && !response.url.includes(IPS_BASE_URL)) || (response.url && response.url.includes(IPS_BASE_URL) && body.error);
          if (resultCode == '401') {
            // 没有权限
            return this.auth.goToLogin();
          } else if (resultCode !== '200' && resultCode !== 200 && resultCode != '401' && ipsJudgeFlag) {
            // this._message.error(body.msg, { nzDuration: 3000 });
            this._notification.create('error', '错误提示', body.msg || body.error || '服务异常', { nzDuration: 4000 });
            // 抛出异常，避免进入success回调
            throw new Error(body || '服务异常');
          }
        }
      })
      .addResponseErrorInterceptor((res: HttpErrorResponse) => {
        if (res.status && [401, 403].indexOf(res.status) !== -1) {
          return this.auth.goToLogin();
        }
      });
  }
}
