# 树状数组

```go showLineNumbers
type BIT struct {
	n    int
	tree []int
}

func (b BIT) lowbit(x int) int { return x & (-x) }

func (b BIT) query(x int) int {
	ret := 0
	for x > 0 {
		ret += b.tree[x]
		x -= b.lowbit(x)
	}
	return ret
}

func (b BIT) update(x int) {
	for x <= b.n {
		b.tree[x]++
		x += b.lowbit(x)
	}
}
```

[区域和检索 - 数组可修改](https://leetcode.cn/problems/range-sum-query-mutable/solution/-by-hu-ge-8-t4rn/)
