"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[902],{3905:(t,e,n)=>{n.d(e,{Zo:()=>k,kt:()=>s});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},l=Object.keys(t);for(r=0;r<l.length;r++)n=l[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(r=0;r<l.length;r++)n=l[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var o=r.createContext({}),m=function(t){var e=r.useContext(o),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},k=function(t){var e=m(t.components);return r.createElement(o.Provider,{value:e},t.children)},u="mdxType",N={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,l=t.originalType,o=t.parentName,k=p(t,["components","mdxType","originalType","parentName"]),u=m(n),d=a,s=u["".concat(o,".").concat(d)]||u[d]||N[d]||l;return n?r.createElement(s,i(i({ref:e},k),{},{components:n})):r.createElement(s,i({ref:e},k))}));function s(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var l=n.length,i=new Array(l);i[0]=d;var p={};for(var o in e)hasOwnProperty.call(e,o)&&(p[o]=e[o]);p.originalType=t,p[u]="string"==typeof t?t:a,i[1]=p;for(var m=2;m<l;m++)i[m]=n[m];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9999:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>i,default:()=>N,frontMatter:()=>l,metadata:()=>p,toc:()=>m});var r=n(7462),a=(n(7294),n(3905));const l={},i="MyISAM vs Innodb",p={unversionedId:"mysql/engine",id:"mysql/engine",title:"MyISAM vs Innodb",description:"|\u6bd4\u8f83|MyISAM|Innodb|",source:"@site/docs/mysql/engine.md",sourceDirName:"mysql",slug:"/mysql/engine",permalink:"/docs/mysql/engine",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/mysql/engine.md",tags:[],version:"current",frontMatter:{},sidebar:"mysqlSidebar",next:{title:"Lock(\u9501)",permalink:"/docs/mysql/lock"}},o={},m=[],k={toc:m},u="wrapper";function N(t){let{components:e,...n}=t;return(0,a.kt)(u,(0,r.Z)({},k,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"myisam-vs-innodb"},"MyISAM vs Innodb"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"\u6bd4\u8f83"),(0,a.kt)("th",{parentName:"tr",align:null},"MyISAM"),(0,a.kt)("th",{parentName:"tr",align:"center"},"Innodb"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,a.kt)("td",{parentName:"tr",align:null},"\u975e\u4e8b\u52a1\u578b\u6570\u636e\u5e93\uff0c\u6240\u6709\u7684\u5199\u5165\u64cd\u4f5c\u90fd\u9700\u8981\u624b\u52a8\u56de\u6eda"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u4e8b\u52a1\u578b\u6570\u636e\u5e93\uff0c\u5982\u679c\u5199\u5165\u64cd\u4f5c\u672a\u5b8c\u6210\uff0c\u53ef\u4ee5\u81ea\u52a8\u56de\u6eda")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"\u9501"),(0,a.kt)("td",{parentName:"tr",align:null},"\u8868\u9501"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u884c\u9501")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"\u5916\u952e"),(0,a.kt)("td",{parentName:"tr",align:null},"\u4e0d\u652f\u6301"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u652f\u6301")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"\u539f\u5b50\u6027"),(0,a.kt)("td",{parentName:"tr",align:null},"\u4e0d\u652f\u6301"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u652f\u6301")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"\u6027\u80fd"),(0,a.kt)("td",{parentName:"tr",align:null},"\u8bfb\u64cd\u4f5c\u66f4\u5feb\uff08\u4e0d\u652f\u6301\u4e8b\u52a1\uff09"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u5199\u64cd\u4f5c\u66f4\u5feb\uff08\u652f\u6301\u4e8b\u52a1\uff09")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"\u53ef\u9760\u6027"),(0,a.kt)("td",{parentName:"tr",align:null},"\u4e0d\u63d0\u4f9b\u6570\u636e\u5b8c\u6574\u6027\uff0c\u786c\u4ef6\u6545\u969c\u548c\u53d6\u6d88\u64cd\u4f5c\u53ef\u80fd\u4f1a\u5bfc\u81f4\u6570\u636e\u635f\u574f"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u4f7f\u7528\u4e8b\u52a1\u65e5\u5fd7\u8bb0\u5f55\u64cd\u4f5c\uff0c\u5728\u53d1\u751f\u6545\u969c\u65f6\uff0c\u53ef\u4f7f\u7528\u8fd9\u4e9b\u65e5\u5fd7\u5feb\u901f\u6062\u590d\u6570\u636e")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"\u7f13\u5b58"),(0,a.kt)("td",{parentName:"tr",align:null},"\u5bc6\u94a5\u7f13\u51b2\u533a\u4ec5\u7528\u4e8e\u7d22\u5f15"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u652f\u6301\u6df7\u5b58\u6570\u636e\u548c\u7d22\u5f15\u7684\u5927\u578b\u7f13\u51b2\u533a\u6c60")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"\u5168\u6587\u7d22\u5f15"),(0,a.kt)("td",{parentName:"tr",align:null},"\u652f\u6301"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u4e0d\u652f\u6301")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"\u54c8\u5e0c\u7d22\u5f15"),(0,a.kt)("td",{parentName:"tr",align:null},"\u4e0d\u652f\u6301"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u652f\u6301")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"\u6784\u6210"),(0,a.kt)("td",{parentName:"tr",align:null},".frm\u6587\u4ef6\u5b58\u50a8\u8868\u5b9a\u4e49\uff0c.MYD\u5b58\u50a8\u6570\u636e\uff0c.MYI\u5b58\u50a8\u7d22\u5f15"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u57fa\u4e8e\u78c1\u76d8\u7684\u8d44\u6e90\u662fInnoDB\u8868\u7a7a\u95f4\u6570\u636e\u6587\u4ef6\u548c\u5b83\u7684\u65e5\u5fd7\u6587\u4ef6\uff0cInnoDB \u8868\u7684\u5927\u5c0f\u53ea\u53d7\u9650\u4e8e\u64cd\u4f5c\u7cfb\u7edf\u6587\u4ef6\u7684\u5927\u5c0f\uff0c\u4e00\u822c\u4e3a 2GB\u3002\u6570\u636e\u548c\u7d22\u5f15\u662f\u96c6\u4e2d\u5b58\u50a8\u7684(.ibd)\u3002")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"\u5b58\u50a8"),(0,a.kt)("td",{parentName:"tr",align:null},"\u6309\u63d2\u5165\u987a\u5e8f"),(0,a.kt)("td",{parentName:"tr",align:"center"},"\u6309\u4e3b\u952e\u5927\u5c0f")))),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u7c7b\u578b",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"MyISAM"),"\u662f\u975e\u4e8b\u52a1\u578b\u6570\u636e\u5e93\uff0c\u6240\u6709\u7684\u5199\u5165\uff08",(0,a.kt)("strong",{parentName:"li"},"I"),"\uff09\u64cd\u4f5c\u90fd\u9700\u8981\u624b\u52a8\u56de\u6eda\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Innodb"),"\u662f\u4e8b\u52a1\u578b\u6570\u636e\u5e93\uff0c\u5982\u679c\u5199\u5165\uff08",(0,a.kt)("strong",{parentName:"li"},"I"),"\uff09\u64cd\u4f5c\u672a\u5b8c\u6210\uff0c\u53ef\u4ee5\u81ea\u52a8\u56de\u6eda\u3002"))),(0,a.kt)("li",{parentName:"ol"},"\u9501",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"MyISAM"),"\u4f7f\u7528\u8868\u9501\uff0c\u53ea\u5141\u8bb8\u5355\u4e2a\u4f1a\u8bdd\u5bf9\u8868\u8fdb\u884c\u4fee\u6539\u3002\u5982\u679c\u53e6\u4e00\u4e2a\u7528\u6237\u5c1d\u8bd5\u5bf9\u8868\u8fdb\u884c\u4fee\u6539\uff0c\u4f1a\u6536\u5230mysql\u8fd4\u56de\u7684\u8868\u5df2\u9501\u5b9a\u7684\u6d88\u606f\u3002\uff08\u8fd9\u79cd\u7ea7\u522b\u7684\u9501\u9002\u7528\u4e8e\u53ea\u8bfb\u7c7b\u578b\u7684\u6570\u636e\u5e93\uff0c\u56e0\u4e3a\u5b83\u4e0d\u9700\u8981\u5f88\u591a\u5185\u5b58\u8d44\u6e90\uff09"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Innodb"),"\u4f7f\u7528\u8868\u7684\u884c\u7ea7\u9501\uff0c\u5b83\u5141\u8bb8\u4ec5\u5728\u4fee\u6539\u7684\u8fc7\u7a0b\u4e2d\u9501\u5b9a\uff0c\u4ece\u800c\u652f\u6301\u540c\u4e00\u884c\u4e0a\u7684\u591a\u4e2a\u4f1a\u8bdd\u3002\uff08\u884c\u9501\u7684\u7f3a\u70b9\u662f\u6d88\u8017\u5927\u91cf\u5185\u5b58\u8d44\u6e90\uff09"))),(0,a.kt)("li",{parentName:"ol"},"\u5916\u952e")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5916\u952e\u662f\u4e00\u4e2a\u8868\u4e2d\u5c06\u6570\u636e\u94fe\u63a5\u5230\u53e6\u4e00\u4e2a\u8868\u7684\u5217\u3002\u5b83\u9632\u6b62\u7528\u6237\u6dfb\u52a0\u7834\u574f\u4e24\u4e2a\u8868\u4e4b\u95f4\u94fe\u63a5\u7684\u8bb0\u5f55\u3002",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"MyISAM"),"\u4e0d\u652f\u6301\u5916\u952e"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Innodb"),"\u652f\u6301\u5916\u952e")))),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},"\u539f\u5b50\u6027",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"MyISAM"),"\u4e0d\u652f\u6301\u539f\u5b50\u6027"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Innodb"),"\u652f\u6301\u539f\u5b50\u6027"))),(0,a.kt)("li",{parentName:"ol"},"\u6027\u80fd",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"MyISAM"),"\u4e0d\u652f\u6301\u4e8b\u52a1\u5c5e\u6027\uff0c\u8bfb\uff08",(0,a.kt)("strong",{parentName:"li"},"O"),"\uff09\u901f\u5ea6\u66f4\u5feb\uff0c\u4e0e",(0,a.kt)("strong",{parentName:"li"},"Innodb"),"\u76f8\u6bd4\u5927\u6570\u636e\u91cf\u6027\u80fd\u8f83\u4f4e\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Innodb"),"\u652f\u6301\u4e8b\u7269\u5c5e\u6027\uff0c\u5373\u56de\u6eda\u548c\u63d0\u4ea4\uff0c\u5177\u6709\u66f4\u9ad8\u7684\u5199\u5165\uff08",(0,a.kt)("strong",{parentName:"li"},"I"),"\uff09\u901f\u5ea6\uff0c\u4e0e",(0,a.kt)("strong",{parentName:"li"},"MyISAM"),"\u76f8\u6bd4\uff0c\u5bf9\u5927\u6570\u636e\u91cf\u5927\u6027\u80fd\u66f4\u597d\u3002"))),(0,a.kt)("li",{parentName:"ol"},"\u53ef\u9760\u6027",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"MyISAM"),"\u4e0d\u63d0\u4f9b\u6570\u636e\u5b8c\u6574\u6027\uff0c\u786c\u4ef6\u6545\u969c\u548c\u53d6\u6d88\u64cd\u4f5c\u53ef\u80fd\u4f1a\u5bfc\u81f4\u6570\u636e\u635f\u574f\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Innodb"),"\u4f7f\u7528\u4e8b\u52a1\u65e5\u5fd7\u8bb0\u5f55\u6bcf\u4e2a\u64cd\u4f5c\uff0c\u4ece\u800c\u63d0\u4f9b\u53ef\u9760\u6027\u3002\u56e0\u6b64\u5728\u53d1\u751f\u6545\u969c\u65f6\uff0c\u53ef\u4f7f\u7528\u8fd9\u4e9b\u65e5\u5fd7\u5feb\u901f\u6062\u590d\u6570\u636e\u3002"))),(0,a.kt)("li",{parentName:"ol"},"\u7f13\u5b58\u548c\u7d22\u5f15",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"MyISAM"),"\u5bc6\u94a5\u7f13\u51b2\u533a\u4ec5\u7528\u4e8e\u7d22\u5f15\u3002",(0,a.kt)("strong",{parentName:"li"},"MiISAM"),"\u652f\u6301\u5168\u6587\u7d22\u5f15\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Innodb"),"\u652f\u6301\u6df7\u5b58\u6570\u636e\u548c\u7d22\u5f15\u7684\u5927\u578b\u7f13\u51b2\u533a\u6c60\u3002\u4f46\u4e0d\u652f\u6301\u5168\u6587\u7d22\u5f15\u3002"))),(0,a.kt)("li",{parentName:"ol"},"\u6784\u6210",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"MyISAM")," .frm\u6587\u4ef6\u5b58\u50a8\u8868\u5b9a\u4e49\uff0c.MYD\u5b58\u50a8\u6570\u636e\uff0c.MYI\u5b58\u50a8\u7d22\u5f15\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Innodb"),"\u57fa\u4e8e\u78c1\u76d8\u7684\u8d44\u6e90\u662fInnoDB\u8868\u7a7a\u95f4\u6570\u636e\u6587\u4ef6\u548c\u5b83\u7684\u65e5\u5fd7\u6587\u4ef6\uff0cInnoDB \u8868\u7684\u5927\u5c0f\u53ea\u53d7\u9650\u4e8e\u64cd\u4f5c\u7cfb\u7edf\u6587\u4ef6\u7684\u5927\u5c0f\uff0c\u4e00\u822c\u4e3a 2GB\u3002")))))}N.isMDXComponent=!0}}]);