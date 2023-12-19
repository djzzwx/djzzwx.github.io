# 线段树

```go showLineNumbers
type lazySeg []struct {
	l, r int
	todo int
	sum  int
}

func (lazySeg) op(a, b int) int {
	return a + b // % mod
}

func (t lazySeg) maintain(o int) {
	lo, ro := t[o<<1], t[o<<1|1]
	t[o].sum = t.op(lo.sum, ro.sum)
}

func (t lazySeg) build(a []int, o, l, r int) {
	t[o].l, t[o].r = l, r
	if l == r {
		t[o].sum = a[l-1]
		return
	}
	m := (l + r) >> 1
	t.build(a, o<<1, l, m)
	t.build(a, o<<1|1, m+1, r)
	t.maintain(o)
}

func (t lazySeg) do(o int, add int) {
	to := &t[o]
	to.todo += add                     // % mod
	to.sum += int(to.r-to.l+1) * add // % mod
}

func (t lazySeg) spread(o int) {
	if add := t[o].todo; add != 0 {
		t.do(o<<1, add)
		t.do(o<<1|1, add)
		t[o].todo = 0
	}
}

// 如果维护的数据（或者判断条件）具有单调性，我们就可以在线段树上二分
// 下面代码返回 [l,r] 内第一个值不低于 val 的下标（未找到时返回 n+1）
// o=1  [l,r] 1<=l<=r<=n
// https://codeforces.com/problemset/problem/1179/C
func (t lazySeg) lowerBound(o, l, r int, val int) int {
	if t[o].l == t[o].r {
		if t[o].sum >= val {
			return t[o].l
		}
		return t[o].l + 1
	}
	t.spread(o)
	// 注意判断比较的对象是当前节点还是子节点，是先递归左子树还是右子树
	if t[o<<1].sum >= val {
		return t.lowerBound(o<<1, l, r, val)
	}
	return t.lowerBound(o<<1|1, l, r, val)
}

// o=1  [l,r] 1<=l<=r<=n
func (t lazySeg) update(o, l, r int, add int) {
	if l <= t[o].l && t[o].r <= r {
		t.do(o, add)
		return
	}
	t.spread(o)
	m := (t[o].l + t[o].r) >> 1
	if l <= m {
		t.update(o<<1, l, r, add)
	}
	if m < r {
		t.update(o<<1|1, l, r, add)
	}
	t.maintain(o)
}

// o=1  [l,r] 1<=l<=r<=n
func (t lazySeg) query(o, l, r int) int {
	if l <= t[o].l && t[o].r <= r {
		return t[o].sum
	}
	t.spread(o)
	m := (t[o].l + t[o].r) >> 1
	if r <= m {
		return t.query(o<<1, l, r)
	}
	if m < l {
		return t.query(o<<1|1, l, r)
	}
	vl := t.query(o<<1, l, r)
	vr := t.query(o<<1|1, l, r)
	return t.op(vl, vr)
}

func (t lazySeg) queryAll() int { return t[1].sum }

// a 从 0 开始
func newLazySegmentTree(a []int) lazySeg {
	t := make(lazySeg, 4*len(a))
	t.build(a, 1, 1, len(a))
	return t
}

// EXTRA: 适用于需要提取所有元素值的场景
func (t lazySeg) spreadAll(o int) {
	if t[o].l == t[o].r {
		return
	}
	t.spread(o)
	t.spreadAll(o << 1)
	t.spreadAll(o<<1 | 1)
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

[leetcode 729. 我的日程安排表 I](https://leetcode.cn/problems/my-calendar-i/)

```php
class Node
{
    public $left = null, $right = null;
    public $val = 0, $add = 0;
}

class MyCalendar {
    private $len = 1e9;
    private $root = null;
    /**
     */
    function __construct() {
        $this->root = new Node;
    }

    /**
     * @param Integer $start
     * @param Integer $end
     * @return Boolean
     */
    function book($start, $end) {
        if ($this->query($this->root, 0, $this->len, $start, $end - 1)) {
            return false;
        }
        $this->update($this->root, 0, $this->len, $start, $end - 1, 1);
        return true;
    }

    function query(Node $node, $start, $end, $l, $r) {
        if ($start >= $l && $end <= $r) {
            return $node->val;
        }
        $this->pushDown($node);
        $mid = ($start + $end) >> 1;
        $ans = 0;
        if ($mid >= $l) {
            $ans = $this->query($node->left, $start, $mid, $l, $r);
        }
        if ($mid < $r) {
            $ans = max($ans, $this->query($node->right, $mid + 1, $end, $l, $r));
        }
        return $ans;
    }

    function update(Node $node, $start, $end, $l, $r, $val) {
        if ($start >= $l && $end <= $r) {
            $node->val += $val;
            $node->add += $val;
            return ;
        }
        $this->pushDown($node);
        $mid = ($start + $end) >> 1;
        if ($mid >= $l) {
            $this->update($node->left, $start, $mid, $l, $r, $val);
        }
        if ($mid < $r) {
            $this->update($node->right, $mid + 1, $end, $l, $r, $val);
        }
        $this->pushUp($node);
    }

    function pushDown(Node $node) {
        if ($node->left == null) {
            $node->left = new Node;
        }
        if ($node->right == null) {
            $node->right = new Node;
        }
        if ($node->add == 0) {
            return;
        }
        $node->left->val += $node->add;
        $node->left->add += $node->add;
        $node->right->val += $node->add;
        $node->right->add += $node->add;
        $node->add = 0;
    }

    function pushUp(Node $node) {
        $node->val = max($node->left->val, $node->right->val);
    }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * $obj = MyCalendar();
 * $ret_1 = $obj->book($start, $end);
 */

```

[731. 我的日程安排表 II](https://leetcode.cn/problems/my-calendar-ii/)
```php
<?php

class Node
{
    public $left = null, $right = null;
    public $val = 0, $add = 0;
}

class MyCalendarTwo
{
    private $limit = 1e9;
    private $root = null;

    /**
     */
    function __construct()
    {
        $this->root = new Node;
    }

    /**
     * @param Integer $start
     * @param Integer $end
     * @return Boolean
     */
    function book($start, $end)
    {
        if ($this->query($this->root, 0, $this->limit, $start, $end - 1) > 1) {
            return false;
        }
        $this->update($this->root, 0, $this->limit, $start, $end - 1, 1);
        return true;
    }

    function query(Node $node, $start, $end, $l, $r)
    {
        if ($start >= $l && $end <= $r) {
            return $node->val;
        }
        $this->pushDown($node);
        $mid = ($start + $end) >> 1;
        $ans = 0;
        if ($mid >= $l) {
            $ans = $this->query($node->left, $start, $mid, $l, $r);
        }
        if ($mid < $r) {
            $ans = max($ans, $this->query($node->right, $mid + 1, $end, $l, $r));
        }
        return $ans;
    }

    function update(Node $node, $start, $end, $l, $r, $val)
    {
        if ($start >= $l && $end <= $r) {
            $node->val += $val;
            $node->add += $val;
            return;
        }
        $this->pushDown($node);
        $mid = ($start + $end) >> 1;
        if ($mid >= $l) {
            $this->update($node->left, $start, $mid, $l, $r, $val);
        }
        if ($mid < $r) {
            $this->update($node->right, $mid + 1, $end, $l, $r, $val);
        }
        $this->pushUp($node);
    }

    function pushDown(Node $node)
    {
        if (!$node->left) {
            $node->left = new Node;
        }
        if (!$node->right) {
            $node->right = new Node;
        }
        if ($node->add == 0) {
            return;
        }
        $node->left->val  += $node->add;
        $node->left->add  += $node->add;
        $node->right->val += $node->add;
        $node->right->add += $node->add;
        $node->add        = 0;
    }

    function pushUp(Node $node)
    {
        $node->val = max($node->left->val, $node->right->val);
    }
}

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * $obj = MyCalendarTwo();
 * $ret_1 = $obj->book($start, $end);
 */
```
