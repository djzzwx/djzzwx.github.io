"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[997],{9613:(e,n,r)=>{r.d(n,{Zo:()=>d,kt:()=>f});var t=r(9496);function i(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function a(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function c(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?a(Object(r),!0).forEach((function(n){i(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function o(e,n){if(null==e)return{};var r,t,i=function(e,n){if(null==e)return{};var r,t,i={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(i[r]=e[r]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=t.createContext({}),s=function(e){var n=t.useContext(l),r=n;return e&&(r="function"==typeof e?e(n):c(c({},n),e)),r},d=function(e){var n=s(e.components);return t.createElement(l.Provider,{value:n},e.children)},$="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},u=t.forwardRef((function(e,n){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),$=s(r),u=i,f=$["".concat(l,".").concat(u)]||$[u]||p[u]||a;return r?t.createElement(f,c(c({ref:n},d),{},{components:r})):t.createElement(f,c({ref:n},d))}));function f(e,n){var r=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=r.length,c=new Array(a);c[0]=u;var o={};for(var l in n)hasOwnProperty.call(n,l)&&(o[l]=n[l]);o.originalType=e,o[$]="string"==typeof e?e:i,c[1]=o;for(var s=2;s<a;s++)c[s]=r[s];return t.createElement.apply(null,c)}return t.createElement.apply(null,r)}u.displayName="MDXCreateElement"},6725:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>$,frontMatter:()=>a,metadata:()=>o,toc:()=>s});var t=r(4778),i=(r(9496),r(9613));const a={},c="\u5b57\u5178\u6811",o={unversionedId:"leetcode/tire",id:"leetcode/tire",title:"\u5b57\u5178\u6811",description:"\u76f8\u5173\u9898\u76ee",source:"@site/docs/leetcode/tire.md",sourceDirName:"leetcode",slug:"/leetcode/tire",permalink:"/docs/leetcode/tire",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/leetcode/tire.md",tags:[],version:"current",frontMatter:{},sidebar:"leetcodeSidebar",previous:{title:"\u6ed1\u52a8\u7a97\u53e3",permalink:"/docs/leetcode/sliding-window"},next:{title:"\u5e76\u67e5\u96c6",permalink:"/docs/leetcode/union-set"}},l={},s=[{value:"\u76f8\u5173\u9898\u76ee",id:"\u76f8\u5173\u9898\u76ee",level:4}],d={toc:s};function $(e){let{components:n,...r}=e;return(0,i.kt)("wrapper",(0,t.Z)({},d,r,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"\u5b57\u5178\u6811"},"\u5b57\u5178\u6811"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * Class TireNode\n */\nclass TireNode\n{\n    /**\n     * @var null\n     */\n    public $val = null;\n    /**\n     * @var array\n     */\n    public $children = [];\n    /**\n     * @var bool\n     */\n    public $tail = false;\n\n    /**\n     * TireNode constructor.\n     * @param null $val\n     */\n    function __construct($val = null)\n    {\n        $this->val = $val;\n    }\n}\n")),(0,i.kt)("h4",{id:"\u76f8\u5173\u9898\u76ee"},"\u76f8\u5173\u9898\u76ee"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://leetcode.cn/problems/replace-words/"},"leetcode 648. \u5355\u8bcd\u66ff\u6362")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"class Solution\n{\n\n    /**\n     * @param String[] $dictionary\n     * @param String $sentence\n     * @return String\n     */\n    function replaceWords($dictionary, $sentence)\n    {\n        $tire = new Tire;\n        foreach ($dictionary as $dic) {\n            $tire->insert($dic);\n        }\n        $sentence = explode(' ', $sentence);\n        foreach ($sentence as $k => $sen) {\n            $sentence[$k] = $tire->find($sen) ?: $sen;\n        }\n        return implode(' ', $sentence);\n    }\n}\n\nclass Tire\n{\n    /**\n     * @var\n     */\n    private $root;\n\n    /**\n     * Tire constructor.\n     */\n    function __construct()\n    {\n        $this->root = new TireNode('/');\n    }\n\n    /**\n     * @return TireNode\n     */\n    function getRoot()\n    {\n        return $this->root;\n    }\n\n    /**\n     * @param string $data\n     */\n    function insert($data)\n    {\n        $pre = $this->root;\n        for ($i = 0; $i < strlen($data); $i++) {\n            if (!isset($pre->children[$data[$i]])) {\n                $pre->children[$data[$i]] = new TireNode($data[$i] . '/');\n            }\n            $pre = $pre->children[$data[$i]];\n        }\n        $pre->tail = true;\n    }\n\n    /**\n     * @param $data\n     *\n     * @return string|string[]|null\n     */\n    function find($data)\n    {\n        $path = [];\n        $node = $this->root;\n        for ($i = 0; $i < strlen($data); $i++) {\n            $path[] = $node->val;\n            if (!isset($node->children[$data[$i]]) || $node->tail) {\n                break;\n            }\n            $node = $node->children[$data[$i]];\n        }\n        return $node->tail ? preg_replace('/\\//', '', implode('', $path)) : '';\n    }\n}\n")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://leetcode.cn/problems/implement-magic-dictionary/"},"676. \u5b9e\u73b0\u4e00\u4e2a\u9b54\u6cd5\u5b57\u5178")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"class Tire{\n    public $children = [];\n    public $end = false;\n}\n\nclass MagicDictionary {\n    private $root;\n    /**\n     */\n    function __construct() {\n        $this->root = new Tire;\n    }\n\n    /**\n     * @param String[] $dictionary\n     * @return NULL\n     */\n    function buildDict($dictionary) {\n        foreach ($dictionary as $dict) {\n            $cur = $this->root;\n            for ($i = 0; $i < strlen($dict); $i++) {\n                if (!isset($cur->children[$dict[$i]])) {\n                    $cur->children[$dict[$i]] = new Tire;\n                }\n                $cur = $cur->children[$dict[$i]];\n            }\n            $cur->end = true;\n        }\n    }\n\n    /**\n     * @param String $searchWord\n     * @return Boolean\n     */\n    function search($searchWord) {\n        return $this->_search($this->root, $searchWord, 0, false);\n    }\n\n    function _search($node, $search, $idx, $replace) {\n        if ($idx == strlen($search)) {\n            return $node->end && $replace;\n        }\n        if (isset($node->children[$search[$idx]])) {\n            if ($this->_search($node->children[$search[$idx]], $search, $idx + 1, $replace))\n                return true;\n        }\n        if (!$replace) {\n            foreach($node->children as $c => $child){\n                if ($c != $search[$idx] && $this->_search($child, $search, $idx + 1, true)) {\n                    return true;\n                }\n            }\n        }\n        return false;\n    }\n}\n")))}$.isMDXComponent=!0}}]);