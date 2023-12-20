"use strict";(self.webpackChunkdoc_3=self.webpackChunkdoc_3||[]).push([[109],{603:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var t=i(1527),r=i(7214);const o={},s="\u8d28\u6570",c={id:"leetcode/prime",title:"\u8d28\u6570",description:"\u6c42\u89e3  <= n  \u7684\u6240\u6709\u8d28\u6570",source:"@site/docs/leetcode/prime.md",sourceDirName:"leetcode",slug:"/leetcode/prime",permalink:"/docs/leetcode/prime",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"leetcode",previous:{title:"\u751f\u6210\u56de\u6587\u6570",permalink:"/docs/leetcode/palindrome-num"},next:{title:"\u5feb\u901f\u5e42",permalink:"/docs/leetcode/quick-pow"}},l={},d=[{value:"\u6c42\u89e3 <code>&lt;= n</code> \u7684\u6240\u6709\u8d28\u6570",id:"\u6c42\u89e3--n-\u7684\u6240\u6709\u8d28\u6570",level:2},{value:"\u57c3\u6c0f\u7b5b",id:"\u57c3\u6c0f\u7b5b",level:3},{value:"\u6b27\u62c9\u7b5b",id:"\u6b27\u62c9\u7b5b",level:3},{value:"\u76f8\u5173\u9898\u76ee",id:"\u76f8\u5173\u9898\u76ee",level:4}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"\u8d28\u6570",children:"\u8d28\u6570"}),"\n",(0,t.jsxs)(n.h2,{id:"\u6c42\u89e3--n-\u7684\u6240\u6709\u8d28\u6570",children:["\u6c42\u89e3 ",(0,t.jsx)(n.code,{children:"<= n"})," \u7684\u6240\u6709\u8d28\u6570"]}),"\n",(0,t.jsx)(n.h3,{id:"\u57c3\u6c0f\u7b5b",children:"\u57c3\u6c0f\u7b5b"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",metastring:"showLineNumbers",children:"prime := make([]bool, n+1)\nfor i := 2; i <= n; i++ {\n    prime[i] = true\n}\nfor i := 2; i <= n; i++ {\n    if prime[i] {\n        for j := i * i; j <= n; j += i {\n            prime[j] = false\n        }\n    }\n}\n"})}),"\n",(0,t.jsx)(n.h3,{id:"\u6b27\u62c9\u7b5b",children:"\u6b27\u62c9\u7b5b"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",metastring:"showLineNumbers",children:"prime := make([]bool, n+1)\nlist := []int{}\nfor i := 2; i <= n; i++ {\n    prime[i] = true\n}\nfor i := 2; i <= n; i++ {\n    if prime[i] {\n        list = append(list, i)\n    }\n    for _, v := range list {\n        if t := i * v; t <= n {\n            prime[i*v] = false\n        }\n        if i % v == 0 {\n            break\n        }\n    }\n}\n"})}),"\n",(0,t.jsx)(n.h4,{id:"\u76f8\u5173\u9898\u76ee",children:"\u76f8\u5173\u9898\u76ee"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://leetcode.cn/problems/prime-pairs-with-target-sum/",children:"2761. \u548c\u7b49\u4e8e\u76ee\u6807\u503c\u7684\u8d28\u6570\u5bf9"})})]})}function p(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},7214:(e,n,i)=>{i.d(n,{Z:()=>c,a:()=>s});var t=i(959);const r={},o=t.createContext(r);function s(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);