# AC 自动机

[最小代价构造字符串](https://leetcode.cn/problems/construct-string-with-minimum-cost/description/)

// 给定目标串 target
// 给定模式串 words
// 给定模式串使用花费 costs costs.length == words.length
// 求构造目标串最小花费
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