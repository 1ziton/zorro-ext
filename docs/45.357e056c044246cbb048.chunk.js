webpackJsonp([45],{"+RzG":function(l,n){l.exports="import { Component } from '@angular/core';\r\n\r\n@Component({\r\n  selector: 'nz-demo-affix-fixed',\r\n  template: `\r\n  <nz-affix [nzOffsetTop]=\"120\" (nzChange)=\"onChange($event)\">\r\n    <button nz-button>\r\n        <span>120px to affix top</span>\r\n    </button>\r\n  </nz-affix>\r\n  `\r\n})\r\nexport class NzDemoAffixFixedComponent {\r\n  onChange(status: boolean) {\r\n    console.log(status);\r\n  }\r\n}\r\n"},Bxom:function(l,n){l.exports='import { Component } from \'@angular/core\';\r\n\r\n@Component({\r\n  selector: \'nz-demo-affix-container\',\r\n  template: `\r\n  <div class="scrollable-container" #target>\r\n    <div class="background">\r\n      <nz-affix [nzTarget]="target" id="affix-container-target">\r\n        <button nz-button [nzType]="\'primary\'">\r\n            <span>Fixed at the top of container</span>\r\n        </button>\r\n      </nz-affix>\r\n    </div>\r\n  </div>\r\n  `,\r\n  styles: [`\r\n  :host ::ng-deep .scrollable-container {\r\n    height: 100px;\r\n    overflow-y: scroll;\r\n  }\r\n\r\n  :host ::ng-deep .background {\r\n    padding-top: 60px;\r\n    height: 300px;\r\n    background-image: url(//zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg);\r\n  }\r\n  `]\r\n})\r\nexport class NzDemoAffixContainerComponent { }\r\n'},MTP0:function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=u("LMZF"),_=function(){},t=u("g3ta"),o=u("QJaU"),e=u("HzDP"),r=u("88JB"),i=u("d0SC"),c=u("Un6q"),f=u("rU7V"),d=u("AGx2"),p=u("f42N"),s=u("N5qe"),z=u("yojp"),x=function(){},g=a._5({encapsulation:2,styles:[],data:{}});function b(l){return a._31(0,[(l()(),a._29(-1,null,["\n  "])),(l()(),a._7(1,0,null,null,9,"nz-affix",[],null,null,null,f.b,f.a)),a._6(2,4964352,null,0,d.a,[p.a,a.l],null,null),(l()(),a._29(-1,0,["\n    "])),(l()(),a._7(4,0,null,0,5,"button",[["nz-button",""]],null,[[null,"click"]],function(l,n,u){var _=!0;return"click"===n&&(_=!1!==a._20(l,5)._onClick()&&_),_},s.b,s.a)),a._6(5,1097728,null,0,z.a,[a.l,a.D],{nzType:[0,"nzType"]},null),(l()(),a._29(-1,0,["\n        "])),(l()(),a._7(7,0,null,0,1,"span",[],null,null,null,null,null)),(l()(),a._29(-1,null,["Affix Button"])),(l()(),a._29(-1,0,["\n    "])),(l()(),a._29(-1,0,["\n  "])),(l()(),a._29(-1,null,["\n  "]))],function(l,n){l(n,2,0),l(n,5,0,"primary")},null)}var m=function(){function l(){}return l.prototype.onChange=function(l){console.log(l)},l}(),h=a._5({encapsulation:2,styles:[],data:{}});function C(l){return a._31(0,[(l()(),a._29(-1,null,["\n  "])),(l()(),a._7(1,0,null,null,9,"nz-affix",[],null,[[null,"nzChange"]],function(l,n,u){var a=!0;return"nzChange"===n&&(a=!1!==l.component.onChange(u)&&a),a},f.b,f.a)),a._6(2,4964352,null,0,d.a,[p.a,a.l],{nzOffsetTop:[0,"nzOffsetTop"]},{nzChange:"nzChange"}),(l()(),a._29(-1,0,["\n    "])),(l()(),a._7(4,0,null,0,5,"button",[["nz-button",""]],null,[[null,"click"]],function(l,n,u){var _=!0;return"click"===n&&(_=!1!==a._20(l,5)._onClick()&&_),_},s.b,s.a)),a._6(5,1097728,null,0,z.a,[a.l,a.D],null,null),(l()(),a._29(-1,0,["\n        "])),(l()(),a._7(7,0,null,0,1,"span",[],null,null,null,null,null)),(l()(),a._29(-1,null,["120px to affix top"])),(l()(),a._29(-1,0,["\n    "])),(l()(),a._29(-1,0,["\n  "])),(l()(),a._29(-1,null,["\n  "]))],function(l,n){l(n,2,0,120)},null)}var v=function(){},y=a._5({encapsulation:0,styles:["[_nghost-%COMP%]     .scrollable-container {\n    height: 100px;\n    overflow-y: scroll;\n  }\n\n  [_nghost-%COMP%]     .background {\n    padding-top: 60px;\n    height: 300px;\n    background-image: url(//zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg);\n  }"],data:{}});function k(l){return a._31(0,[(l()(),a._29(-1,null,["\n  "])),(l()(),a._7(1,0,[["target",1]],null,15,"div",[["class","scrollable-container"]],null,null,null,null,null)),(l()(),a._29(-1,null,["\n    "])),(l()(),a._7(3,0,null,null,12,"div",[["class","background"]],null,null,null,null,null)),(l()(),a._29(-1,null,["\n      "])),(l()(),a._7(5,0,null,null,9,"nz-affix",[["id","affix-container-target"]],null,null,null,f.b,f.a)),a._6(6,4964352,null,0,d.a,[p.a,a.l],{nzTarget:[0,"nzTarget"]},null),(l()(),a._29(-1,0,["\n        "])),(l()(),a._7(8,0,null,0,5,"button",[["nz-button",""]],null,[[null,"click"]],function(l,n,u){var _=!0;return"click"===n&&(_=!1!==a._20(l,9)._onClick()&&_),_},s.b,s.a)),a._6(9,1097728,null,0,z.a,[a.l,a.D],{nzType:[0,"nzType"]},null),(l()(),a._29(-1,0,["\n            "])),(l()(),a._7(11,0,null,0,1,"span",[],null,null,null,null,null)),(l()(),a._29(-1,null,["Fixed at the top of container"])),(l()(),a._29(-1,0,["\n        "])),(l()(),a._29(-1,0,["\n      "])),(l()(),a._29(-1,null,["\n    "])),(l()(),a._29(-1,null,["\n  "])),(l()(),a._29(-1,null,["\n  "]))],function(l,n){l(n,6,0,a._20(n,1)),l(n,9,0,"primary")},null)}var T=function(){return function(){this.NzDemoAffixBasicCode=u("OSCW"),this.NzDemoAffixFixedCode=u("+RzG"),this.NzDemoAffixContainerCode=u("Bxom")}}(),A=a._5({encapsulation:2,styles:[],data:{}});function D(l){return a._31(0,[(l()(),a._7(0,0,null,null,184,"article",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\n  "])),(l()(),a._7(2,0,null,null,26,"section",[["class","markdown"]],null,null,null,null,null)),(l()(),a._7(3,0,null,null,1,"h1",[],null,null,null,null,null)),(l()(),a._29(-1,null,["Affix \u56fa\u9489"])),(l()(),a._29(-1,null,["\n    "])),(l()(),a._7(6,0,null,null,17,"section",[["class","markdown"]],null,null,null,null,null)),(l()(),a._7(7,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u5c06\u9875\u9762\u5143\u7d20\u9489\u5728\u53ef\u89c6\u8303\u56f4\u3002"])),(l()(),a._29(-1,null,["\n      "])),(l()(),a._7(10,0,null,null,6,"h2",[["id","\u4f55\u65f6\u4f7f\u7528"]],null,null,null,null,null)),(l()(),a._7(11,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u4f55\u65f6\u4f7f\u7528"])),(l()(),a._29(-1,null,["\n        "])),(l()(),a._7(14,0,null,null,1,"a",[["class","affix"]],null,null,null,null,null)),(l()(),a._29(-1,null,["#"])),(l()(),a._29(-1,null,["\n      "])),(l()(),a._29(-1,null,["\n      "])),(l()(),a._7(18,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u5f53\u5185\u5bb9\u533a\u57df\u6bd4\u8f83\u957f\uff0c\u9700\u8981\u6eda\u52a8\u9875\u9762\u65f6\uff0c\u8fd9\u90e8\u5206\u5185\u5bb9\u5bf9\u5e94\u7684\u64cd\u4f5c\u6216\u8005\u5bfc\u822a\u9700\u8981\u5728\u6eda\u52a8\u8303\u56f4\u5185\u59cb\u7ec8\u5c55\u73b0\u3002\u5e38\u7528\u4e8e\u4fa7\u8fb9\u83dc\u5355\u548c\u6309\u94ae\u7ec4\u5408\u3002"])),(l()(),a._29(-1,null,["\n      "])),(l()(),a._7(21,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u9875\u9762\u53ef\u89c6\u8303\u56f4\u8fc7\u5c0f\u65f6\uff0c\u614e\u7528\u6b64\u529f\u80fd\u4ee5\u514d\u906e\u6321\u9875\u9762\u5185\u5bb9\u3002"])),(l()(),a._29(-1,null,["\n    "])),(l()(),a._29(-1,null,["\n    "])),(l()(),a._7(25,0,null,null,2,"h2",[["id","\u4ee3\u7801\u6f14\u793a"]],null,null,null,null,null)),(l()(),a._29(-1,null,["\u4ee3\u7801\u6f14\u793a"])),(l()(),a._7(27,0,null,null,0,"i",[["class","code-box-expand-trigger anticon anticon-appstore"],["title","\u5c55\u5f00\u5168\u90e8\u4ee3\u7801"]],null,null,null,null,null)),(l()(),a._29(-1,null,["\n  "])),(l()(),a._29(-1,null,["\n  "])),(l()(),a._7(30,0,null,null,36,"div",[["nz-row",""]],null,null,null,t.b,t.a)),a._6(31,114688,null,0,o.a,[a.l,a.D],{nzGutter:[0,"nzGutter"]},null),(l()(),a._29(-1,0,["\n    "])),(l()(),a._7(33,0,null,0,15,"div",[["id","components-affix-demo-basic"],["nz-col",""]],[[4,"padding-left","px"],[4,"padding-right","px"]],null,null,null,null)),a._6(34,606208,null,0,e.a,[a.l,[2,o.a],a.D],{nzSpan:[0,"nzSpan"]},null),(l()(),a._29(-1,null,["\n      "])),(l()(),a._7(36,0,null,null,11,"nz-code-box",[],null,null,null,r.b,r.a)),a._6(37,114688,null,0,i.a,[c.d,a.l],{nzTitle:[0,"nzTitle"],nzCode:[1,"nzCode"]},null),(l()(),a._29(-1,null,["\n        "])),(l()(),a._7(39,0,null,0,1,"nz-demo-affix-basic",[["demo",""]],null,null,null,b,g)),a._6(40,49152,null,0,x,[],null,null),(l()(),a._29(-1,null,["\n        "])),(l()(),a._7(42,0,null,1,4,"div",[["intro",""]],null,null,null,null,null)),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(44,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u6700\u7b80\u5355\u7684\u7528\u6cd5\u3002"])),(l()(),a._29(-1,null,["\n        "])),(l()(),a._29(-1,null,["\n      "])),(l()(),a._29(-1,null,["\n    "])),(l()(),a._29(-1,0,["\n    "])),(l()(),a._7(50,0,null,0,15,"div",[["id","components-affix-demo-fixed"],["nz-col",""]],[[4,"padding-left","px"],[4,"padding-right","px"]],null,null,null,null)),a._6(51,606208,null,0,e.a,[a.l,[2,o.a],a.D],{nzSpan:[0,"nzSpan"]},null),(l()(),a._29(-1,null,["\n      "])),(l()(),a._7(53,0,null,null,11,"nz-code-box",[],null,null,null,r.b,r.a)),a._6(54,114688,null,0,i.a,[c.d,a.l],{nzTitle:[0,"nzTitle"],nzCode:[1,"nzCode"]},null),(l()(),a._29(-1,null,["\n        "])),(l()(),a._7(56,0,null,0,1,"nz-demo-affix-fixed",[["demo",""]],null,null,null,C,h)),a._6(57,49152,null,0,m,[],null,null),(l()(),a._29(-1,null,["\n        "])),(l()(),a._7(59,0,null,1,4,"div",[["intro",""]],null,null,null,null,null)),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(61,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u53ef\u4ee5\u83b7\u5f97\u662f\u5426\u56fa\u5b9a\u7684\u72b6\u6001\u3002"])),(l()(),a._29(-1,null,["\n        "])),(l()(),a._29(-1,null,["\n      "])),(l()(),a._29(-1,null,["\n    "])),(l()(),a._29(-1,0,["\n  "])),(l()(),a._29(-1,null,["\n  "])),(l()(),a._7(68,0,null,null,28,"div",[["nz-row",""]],null,null,null,t.b,t.a)),a._6(69,114688,null,0,o.a,[a.l,a.D],{nzGutter:[0,"nzGutter"]},null),(l()(),a._29(-1,0,["\n    "])),(l()(),a._7(71,0,null,0,24,"div",[["id","components-affix-demo-container"],["nz-col",""]],[[4,"padding-left","px"],[4,"padding-right","px"]],null,null,null,null)),a._6(72,606208,null,0,e.a,[a.l,[2,o.a],a.D],{nzSpan:[0,"nzSpan"]},null),(l()(),a._29(-1,null,["\n      "])),(l()(),a._7(74,0,null,null,20,"nz-code-box",[],null,null,null,r.b,r.a)),a._6(75,114688,null,0,i.a,[c.d,a.l],{nzTitle:[0,"nzTitle"],nzCode:[1,"nzCode"]},null),(l()(),a._29(-1,null,["\n        "])),(l()(),a._7(77,0,null,0,1,"nz-demo-affix-container",[["demo",""]],null,null,null,k,y)),a._6(78,49152,null,0,v,[],null,null),(l()(),a._29(-1,null,["\n        "])),(l()(),a._7(80,0,null,1,13,"div",[["intro",""]],null,null,null,null,null)),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(82,0,null,null,10,"p",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u7528 "])),(l()(),a._7(84,0,null,null,1,"code",[],null,null,null,null,null)),(l()(),a._29(-1,null,["target"])),(l()(),a._29(-1,null,[" \u8bbe\u7f6e "])),(l()(),a._7(87,0,null,null,1,"code",[],null,null,null,null,null)),(l()(),a._29(-1,null,["nz-affix"])),(l()(),a._29(-1,null,[" \u9700\u8981\u76d1\u542c\u5176\u6eda\u52a8\u4e8b\u4ef6\u7684\u5143\u7d20\uff0c\u9ed8\u8ba4\u4e3a "])),(l()(),a._7(90,0,null,null,1,"code",[],null,null,null,null,null)),(l()(),a._29(-1,null,["window"])),(l()(),a._29(-1,null,["\u3002"])),(l()(),a._29(-1,null,["\n        "])),(l()(),a._29(-1,null,["\n      "])),(l()(),a._29(-1,null,["\n    "])),(l()(),a._29(-1,0,["\n  "])),(l()(),a._29(-1,null,["\n  "])),(l()(),a._7(98,0,null,null,85,"section",[["class","markdown api-container"]],null,null,null,null,null)),(l()(),a._29(-1,null,["\n    "])),(l()(),a._7(100,0,null,null,6,"h2",[["id","API"]],null,null,null,null,null)),(l()(),a._7(101,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),a._29(-1,null,["API"])),(l()(),a._29(-1,null,["\n      "])),(l()(),a._7(104,0,null,null,1,"a",[["class","affix"]],null,null,null,null,null)),(l()(),a._29(-1,null,["#"])),(l()(),a._29(-1,null,["\n    "])),(l()(),a._29(-1,null,["\n    "])),(l()(),a._7(108,0,null,null,6,"h3",[["id","API-Affix"]],null,null,null,null,null)),(l()(),a._7(109,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),a._29(-1,null,["nz-affix"])),(l()(),a._29(-1,null,["\n      "])),(l()(),a._7(112,0,null,null,1,"a",[["class","affix"]],null,null,null,null,null)),(l()(),a._29(-1,null,["#"])),(l()(),a._29(-1,null,["\n    "])),(l()(),a._29(-1,null,["\n    "])),(l()(),a._7(116,0,null,null,66,"table",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\n      "])),(l()(),a._7(118,0,null,null,16,"thead",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\n        "])),(l()(),a._7(120,0,null,null,13,"tr",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(122,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u53c2\u6570"])),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(125,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u8bf4\u660e"])),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(128,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u7c7b\u578b"])),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(131,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u9ed8\u8ba4\u503c"])),(l()(),a._29(-1,null,["\n        "])),(l()(),a._29(-1,null,["\n      "])),(l()(),a._29(-1,null,["\n      "])),(l()(),a._7(136,0,null,null,45,"tbody",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\n        "])),(l()(),a._7(138,0,null,null,12,"tr",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(140,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a._29(-1,null,["nzOffsetTop"])),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(143,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u8ddd\u79bb\u7a97\u53e3\u9876\u90e8\u8fbe\u5230\u6307\u5b9a\u504f\u79fb\u91cf\u540e\u89e6\u53d1"])),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(146,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a._29(-1,null,["number"])),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(149,0,null,null,0,"td",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\n        "])),(l()(),a._29(-1,null,["\n        "])),(l()(),a._7(152,0,null,null,14,"tr",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(154,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a._29(-1,null,["nzTarget"])),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(157,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u8bbe\u7f6e\u9700\u8981\u76d1\u542c\u5176\u6eda\u52a8\u4e8b\u4ef6\u7684\u5143\u7d20\uff0c\u503c\u4e3a\u4e00\u4e2a\u8fd4\u56de\u5bf9\u5e94 DOM \u5143\u7d20\u7684\u51fd\u6570"])),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(160,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a._29(-1,null,["Element"])),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(163,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),a._7(164,0,null,null,1,"code",[],null,null,null,null,null)),(l()(),a._29(-1,null,["window"])),(l()(),a._29(-1,null,["\n        "])),(l()(),a._29(-1,null,["\n        "])),(l()(),a._7(168,0,null,null,12,"tr",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(170,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a._29(-1,null,["nzChange"])),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(173,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\u56fa\u5b9a\u72b6\u6001\u6539\u53d8\u65f6\u89e6\u53d1\u7684\u56de\u8c03\u51fd\u6570"])),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(176,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a._29(-1,null,["function"])),(l()(),a._29(-1,null,["\n          "])),(l()(),a._7(179,0,null,null,0,"td",[],null,null,null,null,null)),(l()(),a._29(-1,null,["\n        "])),(l()(),a._29(-1,null,["\n      "])),(l()(),a._29(-1,null,["\n    "])),(l()(),a._29(-1,null,["\n  "])),(l()(),a._29(-1,null,["\n"])),(l()(),a._29(-1,null,["\n"]))],function(l,n){var u=n.component;l(n,31,0,8),l(n,34,0,12),l(n,37,0,"\u57fa\u672c",u.NzDemoAffixBasicCode),l(n,51,0,12),l(n,54,0,"\u56fa\u5b9a\u72b6\u6001\u6539\u53d8\u7684\u56de\u8c03",u.NzDemoAffixFixedCode),l(n,69,0,8),l(n,72,0,12),l(n,75,0,"\u6eda\u52a8\u5bb9\u5668",u.NzDemoAffixContainerCode)},function(l,n){l(n,33,0,a._20(n,34).paddingLeft,a._20(n,34).paddingRight),l(n,50,0,a._20(n,51).paddingLeft,a._20(n,51).paddingRight),l(n,71,0,a._20(n,72).paddingLeft,a._20(n,72).paddingRight)})}var O=a._3("nz-demo-affix",T,function(l){return a._31(0,[(l()(),a._7(0,0,null,null,1,"nz-demo-affix",[],null,null,null,D,A)),a._6(1,49152,null,0,T,[],null,null)],null,null)},{},{},[]),w=u("XQ86"),j=u("94s6"),G=u("QYLS"),P=u("sVuO"),S=u("WKJP"),M=u("9Q3e"),N=u("4e8C"),I=u("7rz8"),R=u("PqOC"),B=u("md/V"),F=u("0nO6"),L=u("l6RC"),q=u("V8+5"),Q=u("4jwp"),K=u("OFGE"),J=u("7bMD"),U=u("71yQ"),V=u("jhj7"),Z=u("ppgG"),H=u("Hjq/"),W=u("hNpP"),Y=u("UHIZ"),E=function(){},X=u("jlvU"),$=u("AKwh"),ll=u("LTvz"),nl=u("v3Ml"),ul=u("KvRT"),al=u("fFfs"),_l=u("CZgk"),tl=u("ICnb"),ol=u("nQgM"),el=u("AMM9"),rl=u("x9cu"),il=u("Abwc"),cl=u("Gb4R"),fl=u("ATGq"),dl=u("rMvC"),pl=u("PIhm"),sl=u("G5xS"),zl=u("tGoV"),xl=u("Bd7q"),gl=u("+dpF"),bl=u("t6og"),ml=u("0oag"),hl=u("0MmT"),Cl=u("0SjK"),vl=u("UWIb"),yl=u("FP9i"),kl=u("8zAG"),Tl=u("OtIO"),Al=u("V5qy"),Dl=u("BGFw"),Ol=u("qa79"),wl=u("DJ6J"),jl=u("A6WS"),Gl=u("nGV/"),Pl=u("4I7f"),Sl=u("LLhl"),Ml=u("+35O"),Nl=u("TRYS"),Il=u("NGUZ"),Rl=u("Cjk6"),Bl=u("6eTp"),Fl=u("pORy"),Ll=u("aQzP"),ql=u("LpTC"),Ql=u("YeNB"),Kl=u("x7DS"),Jl=u("//KT"),Ul=u("h8LI"),Vl=u("1OKL"),Zl=u("Pgvs"),Hl=u("ZgIK"),Wl=u("mQB5"),Yl=u("9rok");u.d(n,"NzDemoAffixModuleNgFactory",function(){return El});var El=a._4(_,[],function(l){return a._16([a._17(512,a.k,a.Z,[[8,[O,w.a,j.a,G.a,P.a,S.a,M.a,N.a]],[3,a.k],a.w]),a._17(4608,c.o,c.n,[a.t,[2,c.w]]),a._17(5120,I.b,I.a,[[3,I.b],I.c]),a._17(5120,R.b,R.a,[[3,R.b],B.a,I.b]),a._17(4608,F.u,F.u,[]),a._17(6144,L.b,null,[c.d]),a._17(4608,L.c,L.c,[[2,L.b]]),a._17(4608,q.a,q.a,[]),a._17(5120,Q.c,Q.a,[[3,Q.c],a.y,q.a]),a._17(5120,Q.f,Q.e,[[3,Q.f],q.a,a.y]),a._17(4608,K.g,K.g,[Q.c,Q.f,a.y]),a._17(5120,K.d,K.h,[[3,K.d],c.d]),a._17(4608,K.l,K.l,[Q.f,c.d]),a._17(5120,K.e,K.k,[[3,K.e],c.d]),a._17(4608,K.c,K.c,[K.g,K.d,a.k,K.l,K.e,a.g,a.q,a.y,c.d]),a._17(5120,K.i,K.j,[K.c]),a._17(4608,J.a,J.a,[]),a._17(4608,U.a,U.a,[a.g,a.k,R.b]),a._17(4608,V.a,V.a,[]),a._17(4608,Z.b,Z.b,[]),a._17(5120,a.d,function(l,n){return[H.b(l,n)]},[c.d,[2,W.a]]),a._17(5120,p.a,p.b,[c.d,[3,p.a]]),a._17(512,Y.o,Y.o,[[2,Y.t],[2,Y.l]]),a._17(512,E,E,[]),a._17(512,c.c,c.c,[]),a._17(512,X.a,X.a,[]),a._17(512,$.a,$.a,[]),a._17(512,ll.a,ll.a,[]),a._17(512,nl.a,nl.a,[]),a._17(512,ul.a,ul.a,[]),a._17(512,al.a,al.a,[]),a._17(512,F.s,F.s,[]),a._17(512,F.i,F.i,[]),a._17(512,L.a,L.a,[]),a._17(512,_l.c,_l.c,[]),a._17(512,q.b,q.b,[]),a._17(512,Q.b,Q.b,[]),a._17(512,K.f,K.f,[]),a._17(512,tl.a,tl.a,[]),a._17(512,ol.a,ol.a,[]),a._17(512,el.a,el.a,[]),a._17(512,rl.a,rl.a,[]),a._17(512,il.a,il.a,[]),a._17(512,cl.a,cl.a,[]),a._17(512,fl.a,fl.a,[]),a._17(512,dl.a,dl.a,[]),a._17(512,pl.a,pl.a,[]),a._17(512,sl.a,sl.a,[]),a._17(512,zl.a,zl.a,[]),a._17(512,xl.a,xl.a,[]),a._17(512,gl.a,gl.a,[]),a._17(512,bl.a,bl.a,[]),a._17(512,ml.a,ml.a,[]),a._17(512,hl.a,hl.a,[]),a._17(512,Cl.a,Cl.a,[]),a._17(512,vl.a,vl.a,[]),a._17(512,yl.a,yl.a,[]),a._17(512,kl.a,kl.a,[]),a._17(512,Tl.a,Tl.a,[]),a._17(512,Al.a,Al.a,[]),a._17(512,Dl.a,Dl.a,[]),a._17(512,Ol.a,Ol.a,[]),a._17(512,wl.a,wl.a,[]),a._17(512,Z.c,Z.c,[]),a._17(512,jl.a,jl.a,[]),a._17(512,Gl.a,Gl.a,[]),a._17(512,Pl.a,Pl.a,[]),a._17(512,Sl.a,Sl.a,[]),a._17(512,Ml.a,Ml.a,[]),a._17(512,Nl.a,Nl.a,[]),a._17(512,Il.a,Il.a,[]),a._17(131584,H.a,H.a,[c.d,a.q,a.k]),a._17(512,Rl.a,Rl.a,[]),a._17(512,Bl.a,Bl.a,[]),a._17(512,Fl.a,Fl.a,[]),a._17(512,Ll.a,Ll.a,[]),a._17(512,ql.a,ql.a,[]),a._17(512,Ql.a,Ql.a,[]),a._17(512,Kl.a,Kl.a,[]),a._17(512,Jl.a,Jl.a,[]),a._17(512,Ul.a,Ul.a,[]),a._17(512,Vl.a,Vl.a,[]),a._17(512,Zl.a,Zl.a,[]),a._17(512,Hl.a,Hl.a,[]),a._17(512,_,_,[]),a._17(1024,Y.j,function(){return[[{path:"",component:T}]]},[]),a._17(256,I.c,!1,[]),a._17(256,B.a,ll.b,[]),a._17(256,Wl.b,{nzDuration:1500,nzAnimate:!0,nzPauseOnHover:!0,nzMaxStack:7},[]),a._17(256,Yl.b,{nzTop:"24px",nzRight:"0px",nzDuration:4500,nzMaxStack:7,nzPauseOnHover:!0,nzAnimate:!0},[])])})},OSCW:function(l,n){l.exports="import { Component } from '@angular/core';\r\n\r\n@Component({\r\n  selector: 'nz-demo-affix-basic',\r\n  template: `\r\n  <nz-affix>\r\n    <button nz-button [nzType]=\"'primary'\">\r\n        <span>Affix Button</span>\r\n    </button>\r\n  </nz-affix>\r\n  `\r\n})\r\nexport class NzDemoAffixBasicComponent { }\r\n"}});