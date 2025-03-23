# 树状数组

```go showLineNumbers
type fenwick []int

func newFenwickTree(n int) fenwick {
    return make(fenwick, n+1) // 使用下标 1 到 n
}

// a[i] 增加 val
// 1 <= i <= n
// 时间复杂度 O(log n)
func (f fenwick) update(i int, val int) {
    for ; i < len(f); i += i & -i {
        f[i] += val
    }
}

// 求前缀和 a[1] + ... + a[i]
// 1 <= i <= n
// 时间复杂度 O(log n)
func (f fenwick) pre(i int) (res int) {
    for ; i > 0; i &= i - 1 {
        res += f[i]
    }
    return
}

// 求区间和 a[l] + ... + a[r]
// 1 <= l <= r <= n
// 时间复杂度 O(log n)
func (f fenwick) query(l, r int) int {
    if r < l {
        return 0
    }
    return f.pre(r) - f.pre(l-1)
}
```
