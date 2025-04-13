# 线段树

```go showLineNumbers title="无区间更新"
// 线段树有两个下标，一个是线段树节点的下标，另一个是线段树维护的区间的下标
// 节点的下标：从 1 开始，如果你想改成从 0 开始，需要把左右儿子下标分别改成 node*2+1 和 node*2+2
// 区间的下标：从 0 开始
type seg []struct {
    val int // **根据题目修改**
}

// 合并两个 val
func (seg) mergeVal(a, b int) int {
    return max(a, b) // **根据题目修改**
}

// 线段树维护一个长为 n 的数组（下标从 0 到 n-1），元素初始值为 initVal
func newSegmentTree(n int, initVal int) seg {
    a := make([]int, n)
    for i := range a {
        a[i] = initVal
    }
    return newSegmentTreeWithArray(a)
}

// 线段树维护数组 a
func newSegmentTreeWithArray(a []int) seg {
    n := len(a)
    t := make(seg, 2<<bits.Len(uint(n-1)))
    t.build(a, 1, 0, n-1)
    return t
}

// 合并左右儿子的 val 到当前节点的 val
func (t seg) maintain(node int) {
    t[node].val = t.mergeVal(t[node*2].val, t[node*2+1].val)
}

// 用 a 初始化线段树
// 时间复杂度 O(n)
func (t seg) build(a []int, node, l, r int) {
    if l == r { // 叶子
        t[node].val = a[l] // 初始化叶节点的值
        return
    }
    m := (l + r) / 2
    t.build(a, node*2, l, m) // 初始化左子树
    t.build(a, node*2+1, m+1, r) // 初始化右子树
    t.maintain(node)
}

// 更新 a[i] 为 mergeVal(a[i], val)
// 调用 t.update(1, 0, n-1, i, val)
// 0 <= i <= n-1
// 时间复杂度 O(log n)
func (t seg) update(node, l, r, i int, val int) {
    if l == r { // 叶子（到达目标）
        // 如果想直接替换的话，可以写 t[o].val = val
        t[node].val = t.mergeVal(t[node].val, val)
        return
    }
    m := (l + r) / 2
    if i <= m { // i 在左子树
        t.update(node*2, l, m, i, val)
    } else { // i 在右子树
        t.update(node*2+1, m+1, r, i, val)
    }
    t.maintain(node)
}

// 返回用 mergeVal 合并所有 a[i] 的计算结果，其中 i 在闭区间 [ql, qr] 中
// 调用 t.query(1, 0, n-1, ql, qr)
// 如果只想获取 a[i]，可以调用 t.query(1, 0, n-1, i, i)
// 0 <= ql <= qr <= n-1
// 时间复杂度 O(log n)
func (t seg) query(node, l, r, ql, qr int) int {
    if ql <= l && r <= qr { // 当前子树完全在 [ql, qr] 内
        return t[node].val
    }
    m := (l + r) / 2
    if qr <= m { // [ql, qr] 在左子树
        return t.query(node*2, l, m, ql, qr)
    }
    if ql > m { // [ql, qr] 在右子树
        return t.query(node*2+1, m+1, r, ql, qr)
    }
    lRes := t.query(node*2, l, m, ql, qr)
    rRes := t.query(node*2+1, m+1, r, ql, qr)
    return t.mergeVal(lRes, rRes)
}
```

```go showLineNumbers title="有区间更新"
// 懒标记初始值
const todoInit int = 0 // **根据题目修改**

type lazySeg []struct {
    val  int // **根据题目修改**
    todo int
}

// 合并两个 val
func (lazySeg) mergeVal(a, b int) int {
    return a + b // **根据题目修改**
}

// 合并两个懒标记
func (lazySeg) mergeTodo(a, b int) int {
    return a + b // **根据题目修改**
}

// 把懒标记作用到 node 子树（本例为区间加）
func (t lazySeg) apply(node, l, r int, todo int) {
    cur := &t[node]
    // 计算 tree[node] 区间的整体变化
    cur.val += todo * (r - l + 1) // **根据题目修改**
    cur.todo = t.mergeTodo(todo, cur.todo)
}

// 线段树维护一个长为 n 的数组（下标从 0 到 n-1），元素初始值为 initVal
func newLazySegmentTree(n int, initVal int) lazySeg {
    a := make([]int, n)
    for i := range a {
        a[i] = initVal
    }
    return newLazySegmentTreeWithArray(a)
}

// 线段树维护数组 a
func newLazySegmentTreeWithArray(a []int) lazySeg {
    n := len(a)
    t := make(lazySeg, 2<<bits.Len(uint(n-1)))
    t.build(a, 1, 0, n-1)
    return t
}

// 把当前节点的懒标记下传给左右儿子
func (t lazySeg) spread(node, l, r int) {
    // 类似「断点续传」，接着完成之前没完成的下传任务
    todo := t[node].todo
    if todo == todoInit { // 没有需要下传的信息
        return
    }
    m := (l + r) / 2
    t.apply(node*2, l, m, todo)
    t.apply(node*2+1, m+1, r, todo)
    t[node].todo = todoInit // 下传完毕
}

// 合并左右儿子的 val 到当前节点的 val
func (t lazySeg) maintain(node int) {
    t[node].val = t.mergeVal(t[node*2].val, t[node*2+1].val)
}

// 用 a 初始化线段树
// 时间复杂度 O(n)
func (t lazySeg) build(a []int, node, l, r int) {
    t[node].todo = todoInit
    if l == r { // 叶子
        t[node].val = a[l] // 初始化叶节点的值
        return
    }
    m := (l + r) / 2
    t.build(a, node*2, l, m) // 初始化左子树
    t.build(a, node*2+1, m+1, r) // 初始化右子树
    t.maintain(node)
}

// 用 f 更新 [ql, qr] 中的每个 a[i]
// 调用 t.update(1, 0, n-1, ql, qr, f)
// 0 <= ql <= qr <= n-1
// 时间复杂度 O(log n)
func (t lazySeg) update(node, l, r, ql, qr int, f int) {
    if ql <= l && r <= qr { // 当前子树完全在 [ql, qr] 内
        t.apply(node, l, r, f)
        return
    }
    t.spread(node, l, r)
    m := (l + r) / 2
    if ql <= m { // 更新左子树
        t.update(node*2, l, m, ql, qr, f)
    }
    if qr > m { // 更新右子树
        t.update(node*2+1, m+1, r, ql, qr, f)
    }
    t.maintain(node)
}

// 返回用 mergeVal 合并所有 a[i] 的计算结果，其中 i 在闭区间 [ql, qr] 中
// 调用 t.query(1, 0, n-1, ql, qr)
// 0 <= ql <= qr <= n-1
// 时间复杂度 O(log n)
func (t lazySeg) query(node, l, r, ql, qr int) int {
    if ql <= l && r <= qr { // 当前子树完全在 [ql, qr] 内
        return t[node].val
    }
    t.spread(node, l, r)
    m := (l + r) / 2
    if qr <= m { // [ql, qr] 在左子树
        return t.query(node*2, l, m, ql, qr)
    }
    if ql > m { // [ql, qr] 在右子树
        return t.query(node*2+1, m+1, r, ql, qr)
    }
    lRes := t.query(node*2, l, m, ql, qr)
    rRes := t.query(node*2+1, m+1, r, ql, qr)
    return t.mergeVal(lRes, rRes)
}
```

```go showLineNumbers
// 动态开点

type lazyNode struct {
    lo, ro *lazyNode
    l, r   int
    sum    int
    todo   int
}

func (o *lazyNode) get() int {
    if o != nil {
        return o.sum
    }
    return 0 // inf
}

func (lazyNode) op(a, b int) int {
    return a + b //
}

func (o *lazyNode) maintain() {
    o.sum = o.op(o.lo.get(), o.ro.get())
}

func (o *lazyNode) build(a []int, l, r int) {
    o.l, o.r = l, r
    if l == r {
        o.sum = a[l-1]
        return
    }
    m := (l + r) >> 1
    o.lo = &lazyNode{}
    o.lo.build(a, l, m)
    o.ro = &lazyNode{}
    o.ro.build(a, m+1, r)
    o.maintain()
}

func (o *lazyNode) do(add int) {
    o.todo += add                   // % mod
    o.sum += int(o.r-o.l+1) * add // % mod
}

func (o *lazyNode) spread() {
    m := (o.l + o.r) >> 1
    if o.lo == nil {
        o.lo = &lazyNode{l: o.l, r: m}
    }
    if o.ro == nil {
        o.ro = &lazyNode{l: m + 1, r: o.r}
    }
    if add := o.todo; add != 0 {
        o.lo.do(add)
        o.ro.do(add)
        o.todo = 0 // -1
    }
}

func (o *lazyNode) update(l, r int, add int) {
    if l <= o.l && o.r <= r {
        o.do(add)
        return
    }
    o.spread()
    m := (o.l + o.r) >> 1
    if l <= m {
        o.lo.update(l, r, add)
    }
    if m < r {
        o.ro.update(l, r, add)
    }
    o.maintain()
}

func (o *lazyNode) query(l, r int) int {
    // 对于不在线段树中的点，应按照题意来返回
    if o == nil || l > o.r || r < o.l {
        return 0 // inf
    }
    if l <= o.l && o.r <= r {
        return o.sum
    }
    o.spread()
    return o.op(o.lo.query(l, r), o.ro.query(l, r))
}
```

[P1531 I Hate It](https://www.luogu.com.cn/problem/P1531)

```go showLineNumbers
package main

import (
    "bufio"
    . "fmt"
    "io"
    "os"
)

func run(_r io.Reader, out io.Writer) {
    in := bufio.NewReader(_r)
    var n, m int
    Fscan(in, &n)
    Fscan(in, &m)
    nums := make([]int, n+1)
    for i := 0; i < n; i++ {
        Fscan(in, &nums[i+1])
    }
    N := n<<2 + 5
    t := make(SegTree, N)
    t.build(nums, 1, 1, n)
    var a string
    var b, c int
    for i := m; i > 0; i-- {
        Fscan(in, &a)
        Fscan(in, &b)
        Fscan(in, &c)
        if a == "Q" {
            Fprintln(out, t.query(1, b, c))
        } else {
            t.update(1, b, b, c)
        }
    }
}

func main() { run(os.Stdin, os.Stdout) }

type SegTree []struct {
    l, r, v int
}

func (st SegTree) build(nums []int, i, l, r int) {
    st[i].l = l
    st[i].r = r
    if l == r {
        st[i].v = nums[l]
        return
    }
    m := l + (r-l)>>1
    st.build(nums, i<<1, l, m)
    st.build(nums, i<<1|1, m+1, r)
    st.maintain(i)
}

func (st SegTree) maintain(i int) {
    st[i].v = max(st[i<<1].v, st[i<<1|1].v)
}

func (st SegTree) update(i, l, r, v int) {
    if st[i].l == l && st[i].r == r {
        st[i].v = max(st[i].v, v)
        return
    }
    m := st[i].l + (st[i].r-st[i].l)>>1
    if l <= m {
        st.update(i<<1, l, r, v)
    } else if r > m {
        st.update(i<<1|1, l, r, v)
    } else {
        st.update(i<<1, l, r, v)
        st.update(i<<1|1, l, r, v)
    }
    st.maintain(i)
}

func (st SegTree) query(i, l, r int) int {
    if l <= st[i].l && st[i].r <= r {
        return st[i].v
    }
    m := st[i].l + (st[i].r-st[i].l)>>1
    ans := 0
    if l <= m {
        ans = max(ans, st.query(i<<1, l, r))
    }
    if r > m {
        ans = max(ans, st.query(i<<1|1, l, r))
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

[P2003 [CRCI2007-2008] PLATFORME 平板](https://www.luogu.com.cn/problem/P2003)

```go showLineNumbers
package main

import (
    "fmt"
    "sort"
)

func main() {
    var n int
    fmt.Scanln(&n)
    flats := make([][]int, n)
    mr := 0
    for i := 0; i < n; i++ {
        flats[i] = make([]int, 3)
        fmt.Scanln(&flats[i][0], &flats[i][1], &flats[i][2])
        mr = max(mr, flats[i][2])
    }

    sort.Slice(flats, func(i, j int) bool {
        return flats[i][0] < flats[j][0]
    })
    ans := 0
    t := make(SegTree, mr<<2)
    t.build(1, 1, mr)
    for _, f := range flats {
        h, l, r := f[0], f[1], f[2]
        ans += h - t.query(1, l, l+1)
        ans += h - t.query(1, r-1, r)
        t.insert(1, l+1, r-1, h)
    }
    fmt.Println(ans)
}

type SegTree []struct {
    l, r, v, tag int
}

func (t SegTree) build(i, s, e int) {
    t[i].l = s
    t[i].r = e
    if s == e {
        return
    }
    m := (s + e) >> 1
    t.build(i<<1, s, m)
    t.build(i<<1|1, m+1, e)
}

func (t SegTree) insert(i, s, e, h int) {
    l, r := t[i].l, t[i].r
    if l == s && e == r {
        t[i].v = max(t[i].v, h)
        t[i].tag = h
        return
    }
    if t[i].tag > 0 {
        t.pushdown(i)
    }
    m := (l + r) >> 1
    if e <= m {
        t.insert(i<<1, s, e, h)
    } else if s > m {
        t.insert(i<<1|1, s, e, h)
    } else {
        t.insert(i<<1, s, m, h)
        t.insert(i<<1|1, m+1, e, h)
    }
    t[i].v = max(t[i<<1].v, t[i<<1|1].v)
}

func (t SegTree) query(i, s, e int) int {
    l, r := t[i].l, t[i].r
    if l == s && e == r {
        return t[i].v
    }
    if t[i].tag > 0 {
        t.pushdown(i)
    }
    m := (l + r) >> 1
    if e <= m {
        return t.query(i<<1, s, e)
    } else if s > m {
        return t.query(i<<1|1, s, e)
    } else {
        return max(t.query(i<<1, s, m), t.query(i<<1|1, m+1, e))
    }
}

func (t SegTree) pushdown(i int) {
    t[i<<1].v = max(t[i<<1].v, t[i].tag)
    t[i<<1|1].v = max(t[i<<1|1].v, t[i].tag)
    t[i<<1].tag = max(t[i<<1].tag, t[i].tag)
    t[i<<1|1].tag = max(t[i<<1|1].tag, t[i].tag)
    t[i].tag = 0
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```
