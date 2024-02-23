# 大/小根堆

### 基础用法
1. minheap

```go showLineNumbers
type IntHeap []int

func (h IntHeap) Len() int            { return len(h) }
func (h IntHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() interface{} {
    x := (*h)[len(*h)-1]
    *h = (*h)[:len(*h)-1]
    return x
}
func (h *IntHeap) push(v interface{}) { heap.Push(h, v) }
func (h *IntHeap) pop() interface{} { return heap.Pop(h).(int) }
```

2. maxheap

修改`minheap`中的`Less()`方法的比较即可

```go showLineNumbers
func (h IntHeap) Less(i, j int) bool  { return h[i] > h[j] }
```

### 简便实现

1. minheap

```go showLineNumbers
type IntHeap struct {
	sort.IntSlice
}

func (h *IntHeap) Push(v interface{}) {
	h.IntSlice = append(h.IntSlice, v.(int))
}

func (h *IntHeap) Pop() interface{} {
	t := h.IntSlice[len(h.IntSlice)-1]
	h.IntSlice = h.IntSlice[:len(h.IntSlice)-1]
	return t
}

func (h *IntHeap) push(v interface{}) {
	heap.Push(h, v)
}

func (h *IntHeap) pop() interface{} {
	return heap.Pop(h).(int)
}
```

2. maxheap

重写`Less`变大根堆

```go showLineNumbers
func (h *IntHeap) Less(i, j int) bool {
    return h.IntSlice[i] > h.IntSlice[j]
}
```
