# Floyd 

[模板题：阈值距离内邻居最少的城市](https://leetcode.cn/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/description/)
```go showLineNumbers title='求左右侧第一个 <= 当前值的位置'
func findTheCity(n int, edges [][]int, distanceThreshold int) (ans int) {
    w := make([][]int, n)
    for i := range w {
        w[i] = make([]int, n)
        for j := range w[i] {
            w[i][j] = math.MaxInt / 2 // 防止加法溢出
        }
    }
    for _, e := range edges {
        x, y, wt := e[0], e[1], e[2]
        w[x][y], w[y][x] = wt, wt
    }

    f := w
    for k := 0; k < n; k++ {
        for i := 0; i < n; i++ {
            for j := 0; j < n; j++ {
                f[i][j] = min(f[i][j], f[i][k]+f[k][j])
            }
        }
    }

    minCnt := n
    for i, dis := range f {
        cnt := 0
        for j, d := range dis {
            if j != i && d <= distanceThreshold {
                cnt++
            }
        }
        if cnt <= minCnt { // 相等时取最大的 i
            minCnt = cnt
            ans = i
        }
    }
    return ans
}
```
