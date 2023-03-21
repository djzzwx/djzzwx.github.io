"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[505],{9613:(t,e,r)=>{r.d(e,{Zo:()=>m,kt:()=>k});var n=r(9496);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e){if(null==t)return{};var r,n,a=function(t,e){if(null==t)return{};var r,n,a={},l=Object.keys(t);for(n=0;n<l.length;n++)r=l[n],e.indexOf(r)>=0||(a[r]=t[r]);return a}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)r=l[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}var o=n.createContext({}),p=function(t){var e=n.useContext(o),r=e;return t&&(r="function"==typeof t?t(e):i(i({},e),t)),r},m=function(t){var e=p(t.components);return n.createElement(o.Provider,{value:e},t.children)},s="mdxType",d={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},u=n.forwardRef((function(t,e){var r=t.components,a=t.mdxType,l=t.originalType,o=t.parentName,m=c(t,["components","mdxType","originalType","parentName"]),s=p(r),u=a,k=s["".concat(o,".").concat(u)]||s[u]||d[u]||l;return r?n.createElement(k,i(i({ref:e},m),{},{components:r})):n.createElement(k,i({ref:e},m))}));function k(t,e){var r=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var l=r.length,i=new Array(l);i[0]=u;var c={};for(var o in e)hasOwnProperty.call(e,o)&&(c[o]=e[o]);c.originalType=t,c[s]="string"==typeof t?t:a,i[1]=c;for(var p=2;p<l;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},1279:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>o,contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>c,toc:()=>p});var n=r(4778),a=(r(9496),r(9613));const l={},i="\u4e8b\u52a1(transaction)",c={unversionedId:"mysql/transaction",id:"mysql/transaction",title:"\u4e8b\u52a1(transaction)",description:"\u7279\u6027\uff1aACID",source:"@site/docs/mysql/transaction.md",sourceDirName:"mysql",slug:"/mysql/transaction",permalink:"/docs/mysql/transaction",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/mysql/transaction.md",tags:[],version:"current",frontMatter:{},sidebar:"mysqlSidebar",previous:{title:"Lock(\u9501)",permalink:"/docs/mysql/lock"}},o={},p=[{value:"\u7279\u6027\uff1aACID",id:"\u7279\u6027acid",level:3},{value:"\u9694\u79bb\u7ea7\u522b",id:"\u9694\u79bb\u7ea7\u522b",level:3},{value:"explain",id:"explain",level:3},{value:"\u5e7b\u8bfb\u89e3\u51b3\uff1a",id:"\u5e7b\u8bfb\u89e3\u51b3",level:3},{value:"mvcc",id:"mvcc",level:3}],m={toc:p};function s(t){let{components:e,...r}=t;return(0,a.kt)("wrapper",(0,n.Z)({},m,r,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u4e8b\u52a1transaction"},"\u4e8b\u52a1(transaction)"),(0,a.kt)("h3",{id:"\u7279\u6027acid"},"\u7279\u6027\uff1aACID"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Atomicity(\u539f\u5b50\u6027)\uff1a\u4e00\u4e2a\u4e8b\u52a1\u5fc5\u987b\u88ab\u89c6\u4e3a\u4e00\u4e2a\u4e0d\u53ef\u5206\u5272\u7684\u6700\u5c0f\u5de5\u4f5c\u5355\u5143\uff0c\u6574\u4e2a\u4e8b\u52a1\u7684\u6240\u6709\u64cd\u4f5c\u8981\u4e48\u5168\u90e8\u63d0\u4ea4\u6210\u529f\uff0c\u8981\u4e48\u5168\u90e8\u5931\u8d25\u56de\u6eda\uff0c\u4e0d\u53ef\u80fd\u53ea\u6267\u884c\u5176\u4e2d\u7684\u4e00\u90e8\u5206\u64cd\u4f5c\u3002"),(0,a.kt)("li",{parentName:"ul"},"Consistency(\u4e00\u81f4\u6027)\uff1a\u6570\u636e\u5e93\u603b\u662f\u4ece\u4e00\u4e2a\u4e00\u81f4\u72b6\u6001\u5230\u53e6\u4e00\u4e2a\u4e00\u81f4\u72b6\u6001"),(0,a.kt)("li",{parentName:"ul"},"Isolation(\u9694\u79bb\u6027)\uff1a\u901a\u5e38\u6765\u8bf4\uff0c\u4e00\u4e2a\u4e8b\u52a1\u6240\u505a\u7684\u4fee\u6539\u5728\u6700\u7ec8\u63d0\u4ea4\u4e4b\u524d\uff0c\u5bf9\u5176\u4ed6\u4e8b\u52a1\u662f\u4e0d\u53ef\u89c1\u7684\uff0c\u8fd9\u91cc\u201c\u901a\u5e38\u6765\u8bf4\u201d\u51b3\u5b9a\u4e8e\u9694\u79bb\u7ea7\u522b"),(0,a.kt)("li",{parentName:"ul"},"Durability(\u6301\u4e45\u6027)\uff1a\u4e00\u65e6\u4e8b\u52a1\u63d0\u4ea4\uff0c\u5219\u5176\u6240\u505a\u7684\u4fee\u6539\u5c31\u4f1a\u6c38\u4e45\u4fdd\u5b58\u5230\u6570\u636e\u5e93\u4e2d\u3002\u6b64\u65f6\u5373\u4f7f\u7cfb\u7edf\u5d29\u6e83\uff0c\u4fee\u6539\u7684\u6570\u636e\u4e5f\u4e0d\u4f1a\u4e22\u5931\u3002")),(0,a.kt)("h3",{id:"\u9694\u79bb\u7ea7\u522b"},"\u9694\u79bb\u7ea7\u522b"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"center"}),(0,a.kt)("th",{parentName:"tr",align:"center"},"\u810f\u8bfb"),(0,a.kt)("th",{parentName:"tr",align:"center"},"\u4e0d\u53ef\u91cd\u590d\u8bfb"),(0,a.kt)("th",{parentName:"tr",align:"center"},"\u5e7b\u8bfb"),(0,a.kt)("th",{parentName:"tr",align:"center"},"\u52a0\u9501\u8bfb"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("strong",{parentName:"td"},"Read Uncommitted")),(0,a.kt)("td",{parentName:"tr",align:"center"},"Yes"),(0,a.kt)("td",{parentName:"tr",align:"center"},"Yes"),(0,a.kt)("td",{parentName:"tr",align:"center"},"Yes"),(0,a.kt)("td",{parentName:"tr",align:"center"})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("strong",{parentName:"td"},"Read Committed")),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},"Yes"),(0,a.kt)("td",{parentName:"tr",align:"center"},"Yes"),(0,a.kt)("td",{parentName:"tr",align:"center"})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("strong",{parentName:"td"},"Repeatable Read")),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},"Yes"),(0,a.kt)("td",{parentName:"tr",align:"center"})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("strong",{parentName:"td"},"Serializable")),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"}),(0,a.kt)("td",{parentName:"tr",align:"center"},"Yes")))),(0,a.kt)("h3",{id:"explain"},"explain"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"\u5feb\u7167\u8bfb"),"\uff1a\u5feb\u7167\u8bfb\u7684\u6570\u636e\u53ef\u4ee5\u770b\u4f5c\u4e00\u4e2a\u5feb\u7167\uff0c\u5176\u4ed6\u4e8b\u52a1\u7684\u4fee\u6539\u4e0d\u4f1a\u6539\u53d8\u8fd9\u4e2a\u5feb\u7167\u503c\u3002\u4e5f\u5c31\u662f\u8bf4\u5feb\u7167\u8bfb\u7684\u6570\u636e\u4e0d\u4e00\u5b9a\u662f\u6700\u65b0\u503c\uff0c\u53ef\u91cd\u590d\u8bfb\u7ea7\u522b\u4e5f\u56e0\u6b64\u624d\u4fdd\u8bc1\u4e86 \u201c\u53ef\u91cd\u590d\u8bfb\u201d\u3002",(0,a.kt)("span",{style:{color:"red"}},"\u5feb\u7167\u8bfb\u7684\u4f18\u52bf\u662f\u4e0d\u7528\u52a0\u9501\uff0c\u5e76\u53d1\u6548\u7387\u9ad8"),"\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"\u5f53\u524d\u8bfb"),"\uff1a\u5f53\u524d\u8bfb\u6307\u7684\u5c31\u662f\u8bfb\u7684\u662f\u6700\u65b0\u503c\u3002\u65e2\u7136\u662f\u8981\u6c42\u662f\u6700\u65b0\u503c\uff0c\u90a3\u4e48\u5c31\u9700\u8981\u8fdb\u884c\u52a0\u9501\u9650\u5236\uff0c\u6240\u4ee5\u5f53\u524d\u8bfb\u662f\u9700\u8981\u52a0\u9501\u7684\uff0c\u540c\u65f6\u56e0\u4e3a\u5f53\u524d\u8bfb\u4e00\u5b9a\u662f\u6700\u65b0\u7684\u6570\u636e\uff0c\u6240\u4ee5\u5c31\u65e0\u6cd5\u4fdd\u8bc1 \u201c\u53ef\u91cd\u590d\u8bfb\u201d\u3002")),(0,a.kt)("h3",{id:"\u5e7b\u8bfb\u89e3\u51b3"},"\u5e7b\u8bfb\u89e3\u51b3\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"next-key lock"),(0,a.kt)("li",{parentName:"ul"},"mvcc")),(0,a.kt)("h3",{id:"mvcc"},"mvcc"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"undo log"),(0,a.kt)("li",{parentName:"ul"},"read view")))}s.isMDXComponent=!0}}]);