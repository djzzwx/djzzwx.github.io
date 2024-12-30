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

```go showLineNumbers title="线性法"
const mod = 1_000_000_007
const mx = 100_000

var F, invF [mx]int

func init() {
	F[0] = 1
	for i := 1; i < mx; i++ {
		F[i] = F[i-1] * i % mod
	}
	invF[mx-1] = pow(F[mx-1], mod-2)
	for i := mx - 1; i > 0; i-- {
		invF[i-1] = invF[i] * i % mod
	}
}

func pow(x, n int) int {
	res := 1
	for ; n > 0; n /= 2 {
		if n%2 > 0 {
			res = res * x % mod
		}
		x = x * x % mod
	}
	return res
}

func comb(n, m int) int {
	return F[n] * invF[m] % mod * invF[n-m] % mod
}
```

```go showLineNumbers title="一种避免不小心把数组开小的写法（无需思考要开多大的数组）"
type comb struct{ _f, _invF []int }

func newComb() *comb {
	return &comb{[]int{1}, []int{1}}
}

func (c *comb) _grow(mx int) {
	n := len(c._f)
	c._f = slices.Grow(c._f, mx+1)[:mx+1]
	for i := n; i <= mx; i++ {
		c._f[i] = c._f[i-1] * i % mod
	}
	c._invF = slices.Grow(c._invF, mx+1)[:mx+1]
	c._invF[mx] = pow(c._f[mx], mod-2)
	for i := mx; i > n; i-- {
		c._invF[i-1] = c._invF[i] * i % mod
	}
}

func (c *comb) f(n int) int {
	if n >= len(c._f) {
		c._grow(n * 2)
	}
	return c._f[n]
}

func (c *comb) invF(n int) int {
	if n >= len(c._f) {
		c._grow(n * 2)
	}
	return c._invF[n]
}

func (c *comb) c(n, k int) int {
	if k < 0 || k > n {
		return 0
	}
	return c.f(n) * c.invF(k) % mod * c.invF(n-k) % mod
}

func (c *comb) p(n, k int) int {
	if k < 0 || k > n {
		return 0
	}
	return c.f(n) * c.invF(n-k) % mod
}
```