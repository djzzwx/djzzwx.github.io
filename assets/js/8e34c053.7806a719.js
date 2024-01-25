"use strict";(self.webpackChunkdoc_3=self.webpackChunkdoc_3||[]).push([[790],{5305:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>$,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=e(1527),i=e(7214);const o={},a="\u7ebf\u6bb5\u6811",l={id:"leetcode/segment-tree",title:"\u7ebf\u6bb5\u6811",description:"P1531 I Hate It",source:"@site/docs/leetcode/segment-tree.md",sourceDirName:"leetcode",slug:"/leetcode/segment-tree",permalink:"/docs/leetcode/segment-tree",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"leetcode",previous:{title:"Rabin-Karp",permalink:"/docs/leetcode/rabin-karp"},next:{title:"\u5e73\u65b9\u6839",permalink:"/docs/leetcode/sqrt"}},d={},s=[];function u(n){const t={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,i.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"\u7ebf\u6bb5\u6811",children:"\u7ebf\u6bb5\u6811"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-go",metastring:"showLineNumbers",children:"type lazySeg []struct {\n\tl, r int\n\ttodo int\n\tsum  int\n}\n\nfunc (lazySeg) op(a, b int) int {\n\treturn a + b // % mod\n}\n\nfunc (t lazySeg) maintain(o int) {\n\tlo, ro := t[o<<1], t[o<<1|1]\n\tt[o].sum = t.op(lo.sum, ro.sum)\n}\n\nfunc (t lazySeg) build(a []int, o, l, r int) {\n\tt[o].l, t[o].r = l, r\n\tif l == r {\n\t\tt[o].sum = a[l-1]\n\t\treturn\n\t}\n\tm := (l + r) >> 1\n\tt.build(a, o<<1, l, m)\n\tt.build(a, o<<1|1, m+1, r)\n\tt.maintain(o)\n}\n\nfunc (t lazySeg) do(o int, add int) {\n\tto := &t[o]\n\tto.todo += add                     // % mod\n\tto.sum += int(to.r-to.l+1) * add // % mod\n}\n\nfunc (t lazySeg) spread(o int) {\n\tif add := t[o].todo; add != 0 {\n\t\tt.do(o<<1, add)\n\t\tt.do(o<<1|1, add)\n\t\tt[o].todo = 0\n\t}\n}\n\n// \u5982\u679c\u7ef4\u62a4\u7684\u6570\u636e\uff08\u6216\u8005\u5224\u65ad\u6761\u4ef6\uff09\u5177\u6709\u5355\u8c03\u6027\uff0c\u6211\u4eec\u5c31\u53ef\u4ee5\u5728\u7ebf\u6bb5\u6811\u4e0a\u4e8c\u5206\n// \u4e0b\u9762\u4ee3\u7801\u8fd4\u56de [l,r] \u5185\u7b2c\u4e00\u4e2a\u503c\u4e0d\u4f4e\u4e8e val \u7684\u4e0b\u6807\uff08\u672a\u627e\u5230\u65f6\u8fd4\u56de n+1\uff09\n// o=1  [l,r] 1<=l<=r<=n\n// https://codeforces.com/problemset/problem/1179/C\nfunc (t lazySeg) lowerBound(o, l, r int, val int) int {\n\tif t[o].l == t[o].r {\n\t\tif t[o].sum >= val {\n\t\t\treturn t[o].l\n\t\t}\n\t\treturn t[o].l + 1\n\t}\n\tt.spread(o)\n\t// \u6ce8\u610f\u5224\u65ad\u6bd4\u8f83\u7684\u5bf9\u8c61\u662f\u5f53\u524d\u8282\u70b9\u8fd8\u662f\u5b50\u8282\u70b9\uff0c\u662f\u5148\u9012\u5f52\u5de6\u5b50\u6811\u8fd8\u662f\u53f3\u5b50\u6811\n\tif t[o<<1].sum >= val {\n\t\treturn t.lowerBound(o<<1, l, r, val)\n\t}\n\treturn t.lowerBound(o<<1|1, l, r, val)\n}\n\n// o=1  [l,r] 1<=l<=r<=n\nfunc (t lazySeg) update(o, l, r int, add int) {\n\tif l <= t[o].l && t[o].r <= r {\n\t\tt.do(o, add)\n\t\treturn\n\t}\n\tt.spread(o)\n\tm := (t[o].l + t[o].r) >> 1\n\tif l <= m {\n\t\tt.update(o<<1, l, r, add)\n\t}\n\tif m < r {\n\t\tt.update(o<<1|1, l, r, add)\n\t}\n\tt.maintain(o)\n}\n\n// o=1  [l,r] 1<=l<=r<=n\nfunc (t lazySeg) query(o, l, r int) int {\n\tif l <= t[o].l && t[o].r <= r {\n\t\treturn t[o].sum\n\t}\n\tt.spread(o)\n\tm := (t[o].l + t[o].r) >> 1\n\tif r <= m {\n\t\treturn t.query(o<<1, l, r)\n\t}\n\tif m < l {\n\t\treturn t.query(o<<1|1, l, r)\n\t}\n\tvl := t.query(o<<1, l, r)\n\tvr := t.query(o<<1|1, l, r)\n\treturn t.op(vl, vr)\n}\n\nfunc (t lazySeg) queryAll() int { return t[1].sum }\n\n// a \u4ece 0 \u5f00\u59cb\nfunc newLazySegmentTree(a []int) lazySeg {\n\tt := make(lazySeg, 4*len(a))\n\tt.build(a, 1, 1, len(a))\n\treturn t\n}\n\n// EXTRA: \u9002\u7528\u4e8e\u9700\u8981\u63d0\u53d6\u6240\u6709\u5143\u7d20\u503c\u7684\u573a\u666f\nfunc (t lazySeg) spreadAll(o int) {\n\tif t[o].l == t[o].r {\n\t\treturn\n\t}\n\tt.spread(o)\n\tt.spreadAll(o << 1)\n\tt.spreadAll(o<<1 | 1)\n}\n"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-go",metastring:"showLineNumbers",children:"// \u52a8\u6001\u5f00\u70b9\n\ntype lazyNode struct {\n\tlo, ro *lazyNode\n\tl, r   int\n\tsum    int\n\ttodo   int\n}\n\nfunc (o *lazyNode) get() int {\n\tif o != nil {\n\t\treturn o.sum\n\t}\n\treturn 0 // inf\n}\n\nfunc (lazyNode) op(a, b int) int {\n\treturn a + b //\n}\n\nfunc (o *lazyNode) maintain() {\n\to.sum = o.op(o.lo.get(), o.ro.get())\n}\n\nfunc (o *lazyNode) build(a []int, l, r int) {\n\to.l, o.r = l, r\n\tif l == r {\n\t\to.sum = a[l-1]\n\t\treturn\n\t}\n\tm := (l + r) >> 1\n\to.lo = &lazyNode{}\n\to.lo.build(a, l, m)\n\to.ro = &lazyNode{}\n\to.ro.build(a, m+1, r)\n\to.maintain()\n}\n\nfunc (o *lazyNode) do(add int) {\n\to.todo += add                   // % mod\n\to.sum += int(o.r-o.l+1) * add // % mod\n}\n\nfunc (o *lazyNode) spread() {\n\tm := (o.l + o.r) >> 1\n\tif o.lo == nil {\n\t\to.lo = &lazyNode{l: o.l, r: m}\n\t}\n\tif o.ro == nil {\n\t\to.ro = &lazyNode{l: m + 1, r: o.r}\n\t}\n\tif add := o.todo; add != 0 {\n\t\to.lo.do(add)\n\t\to.ro.do(add)\n\t\to.todo = 0 // -1\n\t}\n}\n\nfunc (o *lazyNode) update(l, r int, add int) {\n\tif l <= o.l && o.r <= r {\n\t\to.do(add)\n\t\treturn\n\t}\n\to.spread()\n\tm := (o.l + o.r) >> 1\n\tif l <= m {\n\t\to.lo.update(l, r, add)\n\t}\n\tif m < r {\n\t\to.ro.update(l, r, add)\n\t}\n\to.maintain()\n}\n\nfunc (o *lazyNode) query(l, r int) int {\n\t// \u5bf9\u4e8e\u4e0d\u5728\u7ebf\u6bb5\u6811\u4e2d\u7684\u70b9\uff0c\u5e94\u6309\u7167\u9898\u610f\u6765\u8fd4\u56de\n\tif o == nil || l > o.r || r < o.l {\n\t\treturn 0 // inf\n\t}\n\tif l <= o.l && o.r <= r {\n\t\treturn o.sum\n\t}\n\to.spread()\n\treturn o.op(o.lo.query(l, r), o.ro.query(l, r))\n}\n"})}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://www.luogu.com.cn/problem/P1531",children:"P1531 I Hate It"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-go",metastring:"showLineNumbers",children:'package main\n\nimport (\n\t"bufio"\n\t. "fmt"\n\t"io"\n\t"os"\n)\n\nfunc run(_r io.Reader, out io.Writer) {\n\tin := bufio.NewReader(_r)\n\tvar n, m int\n\tFscan(in, &n)\n\tFscan(in, &m)\n\tnums := make([]int, n+1)\n\tfor i := 0; i < n; i++ {\n\t\tFscan(in, &nums[i+1])\n\t}\n\tN := n<<2 + 5\n\tt := make(SegTree, N)\n\tt.build(nums, 1, 1, n)\n\tvar a string\n\tvar b, c int\n\tfor i := m; i > 0; i-- {\n\t\tFscan(in, &a)\n\t\tFscan(in, &b)\n\t\tFscan(in, &c)\n\t\tif a == "Q" {\n\t\t\tFprintln(out, t.query(1, b, c))\n\t\t} else {\n\t\t\tt.update(1, b, b, c)\n\t\t}\n\t}\n}\n\nfunc main() { run(os.Stdin, os.Stdout) }\n\ntype SegTree []struct {\n\tl, r, v int\n}\n\nfunc (st SegTree) build(nums []int, i, l, r int) {\n\tst[i].l = l\n\tst[i].r = r\n\tif l == r {\n\t\tst[i].v = nums[l]\n\t\treturn\n\t}\n\tm := l + (r-l)>>1\n\tst.build(nums, i<<1, l, m)\n\tst.build(nums, i<<1|1, m+1, r)\n\tst.maintain(i)\n}\n\nfunc (st SegTree) maintain(i int) {\n\tst[i].v = max(st[i<<1].v, st[i<<1|1].v)\n}\n\nfunc (st SegTree) update(i, l, r, v int) {\n\tif st[i].l == l && st[i].r == r {\n\t\tst[i].v = max(st[i].v, v)\n\t\treturn\n\t}\n\tm := st[i].l + (st[i].r-st[i].l)>>1\n\tif l <= m {\n\t\tst.update(i<<1, l, r, v)\n\t} else if r > m {\n\t\tst.update(i<<1|1, l, r, v)\n\t} else {\n\t\tst.update(i<<1, l, r, v)\n\t\tst.update(i<<1|1, l, r, v)\n\t}\n\tst.maintain(i)\n}\n\nfunc (st SegTree) query(i, l, r int) int {\n\tif l <= st[i].l && st[i].r <= r {\n\t\treturn st[i].v\n\t}\n\tm := st[i].l + (st[i].r-st[i].l)>>1\n\tans := 0\n\tif l <= m {\n\t\tans = max(ans, st.query(i<<1, l, r))\n\t}\n\tif r > m {\n\t\tans = max(ans, st.query(i<<1|1, l, r))\n\t}\n\treturn ans\n}\n\nfunc max(a, b int) int {\n\tif a > b {\n\t\treturn a\n\t}\n\treturn b\n}\n'})}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://www.luogu.com.cn/problem/P2003",children:"P2003 [CRCI2007-2008] PLATFORME \u5e73\u677f"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-go",metastring:"showLineNumbers",children:'package main\n\nimport (\n\t"fmt"\n\t"sort"\n)\n\nfunc main() {\n\tvar n int\n\tfmt.Scanln(&n)\n\tflats := make([][]int, n)\n\tmr := 0\n\tfor i := 0; i < n; i++ {\n\t\tflats[i] = make([]int, 3)\n\t\tfmt.Scanln(&flats[i][0], &flats[i][1], &flats[i][2])\n\t\tmr = max(mr, flats[i][2])\n\t}\n\n\tsort.Slice(flats, func(i, j int) bool {\n\t\treturn flats[i][0] < flats[j][0]\n\t})\n\tans := 0\n\tt := make(SegTree, mr<<2)\n\tt.build(1, 1, mr)\n\tfor _, f := range flats {\n\t\th, l, r := f[0], f[1], f[2]\n\t\tans += h - t.query(1, l, l+1)\n\t\tans += h - t.query(1, r-1, r)\n\t\tt.insert(1, l+1, r-1, h)\n\t}\n\tfmt.Println(ans)\n}\n\ntype SegTree []struct {\n\tl, r, v, tag int\n}\n\nfunc (t SegTree) build(i, s, e int) {\n\tt[i].l = s\n\tt[i].r = e\n\tif s == e {\n\t\treturn\n\t}\n\tm := (s + e) >> 1\n\tt.build(i<<1, s, m)\n\tt.build(i<<1|1, m+1, e)\n}\n\nfunc (t SegTree) insert(i, s, e, h int) {\n\tl, r := t[i].l, t[i].r\n\tif l == s && e == r {\n\t\tt[i].v = max(t[i].v, h)\n\t\tt[i].tag = h\n\t\treturn\n\t}\n\tif t[i].tag > 0 {\n\t\tt.pushdown(i)\n\t}\n\tm := (l + r) >> 1\n\tif e <= m {\n\t\tt.insert(i<<1, s, e, h)\n\t} else if s > m {\n\t\tt.insert(i<<1|1, s, e, h)\n\t} else {\n\t\tt.insert(i<<1, s, m, h)\n\t\tt.insert(i<<1|1, m+1, e, h)\n\t}\n\tt[i].v = max(t[i<<1].v, t[i<<1|1].v)\n}\n\nfunc (t SegTree) query(i, s, e int) int {\n\tl, r := t[i].l, t[i].r\n\tif l == s && e == r {\n\t\treturn t[i].v\n\t}\n\tif t[i].tag > 0 {\n\t\tt.pushdown(i)\n\t}\n\tm := (l + r) >> 1\n\tif e <= m {\n\t\treturn t.query(i<<1, s, e)\n\t} else if s > m {\n\t\treturn t.query(i<<1|1, s, e)\n\t} else {\n\t\treturn max(t.query(i<<1, s, m), t.query(i<<1|1, m+1, e))\n\t}\n}\n\nfunc (t SegTree) pushdown(i int) {\n\tt[i<<1].v = max(t[i<<1].v, t[i].tag)\n\tt[i<<1|1].v = max(t[i<<1|1].v, t[i].tag)\n\tt[i<<1].tag = max(t[i<<1].tag, t[i].tag)\n\tt[i<<1|1].tag = max(t[i<<1|1].tag, t[i].tag)\n\tt[i].tag = 0\n}\n\nfunc max(a, b int) int {\n\tif a > b {\n\t\treturn a\n\t}\n\treturn b\n}\n'})}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://leetcode.cn/problems/my-calendar-i/",children:"leetcode 729. \u6211\u7684\u65e5\u7a0b\u5b89\u6392\u8868 I"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"class Node\n{\n    public $left = null, $right = null;\n    public $val = 0, $add = 0;\n}\n\nclass MyCalendar {\n    private $len = 1e9;\n    private $root = null;\n    /**\n     */\n    function __construct() {\n        $this->root = new Node;\n    }\n\n    /**\n     * @param Integer $start\n     * @param Integer $end\n     * @return Boolean\n     */\n    function book($start, $end) {\n        if ($this->query($this->root, 0, $this->len, $start, $end - 1)) {\n            return false;\n        }\n        $this->update($this->root, 0, $this->len, $start, $end - 1, 1);\n        return true;\n    }\n\n    function query(Node $node, $start, $end, $l, $r) {\n        if ($start >= $l && $end <= $r) {\n            return $node->val;\n        }\n        $this->pushDown($node);\n        $mid = ($start + $end) >> 1;\n        $ans = 0;\n        if ($mid >= $l) {\n            $ans = $this->query($node->left, $start, $mid, $l, $r);\n        }\n        if ($mid < $r) {\n            $ans = max($ans, $this->query($node->right, $mid + 1, $end, $l, $r));\n        }\n        return $ans;\n    }\n\n    function update(Node $node, $start, $end, $l, $r, $val) {\n        if ($start >= $l && $end <= $r) {\n            $node->val += $val;\n            $node->add += $val;\n            return ;\n        }\n        $this->pushDown($node);\n        $mid = ($start + $end) >> 1;\n        if ($mid >= $l) {\n            $this->update($node->left, $start, $mid, $l, $r, $val);\n        }\n        if ($mid < $r) {\n            $this->update($node->right, $mid + 1, $end, $l, $r, $val);\n        }\n        $this->pushUp($node);\n    }\n\n    function pushDown(Node $node) {\n        if ($node->left == null) {\n            $node->left = new Node;\n        }\n        if ($node->right == null) {\n            $node->right = new Node;\n        }\n        if ($node->add == 0) {\n            return;\n        }\n        $node->left->val += $node->add;\n        $node->left->add += $node->add;\n        $node->right->val += $node->add;\n        $node->right->add += $node->add;\n        $node->add = 0;\n    }\n\n    function pushUp(Node $node) {\n        $node->val = max($node->left->val, $node->right->val);\n    }\n}\n\n/**\n * Your MyCalendar object will be instantiated and called as such:\n * $obj = MyCalendar();\n * $ret_1 = $obj->book($start, $end);\n */\n\n"})}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://leetcode.cn/problems/my-calendar-ii/",children:"731. \u6211\u7684\u65e5\u7a0b\u5b89\u6392\u8868 II"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"<?php\n\nclass Node\n{\n    public $left = null, $right = null;\n    public $val = 0, $add = 0;\n}\n\nclass MyCalendarTwo\n{\n    private $limit = 1e9;\n    private $root = null;\n\n    /**\n     */\n    function __construct()\n    {\n        $this->root = new Node;\n    }\n\n    /**\n     * @param Integer $start\n     * @param Integer $end\n     * @return Boolean\n     */\n    function book($start, $end)\n    {\n        if ($this->query($this->root, 0, $this->limit, $start, $end - 1) > 1) {\n            return false;\n        }\n        $this->update($this->root, 0, $this->limit, $start, $end - 1, 1);\n        return true;\n    }\n\n    function query(Node $node, $start, $end, $l, $r)\n    {\n        if ($start >= $l && $end <= $r) {\n            return $node->val;\n        }\n        $this->pushDown($node);\n        $mid = ($start + $end) >> 1;\n        $ans = 0;\n        if ($mid >= $l) {\n            $ans = $this->query($node->left, $start, $mid, $l, $r);\n        }\n        if ($mid < $r) {\n            $ans = max($ans, $this->query($node->right, $mid + 1, $end, $l, $r));\n        }\n        return $ans;\n    }\n\n    function update(Node $node, $start, $end, $l, $r, $val)\n    {\n        if ($start >= $l && $end <= $r) {\n            $node->val += $val;\n            $node->add += $val;\n            return;\n        }\n        $this->pushDown($node);\n        $mid = ($start + $end) >> 1;\n        if ($mid >= $l) {\n            $this->update($node->left, $start, $mid, $l, $r, $val);\n        }\n        if ($mid < $r) {\n            $this->update($node->right, $mid + 1, $end, $l, $r, $val);\n        }\n        $this->pushUp($node);\n    }\n\n    function pushDown(Node $node)\n    {\n        if (!$node->left) {\n            $node->left = new Node;\n        }\n        if (!$node->right) {\n            $node->right = new Node;\n        }\n        if ($node->add == 0) {\n            return;\n        }\n        $node->left->val  += $node->add;\n        $node->left->add  += $node->add;\n        $node->right->val += $node->add;\n        $node->right->add += $node->add;\n        $node->add        = 0;\n    }\n\n    function pushUp(Node $node)\n    {\n        $node->val = max($node->left->val, $node->right->val);\n    }\n}\n\n/**\n * Your MyCalendarTwo object will be instantiated and called as such:\n * $obj = MyCalendarTwo();\n * $ret_1 = $obj->book($start, $end);\n */\n"})})]})}function $(n={}){const{wrapper:t}={...(0,i.a)(),...n.components};return t?(0,r.jsx)(t,{...n,children:(0,r.jsx)(u,{...n})}):u(n)}},7214:(n,t,e)=>{e.d(t,{Z:()=>l,a:()=>a});var r=e(959);const i={},o=r.createContext(i);function a(n){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function l(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:a(n.components),r.createElement(o.Provider,{value:t},n.children)}}}]);