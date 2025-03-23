# 并查集

```go showLineNumbers title="go"
type unionFind struct {
    fa []int // 代表元
    sz []int // 集合大小
    cc int   // 连通块个数
}

func newUnionFind(n int) unionFind {
    fa := make([]int, n)
    sz := make([]int, n)
    // 一开始有 n 个集合 {0}, {1}, ..., {n-1}
    // 集合 i 的代表元是自己，大小为 1
    for i := range fa {
        fa[i] = i
        sz[i] = 1
    }
    return unionFind{fa, sz, n}
}

// 返回 x 所在集合的代表元
// 同时做路径压缩，也就是把 x 所在集合中的所有元素的 fa 都改成代表元
func (u unionFind) find(x int) int {
    // 如果 fa[x] == x，则表示 x 是代表元
    if u.fa[x] != x {
        u.fa[x] = u.find(u.fa[x]) // fa 改成代表元
    }
    return u.fa[x]
}

// 判断 x 和 y 是否在同一个集合
func (u unionFind) same(x, y int) bool {
    // 如果 x 的代表元和 y 的代表元相同，那么 x 和 y 就在同一个集合
    // 这就是代表元的作用：用来快速判断两个元素是否在同一个集合
    return u.find(x) == u.find(y)
}

// 把 from 所在集合合并到 to 所在集合中
// 返回是否合并成功
func (u *unionFind) merge(from, to int) bool {
    x, y := u.find(from), u.find(to)
    if x == y { // from 和 to 在同一个集合，不做合并
        return false
    }
    u.fa[x] = y // 合并集合。修改后就可以认为 from 和 to 在同一个集合了
    u.sz[y] += u.sz[x] // 更新集合大小（注意集合大小保存在代表元上）
    // 无需更新 sz[x]，因为我们不用 sz[x] 而是用 sz[find(x)] 获取集合大小，但 find(x) == y，我们不会再访问 sz[x]
    u.cc-- // 成功合并，连通块个数减一
    return true
}

// 返回 x 所在集合的大小
func (u unionFind) size(x int) int { 
    return u.sz[u.find(x)] // 集合大小保存在代表元上
}
```
