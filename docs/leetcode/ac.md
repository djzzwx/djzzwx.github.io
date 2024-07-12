# AC 自动机

[最小代价构造字符串](https://leetcode.cn/problems/construct-string-with-minimum-cost/description/)

1. 给定目标串 target
2. 给定模式串 words
3. 给定模式串使用花费 costs costs.length == words.length
4. 求构造目标串最小花费
```go
type node struct {
	son  [26]*node
	fail *node // 当 o.son[i] 不能匹配 target 中的某个字符时，o.fail.son[i] 即为下一个待匹配节点（等于 root 则表示没有匹配）
	last *node // 后缀链接（suffix link），用来快速跳到一定是某个 words[k] 的最后一个字母的节点（等于 root 则表示没有）
	len  int
	cost int
}

type acam struct {
	root *node
}

func (ac *acam) put(s string, cost int) {
	cur := ac.root
	for _, b := range s {
		b -= 'a'
		if cur.son[b] == nil {
			cur.son[b] = &node{cost: math.MaxInt}
		}
		cur = cur.son[b]
	}
	cur.len = len(s)
	cur.cost = min(cur.cost, cost)
}

func (ac *acam) buildFail() {
	ac.root.fail = ac.root
	ac.root.last = ac.root
	q := []*node{}
	for i, son := range ac.root.son[:] {
		if son == nil {
			ac.root.son[i] = ac.root
		} else {
			son.fail = ac.root // 第一层的失配指针，都指向根节点 ∅
			son.last = ac.root
			q = append(q, son)
		}
	}
	// BFS
	for len(q) > 0 {
		cur := q[0]
		q = q[1:]
		for i, son := range cur.son[:] {
			if son == nil {
				// 虚拟子节点 o.son[i]，和 o.fail.son[i] 是同一个
				// 方便失配时直接跳到下一个可能匹配的位置（但不一定是某个 words[k] 的最后一个字母）
				cur.son[i] = cur.fail.son[i]
				continue
			}
			son.fail = cur.fail.son[i] // 计算失配位置
			if son.fail.len > 0 {
				son.last = son.fail
			} else {
				// 沿着 last 往上走，可以直接跳到一定是某个 words[k] 的最后一个字母的节点（如果跳到 root 表示没有匹配）
				son.last = son.fail.last
			}
			q = append(q, son)
		}
	}
}

func minimumCost(target string, words []string, costs []int) int {
	ac := &acam{root: &node{}}
	for i, w := range words {
		ac.put(w, costs[i])
	}
	ac.buildFail()

	n := len(target)
	f := make([]int, n+1)
	cur := ac.root
	for i, b := range target {
		cur = cur.son[b-'a'] // 如果没有匹配相当于移动到 fail 的 son[b-'a']
		i++
		f[i] = math.MaxInt / 2
		if cur.len > 0 { // 匹配到了一个尽可能长的 words[k]
			f[i] = min(f[i], f[i-cur.len]+cur.cost)
		}
		// 还可能匹配其余更短的 words[k]，要在 last 链上找
		for fail := cur.last; fail != ac.root; fail = fail.last {
			f[i] = min(f[i], f[i-fail.len]+fail.cost)
		}
	}
	if f[n] == math.MaxInt/2 {
		return -1
	}
	return f[n]
}

```

[P3808 AC 自动机（简单版）](https://www.luogu.com.cn/problem/P3808)
1. 给定目标串 target
2. 给定模式串 words
3. 求有多少个模式串在目标串出现过（多次出现算一次）
[code](https://www.luogu.com.cn/record/165535790)
   
```go
package main

import (
	"bufio"
	. "fmt"
	"io"
	"os"
)

func run(_r io.Reader, _w io.Writer) {
	in := bufio.NewReader(_r)
	out := bufio.NewWriter(_w)
	defer out.Flush()
	var n int
	var s, t string
	ac := &acam{root: &node{}}
	for Fscan(in, &n); n > 0; n-- {
		Fscan(in, &s)
		ac.put(s, 1)
	}
	ac.buildFail()
	Fscan(in, &t)
	ans := 0
	cur := ac.root
	for _, b := range t {
		cur = cur.son[b-'a']
		for o := cur; o != ac.root && o.cost > 0; o = o.fail {
			ans += o.cost
			o.cost = 0
		}
	}
	Fprintln(out, ans)
}

func main() { run(os.Stdin, os.Stdout) }

type node struct {
	son  [26]*node
	fail *node // 当 o.son[i] 不能匹配 target 中的某个字符时，o.fail.son[i] 即为下一个待匹配节点（等于 root 则表示没有匹配）
	last *node // 后缀链接（suffix link），用来快速跳到一定是某个 words[k] 的最后一个字母的节点（等于 root 则表示没有）
	len  int
	cost int
}

type acam struct {
	root *node
}

func (ac *acam) put(s string, cost int) {
	cur := ac.root
	for _, b := range s {
		b -= 'a'
		if cur.son[b] == nil {
			cur.son[b] = &node{}
		}
		cur = cur.son[b]
	}
	cur.len = len(s)
	cur.cost++
}

func (ac *acam) buildFail() {
	ac.root.fail = ac.root
	ac.root.last = ac.root
	q := []*node{}
	for i, son := range ac.root.son[:] {
		if son == nil {
			ac.root.son[i] = ac.root
		} else {
			son.fail = ac.root // 第一层的失配指针，都指向根节点 ∅
			son.last = ac.root
			q = append(q, son)
		}
	}
	// BFS
	for len(q) > 0 {
		cur := q[0]
		q = q[1:]
		for i, son := range cur.son[:] {
			if son == nil {
				// 虚拟子节点 o.son[i]，和 o.fail.son[i] 是同一个
				// 方便失配时直接跳到下一个可能匹配的位置（但不一定是某个 words[k] 的最后一个字母）
				cur.son[i] = cur.fail.son[i]
				continue
			}
			son.fail = cur.fail.son[i] // 计算失配位置
			if son.fail.len > 0 {
				son.last = son.fail
			} else {
				// 沿着 last 往上走，可以直接跳到一定是某个 words[k] 的最后一个字母的节点（如果跳到 root 表示没有匹配）
				son.last = son.fail.last
			}
			q = append(q, son)
		}
	}
}
```

[P3796 AC 自动机（简单版 II）](https://www.luogu.com.cn/problem/P3796)
1. 给定目标串 target
2. 给定模式串 words
3. 求出现次数最多的模式串（输出按输入顺序）
[code](https://www.luogu.com.cn/record/165553736)
   
```go
package main

import (
	"bufio"
	. "fmt"
	"io"
	"os"
	"strings"
)

func run(_r io.Reader, _w io.Writer) {
	in := bufio.NewReader(_r)
	out := bufio.NewWriter(_w)
	defer out.Flush()
	var n int
	var t string
	for Fscan(in, &n); n > 0; Fscan(in, &n) {
		pattarns := make([]string, n)
		for i := range pattarns {
			Fscan(in, &pattarns[i])
		}
		Fscan(in, &t)
		ac := newACAM(pattarns)
		cnt := ac.acSearchCount(t)
		mxI := 0
		mxC := 0
		res := []string{}
		for i, c := range cnt {
			if c > mxC {
				mxI = i
				mxC = c
				res = []string{pattarns[i]}
			} else if c == mxC {
				res = append(res, pattarns[i])
			}
		}
		Fprintln(out, cnt[mxI])
		Fprintln(out, strings.Join(res, "\n"))
	}
}

func main() { run(os.Stdin, os.Stdout) }

const acamNodeSize = 26

type acamNode struct {
	son [acamNodeSize]*acamNode
	cnt int //（子树中）完整字符串的个数
	idx int // 或者替换成 end bool

	// 当 o.son[i] 不能匹配文本串 text 中的某个字符时，o.fail.son[i] 即为下一个待匹配节点
	fail *acamNode
	//last *acamNode // 后缀链接（suffix link），用来快速跳到一定是模式串末尾的位置（算法题一般不用）

	nodeID int
}

type acam struct {
	patterns []string // 额外保存，方便 debug

	root    *acamNode
	nodeCnt int

	g [][]int // fail 树

	inDeg map[*acamNode]int // 求拓扑序时有用
}

func newACAM(patterns []string) *acam {
	t := &acam{
		patterns: patterns,
		root:     &acamNode{},
		nodeCnt:  1,
		inDeg:    map[*acamNode]int{},
	}
	for i, s := range patterns {
		t.put(s, i+1) // 注意这里 +1 了
	}
	t.buildFail()
	return t
}

func (acam) ord(c rune) rune { return c - 'a' }

// 插入字符串 s，附带值 idx
func (t *acam) put(s string, idx int) *acamNode {
	o := t.root
	for _, b := range s {
		b = t.ord(b)
		if o.son[b] == nil {
			newNode := &acamNode{nodeID: t.nodeCnt}
			o.son[b] = newNode
			t.inDeg[newNode] = 0
			t.nodeCnt++
		}
		o = o.son[b]
		//o.cnt++ // 写法一：统计 o 对应的字符串是多少个完整字符串的前缀
	}
	//o.cnt++ // 写法二：统计 o 上有多少个完整字符串
	o.idx = idx
	//o.end = true
	return o // o.nodeID
}

func (t *acam) buildFail() {
	t.g = make([][]int, t.nodeCnt) //
	t.root.fail = t.root
	//t.root.last = t.root
	q := make([]*acamNode, 0, t.nodeCnt)
	for i, son := range t.root.son[:] {
		if son == nil {
			t.root.son[i] = t.root
		} else {
			son.fail = t.root // 第一层的失配指针，都指向 ∅
			//son.last = t.root
			t.g[son.fail.nodeID] = append(t.g[son.fail.nodeID], son.nodeID)
			q = append(q, son)
		}
	}
	// BFS
	for len(q) > 0 {
		o := q[0]
		q = q[1:]
		f := o.fail
		//o.end = o.end || f.end // o 是否为某个模式串的末尾
		for i, son := range o.son[:] {
			if son == nil {
				o.son[i] = f.son[i] // 虚拟子节点 o.son[i]，和 o.fail.son[i] 是同一个
				continue
			}
			son.fail = f.son[i] // 下一个匹配位置
			t.g[son.fail.nodeID] = append(t.g[son.fail.nodeID], son.nodeID)
			t.inDeg[son.fail]++
			//if son.fail.cnt > 0 {
			//	son.last = son.fail
			//} else {
			//	son.last = son.fail.last
			//}
			q = append(q, son)
		}
	}
}

func (t *acam) acSearchCount(text string) []int {
	// 【注意】调用前把 put 中的 o.cnt++ 去掉！
	o := t.root
	for _, b := range text {
		o = o.son[t.ord(b)]
		// 本来应该像上面那样一路找到 t.root，但这样太慢了
		// 可以先打个标记，然后在 fail 树上跑拓扑序一起统计
		o.cnt++
	}

	cnt := make([]int, len(t.patterns))
	deg := t.inDeg
	q := make([]*acamNode, 0, len(deg)+1)
	for v, d := range deg {
		if d == 0 {
			q = append(q, v)
		}
	}
	for len(q) > 0 {
		v := q[0]
		q = q[1:]
		// 如果 v 不是某个模式串的末尾字母，则 v.idx = 0
		if v.idx > 0 {
			cnt[v.idx-1] = v.cnt
		}
		w := v.fail // 注意不能用 last，会漏掉中间打上的 cnt 标记
		w.cnt += v.cnt
		if deg[w]--; deg[w] == 0 {
			q = append(q, w)
		}
	}
	return cnt
}
```