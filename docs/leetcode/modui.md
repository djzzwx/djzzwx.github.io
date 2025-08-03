# 莫队

[P1494 [国家集训队] 小 Z 的袜子](https://www.luogu.com.cn/problem/P1494)
```go showLineNumbers title="普通莫队"
package main

import (
    "bufio"
    . "fmt"
    "io"
    "math"
    "os"
    "sort"
)

func run(_r io.Reader, _w io.Writer) {
    in := bufio.NewReader(_r)
    out := bufio.NewWriter(_w)
    defer out.Flush()

    var n, m int
    Fscan(in, &n, &m)
    a := make([]int, n)
    for i := range a {
        Fscan(in, &a[i])
        a[i]--
    }
    blockSize := int(math.Round(math.Sqrt(float64(n))))
    qs := make([]struct{ b, l, r, i int }, m)
    for i := range qs {
        Fscan(in, &qs[i].l, &qs[i].r)
        qs[i].l--
        qs[i].i = i
        qs[i].b = qs[i].l / blockSize
    }
    sort.Slice(qs, func(i, j int) bool {
        if qs[i].b == qs[j].b {
            if qs[i].b&1 == 0 {
                return qs[i].r < qs[j].r
            }
            return qs[i].r > qs[j].r
        }
        return qs[i].b < qs[j].b
    })
    cnt := make([]int, n)
    var cur int
    del := func(x int) {
        cnt[x]--
        cur += -cnt[x]
    }
    add := func(x int) {
        cnt[x]++
        cur += cnt[x] - 1
    }
    ans := make([]struct{ a, b int }, m)
    var l, r int
    for _, q := range qs {
        if q.l == q.r-1 {
            ans[q.i] = struct{ a, b int }{a: 0, b: 1}
            continue
        }
        for ; r < q.r; r++ {
            add(a[r])
        }
        for ; l < q.l; l++ {
            del(a[l])
        }
        for l > q.l {
            l--
            add(a[l])
        }
        for r > q.r {
            r--
            del(a[r])
        }

        tot := (r - l) * (r - l - 1) >> 1
        g := gcd(cur, tot)
        ans[q.i] = struct{ a, b int }{a: cur / g, b: tot / g}
    }
    for _, v := range ans {
        Fprintf(out, "%d/%d\n", v.a, v.b)
    }
}

func main() { run(os.Stdin, os.Stdout) }

func gcd(a, b int) int {
    for a > 0 {
        a, b = b%a, a
    }
    return b
}
```


[3636. 查询超过阈值频率最高元素](https://leetcode.cn/problems/threshold-majority-queries/description/)
```go showLineNumbers title="回滚莫队"
func subarrayMajority(nums []int, queries [][]int) []int {
    n, m := len(nums), len(queries)

    cnt := map[int]int{}
    maxCnt, minVal := 0, 0
    // 添加元素 x
    add := func(x int) {
        cnt[x]++
        c := cnt[x]
        if c > maxCnt {
            maxCnt, minVal = c, x
        } else if c == maxCnt {
            minVal = min(minVal, x)
        }
    }

    ans := make([]int, m)
    blockSize := int(math.Ceil(float64(n) / math.Sqrt(float64(m))))
    type query struct{ bid, l, r, threshold, qid int } // [l,r) 左闭右开
    qs := []query{}
    for i, q := range queries {
        l, r, threshold := q[0], q[1]+1, q[2] // 左闭右开
        // 大区间离线（保证 l 和 r 不在同一个块中）
        if r-l > blockSize {
            qs = append(qs, query{l / blockSize, l, r, threshold, i})
            continue
        }
        // 小区间暴力
        for _, x := range nums[l:r] {
            add(x)
        }
        if maxCnt >= threshold {
            ans[i] = minVal
        } else {
            ans[i] = -1
        }
        // 重置数据
        clear(cnt)
        maxCnt = 0
    }
    slices.SortFunc(qs, func(a, b query) int {
        if a.bid != b.bid {
            return a.bid - b.bid
        }
        return a.r - b.r
    })

    var r int
    for i, q := range qs {
        l0 := (q.bid + 1) * blockSize
        if i == 0 || q.bid > qs[i-1].bid { // 遍历到一个新的块
            r = l0 // 右端点移动的起点
            // 重置数据
            clear(cnt)
            maxCnt = 0
        }

        // 右端点从 r 移动到 q.r（q.r 不计入）
        for ; r < q.r; r++ {
            add(nums[r])
        }

        // 左端点从 l0 移动到 q.l（l0 不计入）
        tmpMaxCnt, tmpMinVal := maxCnt, minVal
        for _, x := range nums[q.l:l0] {
            add(x)
        }
        if maxCnt >= q.threshold {
            ans[q.qid] = minVal
        } else {
            ans[q.qid] = -1
        }

        // 回滚
        maxCnt, minVal = tmpMaxCnt, tmpMinVal
        for _, x := range nums[q.l:l0] {
            cnt[x]--
        }
    }
    return ans
}
```