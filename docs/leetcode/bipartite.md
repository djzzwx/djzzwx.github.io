# 二分图

```go showLineNumbers
func isBipartite(graph [][]int) bool {
    colors := make([]int8, len(graph))

    var dfs func(int, int8) bool
    dfs = func(x int, c int8) bool {
        colors[x] = c
        for _, y := range graph[x] {
            if colors[y] == c ||
                colors[y] == 0 && !dfs(y, -c) {
                return false
            }
        }
        return true
    }

    for i, c := range colors {
        if c == 0 && !dfs(i, 1) {
            return false
        }
    }
    return true
}
```
