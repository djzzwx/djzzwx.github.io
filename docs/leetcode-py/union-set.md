# 并查集

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