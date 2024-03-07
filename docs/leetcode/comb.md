# 组合数

```go showLineNumbers
const mod = 1000000007

func comb(n, k int) int {
	res := n
	for i := 2; i <= k; i++ {
		res = res * (n - i + 1) / i
	}
	return res % mod
}
```