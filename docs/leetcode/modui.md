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