# 树状数组

```go showLineNumbers
type Fenwick []int

func newFenwick(n int) Fenwick {
	return make(Fenwick, n) // n+1
}

// 1<=i<=n
func (f Fenwick) update(i, val int) {
	for ; i < len(f); i += i & -i {
		f[i] += val
	}
}

// 1<=i<=n
func (f Fenwick) query(i int) (res int) {
	for ; i > 0; i &= i - 1 {
		res += f[i]
	}
	return res
}

// 1<=l<=r<=n
func (f Fenwick) sumRange(l, r int) int {
	return f.query(r) - f.query(l-1)
}
```
