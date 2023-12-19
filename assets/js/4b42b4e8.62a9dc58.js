"use strict";(self.webpackChunkdoc_3=self.webpackChunkdoc_3||[]).push([[4902],{7566:(n,s,e)=>{e.r(s),e.d(s,{assets:()=>c,contentTitle:()=>d,default:()=>j,frontMatter:()=>t,metadata:()=>i,toc:()=>x});var l=e(1527),r=e(7214);const t={},d="MyISAM vs Innodb",i={id:"mysql/engine",title:"MyISAM vs Innodb",description:"|\u6bd4\u8f83|MyISAM|Innodb|",source:"@site/docs/mysql/engine.md",sourceDirName:"mysql",slug:"/mysql/engine",permalink:"/docs/mysql/engine",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"mysql",next:{title:"Lock(\u9501)",permalink:"/docs/mysql/lock"}},c={},x=[];function h(n){const s={h1:"h1",li:"li",ol:"ol",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.h1,{id:"myisam-vs-innodb",children:"MyISAM vs Innodb"}),"\n",(0,l.jsxs)(s.table,{children:[(0,l.jsx)(s.thead,{children:(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.th,{children:"\u6bd4\u8f83"}),(0,l.jsx)(s.th,{children:"MyISAM"}),(0,l.jsx)(s.th,{style:{textAlign:"center"},children:"Innodb"})]})}),(0,l.jsxs)(s.tbody,{children:[(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"\u7c7b\u578b"}),(0,l.jsx)(s.td,{children:"\u975e\u4e8b\u52a1\u578b\u6570\u636e\u5e93\uff0c\u6240\u6709\u7684\u5199\u5165\u64cd\u4f5c\u90fd\u9700\u8981\u624b\u52a8\u56de\u6eda"}),(0,l.jsx)(s.td,{style:{textAlign:"center"},children:"\u4e8b\u52a1\u578b\u6570\u636e\u5e93\uff0c\u5982\u679c\u5199\u5165\u64cd\u4f5c\u672a\u5b8c\u6210\uff0c\u53ef\u4ee5\u81ea\u52a8\u56de\u6eda"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"\u9501"}),(0,l.jsx)(s.td,{children:"\u8868\u9501"}),(0,l.jsx)(s.td,{style:{textAlign:"center"},children:"\u884c\u9501"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"\u5916\u952e"}),(0,l.jsx)(s.td,{children:"\u4e0d\u652f\u6301"}),(0,l.jsx)(s.td,{style:{textAlign:"center"},children:"\u652f\u6301"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"\u539f\u5b50\u6027"}),(0,l.jsx)(s.td,{children:"\u4e0d\u652f\u6301"}),(0,l.jsx)(s.td,{style:{textAlign:"center"},children:"\u652f\u6301"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"\u6027\u80fd"}),(0,l.jsx)(s.td,{children:"\u8bfb\u64cd\u4f5c\u66f4\u5feb\uff08\u4e0d\u652f\u6301\u4e8b\u52a1\uff09"}),(0,l.jsx)(s.td,{style:{textAlign:"center"},children:"\u5199\u64cd\u4f5c\u66f4\u5feb\uff08\u652f\u6301\u4e8b\u52a1\uff09"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"\u53ef\u9760\u6027"}),(0,l.jsx)(s.td,{children:"\u4e0d\u63d0\u4f9b\u6570\u636e\u5b8c\u6574\u6027\uff0c\u786c\u4ef6\u6545\u969c\u548c\u53d6\u6d88\u64cd\u4f5c\u53ef\u80fd\u4f1a\u5bfc\u81f4\u6570\u636e\u635f\u574f"}),(0,l.jsx)(s.td,{style:{textAlign:"center"},children:"\u4f7f\u7528\u4e8b\u52a1\u65e5\u5fd7\u8bb0\u5f55\u64cd\u4f5c\uff0c\u5728\u53d1\u751f\u6545\u969c\u65f6\uff0c\u53ef\u4f7f\u7528\u8fd9\u4e9b\u65e5\u5fd7\u5feb\u901f\u6062\u590d\u6570\u636e"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"\u7f13\u5b58"}),(0,l.jsx)(s.td,{children:"\u5bc6\u94a5\u7f13\u51b2\u533a\u4ec5\u7528\u4e8e\u7d22\u5f15"}),(0,l.jsx)(s.td,{style:{textAlign:"center"},children:"\u652f\u6301\u6df7\u5b58\u6570\u636e\u548c\u7d22\u5f15\u7684\u5927\u578b\u7f13\u51b2\u533a\u6c60"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"\u5168\u6587\u7d22\u5f15"}),(0,l.jsx)(s.td,{children:"\u652f\u6301"}),(0,l.jsx)(s.td,{style:{textAlign:"center"},children:"\u4e0d\u652f\u6301"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"\u54c8\u5e0c\u7d22\u5f15"}),(0,l.jsx)(s.td,{children:"\u4e0d\u652f\u6301"}),(0,l.jsx)(s.td,{style:{textAlign:"center"},children:"\u652f\u6301"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"\u6784\u6210"}),(0,l.jsx)(s.td,{children:".frm\u6587\u4ef6\u5b58\u50a8\u8868\u5b9a\u4e49\uff0c.MYD\u5b58\u50a8\u6570\u636e\uff0c.MYI\u5b58\u50a8\u7d22\u5f15"}),(0,l.jsx)(s.td,{style:{textAlign:"center"},children:"\u57fa\u4e8e\u78c1\u76d8\u7684\u8d44\u6e90\u662fInnoDB\u8868\u7a7a\u95f4\u6570\u636e\u6587\u4ef6\u548c\u5b83\u7684\u65e5\u5fd7\u6587\u4ef6\uff0cInnoDB \u8868\u7684\u5927\u5c0f\u53ea\u53d7\u9650\u4e8e\u64cd\u4f5c\u7cfb\u7edf\u6587\u4ef6\u7684\u5927\u5c0f\uff0c\u4e00\u822c\u4e3a 2GB\u3002\u6570\u636e\u548c\u7d22\u5f15\u662f\u96c6\u4e2d\u5b58\u50a8\u7684(.ibd)\u3002"})]}),(0,l.jsxs)(s.tr,{children:[(0,l.jsx)(s.td,{children:"\u5b58\u50a8"}),(0,l.jsx)(s.td,{children:"\u6309\u63d2\u5165\u987a\u5e8f"}),(0,l.jsx)(s.td,{style:{textAlign:"center"},children:"\u6309\u4e3b\u952e\u5927\u5c0f"})]})]})]}),"\n",(0,l.jsxs)(s.ol,{children:["\n",(0,l.jsxs)(s.li,{children:["\u7c7b\u578b","\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"MyISAM"}),"\u662f\u975e\u4e8b\u52a1\u578b\u6570\u636e\u5e93\uff0c\u6240\u6709\u7684\u5199\u5165\uff08",(0,l.jsx)(s.strong,{children:"I"}),"\uff09\u64cd\u4f5c\u90fd\u9700\u8981\u624b\u52a8\u56de\u6eda\u3002"]}),"\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"Innodb"}),"\u662f\u4e8b\u52a1\u578b\u6570\u636e\u5e93\uff0c\u5982\u679c\u5199\u5165\uff08",(0,l.jsx)(s.strong,{children:"I"}),"\uff09\u64cd\u4f5c\u672a\u5b8c\u6210\uff0c\u53ef\u4ee5\u81ea\u52a8\u56de\u6eda\u3002"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["\u9501","\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"MyISAM"}),"\u4f7f\u7528\u8868\u9501\uff0c\u53ea\u5141\u8bb8\u5355\u4e2a\u4f1a\u8bdd\u5bf9\u8868\u8fdb\u884c\u4fee\u6539\u3002\u5982\u679c\u53e6\u4e00\u4e2a\u7528\u6237\u5c1d\u8bd5\u5bf9\u8868\u8fdb\u884c\u4fee\u6539\uff0c\u4f1a\u6536\u5230mysql\u8fd4\u56de\u7684\u8868\u5df2\u9501\u5b9a\u7684\u6d88\u606f\u3002\uff08\u8fd9\u79cd\u7ea7\u522b\u7684\u9501\u9002\u7528\u4e8e\u53ea\u8bfb\u7c7b\u578b\u7684\u6570\u636e\u5e93\uff0c\u56e0\u4e3a\u5b83\u4e0d\u9700\u8981\u5f88\u591a\u5185\u5b58\u8d44\u6e90\uff09"]}),"\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"Innodb"}),"\u4f7f\u7528\u8868\u7684\u884c\u7ea7\u9501\uff0c\u5b83\u5141\u8bb8\u4ec5\u5728\u4fee\u6539\u7684\u8fc7\u7a0b\u4e2d\u9501\u5b9a\uff0c\u4ece\u800c\u652f\u6301\u540c\u4e00\u884c\u4e0a\u7684\u591a\u4e2a\u4f1a\u8bdd\u3002\uff08\u884c\u9501\u7684\u7f3a\u70b9\u662f\u6d88\u8017\u5927\u91cf\u5185\u5b58\u8d44\u6e90\uff09"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(s.li,{children:"\u5916\u952e"}),"\n"]}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:["\u5916\u952e\u662f\u4e00\u4e2a\u8868\u4e2d\u5c06\u6570\u636e\u94fe\u63a5\u5230\u53e6\u4e00\u4e2a\u8868\u7684\u5217\u3002\u5b83\u9632\u6b62\u7528\u6237\u6dfb\u52a0\u7834\u574f\u4e24\u4e2a\u8868\u4e4b\u95f4\u94fe\u63a5\u7684\u8bb0\u5f55\u3002","\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"MyISAM"}),"\u4e0d\u652f\u6301\u5916\u952e"]}),"\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"Innodb"}),"\u652f\u6301\u5916\u952e"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.ol,{start:"4",children:["\n",(0,l.jsxs)(s.li,{children:["\u539f\u5b50\u6027","\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"MyISAM"}),"\u4e0d\u652f\u6301\u539f\u5b50\u6027"]}),"\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"Innodb"}),"\u652f\u6301\u539f\u5b50\u6027"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["\u6027\u80fd","\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"MyISAM"}),"\u4e0d\u652f\u6301\u4e8b\u52a1\u5c5e\u6027\uff0c\u8bfb\uff08",(0,l.jsx)(s.strong,{children:"O"}),"\uff09\u901f\u5ea6\u66f4\u5feb\uff0c\u4e0e",(0,l.jsx)(s.strong,{children:"Innodb"}),"\u76f8\u6bd4\u5927\u6570\u636e\u91cf\u6027\u80fd\u8f83\u4f4e\u3002"]}),"\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"Innodb"}),"\u652f\u6301\u4e8b\u7269\u5c5e\u6027\uff0c\u5373\u56de\u6eda\u548c\u63d0\u4ea4\uff0c\u5177\u6709\u66f4\u9ad8\u7684\u5199\u5165\uff08",(0,l.jsx)(s.strong,{children:"I"}),"\uff09\u901f\u5ea6\uff0c\u4e0e",(0,l.jsx)(s.strong,{children:"MyISAM"}),"\u76f8\u6bd4\uff0c\u5bf9\u5927\u6570\u636e\u91cf\u5927\u6027\u80fd\u66f4\u597d\u3002"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["\u53ef\u9760\u6027","\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"MyISAM"}),"\u4e0d\u63d0\u4f9b\u6570\u636e\u5b8c\u6574\u6027\uff0c\u786c\u4ef6\u6545\u969c\u548c\u53d6\u6d88\u64cd\u4f5c\u53ef\u80fd\u4f1a\u5bfc\u81f4\u6570\u636e\u635f\u574f\u3002"]}),"\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"Innodb"}),"\u4f7f\u7528\u4e8b\u52a1\u65e5\u5fd7\u8bb0\u5f55\u6bcf\u4e2a\u64cd\u4f5c\uff0c\u4ece\u800c\u63d0\u4f9b\u53ef\u9760\u6027\u3002\u56e0\u6b64\u5728\u53d1\u751f\u6545\u969c\u65f6\uff0c\u53ef\u4f7f\u7528\u8fd9\u4e9b\u65e5\u5fd7\u5feb\u901f\u6062\u590d\u6570\u636e\u3002"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["\u7f13\u5b58\u548c\u7d22\u5f15","\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"MyISAM"}),"\u5bc6\u94a5\u7f13\u51b2\u533a\u4ec5\u7528\u4e8e\u7d22\u5f15\u3002",(0,l.jsx)(s.strong,{children:"MiISAM"}),"\u652f\u6301\u5168\u6587\u7d22\u5f15\u3002"]}),"\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"Innodb"}),"\u652f\u6301\u6df7\u5b58\u6570\u636e\u548c\u7d22\u5f15\u7684\u5927\u578b\u7f13\u51b2\u533a\u6c60\u3002\u4f46\u4e0d\u652f\u6301\u5168\u6587\u7d22\u5f15\u3002"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["\u6784\u6210","\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"MyISAM"})," .frm\u6587\u4ef6\u5b58\u50a8\u8868\u5b9a\u4e49\uff0c.MYD\u5b58\u50a8\u6570\u636e\uff0c.MYI\u5b58\u50a8\u7d22\u5f15\u3002"]}),"\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"Innodb"}),"\u57fa\u4e8e\u78c1\u76d8\u7684\u8d44\u6e90\u662fInnoDB\u8868\u7a7a\u95f4\u6570\u636e\u6587\u4ef6\u548c\u5b83\u7684\u65e5\u5fd7\u6587\u4ef6\uff0cInnoDB \u8868\u7684\u5927\u5c0f\u53ea\u53d7\u9650\u4e8e\u64cd\u4f5c\u7cfb\u7edf\u6587\u4ef6\u7684\u5927\u5c0f\uff0c\u4e00\u822c\u4e3a 2GB\u3002"]}),"\n"]}),"\n"]}),"\n"]})]})}function j(n={}){const{wrapper:s}={...(0,r.a)(),...n.components};return s?(0,l.jsx)(s,{...n,children:(0,l.jsx)(h,{...n})}):h(n)}},7214:(n,s,e)=>{e.d(s,{Z:()=>i,a:()=>d});var l=e(959);const r={},t=l.createContext(r);function d(n){const s=l.useContext(t);return l.useMemo((function(){return"function"==typeof n?n(s):{...s,...n}}),[s,n])}function i(n){let s;return s=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:d(n.components),l.createElement(t.Provider,{value:s},n.children)}}}]);