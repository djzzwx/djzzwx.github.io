# 并查集

```go showLineNumbers title="go"
type unionFind struct {
	p, size []int
}

func newUnionFind(n int) *unionFind {
	p := make([]int, n)
	size := make([]int, n)
	for i := range p {
		p[i] = i
		size[i] = 1
	}
	return &unionFind{p, size}
}

func (uf *unionFind) find(x int) int {
	if uf.p[x] != x {
		uf.p[x] = uf.find(uf.p[x])
	}
	return uf.p[x]
}

func (uf *unionFind) union(a, b int) bool {
	pa, pb := uf.find(a), uf.find(b)
	if pa == pb {
		return false
	}
	if uf.size[pa] > uf.size[pb] {
		uf.p[pb] = pa
		uf.size[pa] += uf.size[pb]
	} else {
		uf.p[pa] = pb
		uf.size[pb] += uf.size[pa]
	}
	return true
}

func (uf *unionFind) getSize(x int) int {
	return uf.size[uf.find(x)]
}
```

```python showLineNumbers title="python3"
class UnionFind:
    def __init__(self, n: int):
        self.parents = [i for i in range(n)]
        self.sizes = [1] * n

    def find(self, x: int) -> int:
        if self.parents[x] == x:
            return x
        else:
            self.parents[x] = self.find(self.parents[x])
            return self.parents[x]

    def union(self, x: int, y: int):
        rx = self.find(x)
        ry = self.find(y)
        if rx != ry:
            if self.sizes[rx] > self.sizes[ry]:
                self.parents[ry] = rx
                self.sizes[rx] += self.sizes[ry]
            else:
                self.parents[rx] = ry
                self.sizes[ry] += self.sizes[rx]

    def getSize(self, x: int) -> int:
        return self.sizes[x]
```