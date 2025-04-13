# 中位数


```go showLineNumbers title="懒删除堆"
func medianSlidingWindow(nums []int, k int) [][2]int {
    ans := make([][2]int, len(nums)-k+1)
    left := newLazyHeap()  // 最大堆（元素取反）
    right := newLazyHeap() // 最小堆

    for i, in := range nums {
        // 1. 进入窗口
        if left.size == right.size {
            left.push(-right.pushPop(in))
        } else {
            right.push(-left.pushPop(-in))
        }

        l := i + 1 - k
        if l < 0 { // 窗口大小不足 k
            continue
        }

        // 2. 计算答案
        if k%2 > 0 {
            ans[l][0] = int(-left.top())
        } else {
            ans[l][0] = int(right.top()-left.top()) / 2
        }
        ans[l][1] = ans[l][0]*(k&1) + left.sum + right.sum

        // 3. 离开窗口
        out := nums[l]
        if out <= -left.top() {
            left.remove(-out)
            if left.size < right.size {
                left.push(-right.pop()) // 平衡两个堆的大小
            }
        } else {
            right.remove(out)
            if left.size > right.size+1 {
                right.push(-left.pop()) // 平衡两个堆的大小
            }
        }
    }

    return ans
}

func newLazyHeap() *lazyHeap {
    return &lazyHeap{removeCnt: map[int]int{}}
}

// 懒删除堆
type lazyHeap struct {
    sort.IntSlice
    removeCnt map[int]int // 每个元素剩余需要删除的次数
    size, sum int         // 实际大小
}

// 必须实现的两个接口
func (h *lazyHeap) Push(v any) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *lazyHeap) Pop() any   { a := h.IntSlice; v := a[len(a)-1]; h.IntSlice = a[:len(a)-1]; return v }

// 删除
func (h *lazyHeap) remove(v int) {
    h.removeCnt[v]++ // 懒删除
    h.size--
    h.sum -= v
}

// 正式执行删除操作
func (h *lazyHeap) applyRemove() {
    for h.removeCnt[h.IntSlice[0]] > 0 {
        h.removeCnt[h.IntSlice[0]]--
        heap.Pop(h)
    }
}

// 查看堆顶
func (h *lazyHeap) top() int {
    h.applyRemove()
    return h.IntSlice[0]
}

// 出堆
func (h *lazyHeap) pop() int {
    h.applyRemove()
    h.size--
    v := heap.Pop(h).(int)
    h.sum -= v
    return v
}

// 入堆
func (h *lazyHeap) push(v int) {
    if h.removeCnt[v] > 0 {
        h.removeCnt[v]-- // 抵消之前的删除
    } else {
        heap.Push(h, v)
    }
    h.sum += v
    h.size++
}

// push(v) 然后 pop()
func (h *lazyHeap) pushPop(v int) int {
    if h.size > 0 && v > h.top() { // 最小堆，v 比堆顶大就替换堆顶
        h.sum += v - h.IntSlice[0]
        v, h.IntSlice[0] = h.IntSlice[0], v
        heap.Fix(h, 0)
    }
    return v
}
```


```go showLineNumbers title="有序集合"
func medianSlidingWindow(nums []int, k int) [][2]int {
    ans := make([][2]int, len(nums)-k+1)
    var lSum, rSum, lSize, rSize int
    left := redblacktree.New[int, int]()
    right := redblacktree.New[int, int]()

    put := func(tr *redblacktree.Tree[int, int], x int) {
        c, ok := tr.Get(x)
        if ok {
            tr.Put(x, c+1)
        } else {
            tr.Put(x, 1)
        }
    }
    remove := func(tr *redblacktree.Tree[int, int], a int) {
        c, _ := tr.Get(a)
        if c == 1 {
            tr.Remove(a)
        } else {
            tr.Put(a, c-1)
        }
    }
    r2l := func() {
        rightLeftVal := right.Left().Key
        remove(right, rightLeftVal)
        put(left, rightLeftVal)
        lSum += rightLeftVal
        rSum -= rightLeftVal
        lSize++
        rSize--
    }
    l2r := func() {
        leftRightVal := left.Right().Key
        remove(left, leftRightVal)
        put(right, leftRightVal)
        rSum += leftRightVal
        lSum -= leftRightVal
        lSize--
        rSize++
    }
    balance := func() {
        for lSize <= rSize {
            r2l()
        }
        for lSize > rSize+1 {
            l2r()
        }
    }

    for i, in := range nums {
        // 1. 进入窗口
        put(right, in)
        rSum += in
        rSize++

        balance()

        l := i + 1 - k
        if l < 0 { // 窗口大小不足 k
            continue
        }

        // 2. 计算答案
        if k%2 > 0 {
            ans[l][0] = int(left.Right().Key)
        } else {
            ans[l][0] = int(right.Left().Key+left.Right().Key) / 2
        }
        ans[l][1] = ans[l][0]*(k&1) - lSum + rSum

        // 3. 离开窗口
        out := nums[l]
        if out <= left.Right().Key {
            remove(left, out)
            lSum -= out
            lSize--
        } else {
            remove(right, out)
            rSum -= out
            rSize--
        }
        balance()
    }

    return ans
}
```
