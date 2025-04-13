# 后缀数组

[最小代价构造字符串](https://leetcode.cn/problems/construct-string-with-minimum-cost/description/)
```go showLineNumbers title='核心为golang自带的suffixarray'
func minimumCost(target string, words []string, costs []int) int {
    minCost := map[string]uint16{}
    for i, w := range words {
        c := costs[i]
        if minCost[w] == 0 {
            minCost[w] = uint16(c)
        } else {
            minCost[w] = min(minCost[w], uint16(c))
        }
    }

    n := len(target)
    type pair struct{ l, cost uint16 }
    from := make([][]pair, n+1)
    sa := suffixarray.New([]byte(target))
    for w, c := range minCost {
        for _, l := range sa.Lookup([]byte(w), -1) {
            r := l + len(w)
            from[r] = append(from[r], pair{uint16(l), c})
        }
    }
    const inf int = math.MaxInt / 2
    dp := make([]int, n+1)
    for i := 1; i <= n; i++ {
        dp[i] = inf
        for _, p := range from[i] {
            dp[i] = min(dp[i], dp[p.l]+int(p.cost))
        }
    }
    if dp[n] == inf {
        return -1
    }
    return dp[n]
}
```
