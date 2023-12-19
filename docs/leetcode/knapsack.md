# 背包

### 01背包
```go
zeroOneKnapsack := func(values, weights []int, maxW int) int {
    dp := make([]int, maxW+1)
    for i, w := range weights {
        v := values[i]
        // 这里 j 的初始值可以优化成前 i 个物品的重量之和（但不能超过 maxW）
        for j := maxW; j >= w; j-- {
            dp[j] = max(dp[j], dp[j-w]+v)
        }
    }
    return dp[maxW]
}

// 0-1 背包 EXTRA: 恰好装满
zeroOneKnapsackExactlyFull := func(values, weights []int, maxW int) {
    dp := make([]int, maxW+1)
    for i := range dp {
        dp[i] = -1e9 // -1e18
    }
    dp[0] = 0
    for i, w := range weights {
        v := values[i]
        for j := maxW; j >= w; j-- {
            dp[j] = max(dp[j], dp[j-w]+v)
        }
    }
    for i := maxW; i >= 0; i-- {
        if dp[i] >= 0 { 
            // 能恰好装满 i，此时背包物品价值和的最大值是 dp[i]
            // ...
        }
    }
}
```

### 完全背包

```go
// 完全背包 EXTRA: 方案数
unboundedWaysToSum := func(a []int, sum int) int {
    dp := make([]int, sum+1)
    dp[0] = 1
    for _, v := range a {
        for s := v; s <= sum; s++ {
            dp[s] += dp[s-v] // % mod
        }
    }
    return dp[sum]
}
```

### 多重背包

```go
// 多重背包 - 未优化    Bounded Knapsack
boundedKnapsack := func(stocks, values, weights []int, maxW int) int {
    n := len(stocks)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, maxW+1)
    }
    for i, num := range stocks {
        v, w := values[i], weights[i]
        for j := range dp[i] {
            for k := 0; k <= num && k*w <= j; k++ {
                dp[i+1][j] = max(dp[i+1][j], dp[i][j-k*w]+k*v)
            }
        }
    }
    return dp[n][maxW]
}

// 多重背包 - 优化 1 - 二进制优化
boundedKnapsackBinary := func(stocks, values, weights []int, maxW int) int {
    dp := make([]int, maxW+1)
    for i, num := range stocks {
        v, w := values[i], weights[i]
        for k1 := 1; num > 0; k1 <<= 1 {
            k := min(k1, num)
            for j := maxW; j >= k*w; j-- {
                dp[j] = max(dp[j], dp[j-k*w]+k*v)
            }
            num -= k
        }
    }
    return dp[maxW]
}

// 多重背包 - 优化 2 - 单调队列优化
boundedKnapsackMonotoneQueue := func(stocks, values, weights []int, maxW int) int {
    dp := make([]int, maxW+1)
    for i, num := range stocks {
        v, w := values[i], weights[i]
        for r := 0; r < w; r++ { // 按照 j%w 的结果，分组转移，r 表示 remainder
            type pair struct{ x, j int }
            q := []pair{}
            // 为什么压缩维度了还可以正着枚举？因为转移来源都存到单调队列里面了，正序倒序都可以
            // 并且这样相比倒着枚举，不需要先往队列里面塞 num 个数据，更加简洁
            for j := 0; j*w+r <= maxW; j++ {
                x := dp[j*w+r] - j*v
                for len(q) > 0 && q[len(q)-1].x <= x {
                    q = q[:len(q)-1]
                }
                q = append(q, pair{x, j})
                // 本质是查表法，q[0].val 就表示 dp[(j-1)*w+r]-(j-1)*v, dp[(j-2)*w+r]-(j-2)*v, …… 这些转移来源的最大值
                dp[j*w+r] = q[0].x + j*v // 把物品个数视作两个 j 的差（前缀和思想）
                if j-q[0].j == num {     // 至多选 num 个物品
                    q = q[1:]
                }
            }
        }
    }
    return dp[maxW]
}

// 多重背包 - 求方案数
boundedKnapsackWays := func(a []int) []int {
    const mod = 1_000_000_007
    total := 0
    cnt := map[int]int{}
    for _, x := range a {
        total += x
        cnt[x]++
    }

    f := make([]int, total+1)
    f[0] = cnt[0] + 1
    delete(cnt, 0)

    maxJ := 0
    for x, c := range cnt {
        maxJ += x * c
        for j := x; j <= maxJ; j++ {
            f[j] = (f[j] + f[j-x]) % mod // 同余前缀和
        }
        for j := maxJ; j >= x*(c+1); j-- {
            f[j] = (f[j] - f[j-x*(c+1)] + mod) % mod
        }
    }
    return f
}
```