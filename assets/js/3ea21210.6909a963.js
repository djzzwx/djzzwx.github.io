"use strict";(self.webpackChunkdoc_3=self.webpackChunkdoc_3||[]).push([[5401],{713:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>f,frontMatter:()=>c,metadata:()=>i,toc:()=>d});var o=t(1527),r=t(7214);const c={},s="\u5e76\u67e5\u96c6",i={id:"leetcode/union-set",title:"\u5e76\u67e5\u96c6",description:"",source:"@site/docs/leetcode/union-set.md",sourceDirName:"leetcode",slug:"/leetcode/union-set",permalink:"/docs/leetcode/union-set",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"leetcode",previous:{title:"\u6811\u5f62DP/\u6362\u6839DP",permalink:"/docs/leetcode/tree-dp"}},a={},d=[];function u(e){const n={code:"code",h1:"h1",pre:"pre",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"\u5e76\u67e5\u96c6",children:"\u5e76\u67e5\u96c6"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-go",metastring:"showLineNumbers",children:"fa := make([]int, n*n)\n\nfor i := range fa {\n\tfa[i] = i\n}\n\nvar find func(int) int\nfind = func(x int) int {\n\tif fa[x] != x {\n\t\tfa[x] = find(fa[x])\n\t}\n\treturn fa[x]\n}\n"})})]})}function f(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},7214:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>s});var o=t(959);const r={},c=o.createContext(r);function s(e){const n=o.useContext(c);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(c.Provider,{value:n},e.children)}}}]);