# 并查集

```go showLineNumbers
fa := make([]int, n*n)

for i := range fa {
	fa[i] = i
}

var find func(int) int
find = func(x int) int {
	if fa[x] != x {
		fa[x] = find(fa[x])
	}
	return fa[x]
}
```