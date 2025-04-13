# 树形DP/换根DP

**例题**

[834. 树中距离之和](https://leetcode.cn/problems/sum-of-distances-in-tree/description/)

```go showLineNumbers
func sumOfDistancesInTree(n int, edges [][]int) []int {
    g := make([][]int, n) // g[x] 表示 x 的所有邻居
    for _, e := range edges {
        x, y := e[0], e[1]
        g[x] = append(g[x], y)
        g[y] = append(g[y], x)
    }

    ans := make([]int, n)
    size := make([]int, n)
    var dfs func(int, int, int)
    dfs = func(x, fa, depth int) {
        ans[0] += depth // depth 为 0 到 x 的距离
        size[x] = 1
        for _, y := range g[x] { // 遍历 x 的邻居 y
            if y != fa { // 避免访问父节点
                dfs(y, x, depth+1) // x 是 y 的父节点
                size[x] += size[y] // 累加 x 的儿子 y 的子树大小
            }
        }
    }
    dfs(0, -1, 0) // 0 没有父节点

    var reroot func(int, int)
    reroot = func(x, fa int) {
        for _, y := range g[x] { // 遍历 x 的邻居 y
            if y != fa { // 避免访问父节点
                ans[y] = ans[x] + n - 2*size[y]
                reroot(y, x) // x 是 y 的父节点
            }
        }
    }
    reroot(0, -1) // 0 没有父节点
    return ans
}
```

[310. 最小高度树](https://leetcode.cn/problems/minimum-height-trees/description/)

```go showLineNumbers
func findMinHeightTrees(n int, edges [][]int) []int {
    g := make([][]int, n)
    for _, e := range edges {
        x, y := e[0], e[1]
        g[x] = append(g[x], y)
        g[y] = append(g[y], x)
    }
    d1 := make([]int, n)
    d2 := make([]int, n)
    up := make([]int, n)
    p := make([]int, n)
    for i := range p {
        p[i] = -1
    }
    var dfs1 func(cur, fa int) int
    dfs1 = func(cur, fa int) int {
        for _, ne := range g[cur] {
            if ne == fa {
                continue
            }
            h := dfs1(ne, cur) + 1
            if h > d1[cur] {
                d2[cur] = d1[cur]
                d1[cur] = h
                p[cur] = ne
            } else if h > d2[cur] {
                d2[cur] = h
            }
        }
        return d1[cur]
    }
    var dfs2 func(cur, fa int)
    dfs2 = func(cur, fa int) {
        for _, ne := range g[cur] {
            if ne == fa {
                continue
            }
            if p[cur] != ne {
                up[ne] = max(up[ne], d1[cur]+1)
            } else {
                up[ne] = max(up[ne], d2[cur]+1)
            }
            up[ne] = max(up[ne], up[cur]+1)
            dfs2(ne, cur)
        }
    }

    dfs1(0, -1)
    dfs2(0, -1)

    mi := math.MaxInt
    ans := []int{}
    for i := 0; i < n; i++ {
        if h := max(d1[i], up[i]); h < mi {
            mi = h
            ans = nil
            ans = append(ans, i)
        } else if h == mi {
            ans = append(ans, i)
        }
    }
    return ans
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```