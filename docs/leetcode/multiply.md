# 树上倍增

### 倍增模版
```go showLineNumbers
# n 为节点
# parent 为节点对应父节点，其中 parent[i] 是节点 i 的父节点。树的根节点是编号为 0 的节点。

func getPa(n int, parent []int) [][]int {
    m := bits.Len(uint(n))
	pa := make([][]int, n)
	for i, p := range parent {
		pa[i] = make([]int, m)
		pa[i][0] = p
	}
	for i := 0; i < m-1; i++ {
		for j := 0; j < n; j++ {
			if t := pa[j][i]; t != -1 {
				pa[j][i+1] = pa[t][i]
			} else {
				pa[j][i+1] = -1
			}
		}
	}
	return pa
}
```

### example1
[1483. 树节点的第 K 个祖先](https://leetcode.cn/problems/kth-ancestor-of-a-tree-node/description/)
```go showLineNumbers
type TreeAncestor struct {
	pa [][]int
	m int
}

func Constructor(n int, parent []int) TreeAncestor {
	m := bits.Len(uint(n))
	pa := make([][]int, n)
	for i, p := range parent {
		pa[i] = make([]int, m)
		pa[i][0] = p
	}
	for i := 0; i < m-1; i++ {
		for j := 0; j < n; j++ {
			if t := pa[j][i]; t != -1 {
				pa[j][i+1] = pa[t][i]
			} else {
				pa[j][i+1] = -1
			}
		}
	}
	return TreeAncestor{pa: pa, m: m}
}

func (this *TreeAncestor) GetKthAncestor(node int, k int) int {
	a := node
	for i := 0; i < this.m; i++ {
		if k >> i & 1 == 1 {
			if a = this.pa[a][i]; a == -1 {
				return a
			}
		}
	}
	return a
}
```

### example2
[2836. 在传球游戏中最大化函数值](https://leetcode.cn/problems/maximize-value-of-function-in-a-ball-passing-game/description/)
```go showLineNumbers
func getMaxFunctionValue(receiver []int, k int64) int64 {
	type pair struct{ pa, sum int }
	n := len(receiver)
	m := bits.Len(uint(k))
	pa := make([][]pair, n)
	for i, p := range receiver {
		pa[i] = make([]pair, m)
		pa[i][0] = pair{p, p}
	}
	for i := 0; i < m-1; i++ {
		for j := 0; j < n; j++ {
			p := pa[j][i]
			p2 := pa[p.pa][i]
			pa[j][i+1] = pair{p2.pa, p.sum + p2.sum}
		}
	}
	ans := int64(0)
	for node := range pa {
		cn := node
		cur := int64(cn)
		for i := 0; i < m; i++ {
			if k>>i&1 == 1 {
				cur += int64(pa[cn][i].sum)
				cn = pa[cn][i].pa
			}
		}
		if cur > ans {
			ans = cur
		}
	}
	return ans
}
```