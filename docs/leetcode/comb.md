# 组合数

```go showLineNumbers title="求组合数"
const mod = 1000000007

func comb(n, k int) int {
	res := n
	for i := 2; i <= k; i++ {
		res = res * (n - i + 1) / i
	}
	return res % mod
}
```

```go showLineNumbers title="预处理组合数"
h, v := d[1], d[0]
comb := make([][]int, h + v)
for i := range comb {
    comb[i] = make([]int, h)
}
comb[0][0] = 1
for i := 1; i < h + v; i++ {
    comb[i][0] = 1
    for j := 1; j < h && j <= i; j++ {
        comb[i][j] = comb[i-1][j-1] + comb[i-1][j]
    }
}
```