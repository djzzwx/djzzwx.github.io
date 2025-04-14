# 数位DP

```go showLineNumbers title="v1.0"
func countSpecialNumbers(n int) (ans int) {
    s := strconv.Itoa(n)
    m := len(s)
    memo := make([][1 << 10]int, m)
    for i := range memo {
        for j := range memo[i] {
            memo[i][j] = -1 // -1 表示没有计算过
        }
    }
    var f func(int, int, bool, bool) int
    f = func(i, mask int, isLimit, isNum bool) (res int) {
        if i == m {
            if isNum {
                return 1 // 得到了一个合法数字
            }
            return
        }
        if !isLimit && isNum {
            p := &memo[i][mask]
            if *p >= 0 {
                return *p
            }
            defer func() { *p = res }()
        }
        if !isNum { // 可以跳过当前数位
            res += f(i+1, mask, false, false)
        }
        d := 0
        if !isNum {
            d = 1 // 如果前面没有填数字，必须从 1 开始（因为不能有前导零）
        }
        up := 9
        if isLimit {
            up = int(s[i] - '0') // 如果前面填的数字都和 n 的一样，那么这一位至多填数字 s[i]（否则就超过 n 啦）
        }
        for ; d <= up; d++ { // 枚举要填入的数字 d
            if mask>>d&1 == 0 { // d 不在 mask 中
                res += f(i+1, mask|1<<d, isLimit && d == up, true)
            }
        }
        return
    }
    return f(0, 0, true, false)
}
```


```go showLineNumbers title="v2.0"
func countNumbers(l string, r string, b int) int {
	trans := func(s string) string {
		v := &big.Int{}
		fmt.Fscan(strings.NewReader(s), v)
		return v.Text(b)
	}

	const mod int = 1e9 + 7

	l = trans(l)
	r = trans(r)

	n := len(r)

	l = strings.Repeat("0", n-len(l)) + l
	b--

	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, 10)
		for j := range dp[i] {
			dp[i][j] = -1
		}
	}

	var dfs func(int, int, bool, bool) int
	dfs = func(i int, p int, b1 bool, b2 bool) (res int) {
		if i == n {
			return 1
		}
		if !b1 && !b2 {
			v := &dp[i][p]
			if *v >= 0 {
				return *v
			}
			defer func() { *v = res }()
		}
		lo := 0
		if b1 {
			lo = int(l[i] - '0')
		}
		hi := b
		if b2 {
			hi = int(r[i] - '0')
		}
		for j := max(lo, p); j <= hi; j++ {
			res += dfs(i+1, j, b1 && j == lo, b2 && j == hi)
		}
		res %= mod
		return
	}
	return dfs(0, 0, true, true)
}
```
