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
	o := *h
	n := len(o)
	x := o[n-1]
	*h = o[:n-1]
	return x
}
```

usage

```go showLineNumbers
h := &IntHeap{}
heap.Init(h)
heap.Push(h, 1)
heap.Push(h, 3)
heap.Push(h, 2)
heap.Push(h, 7)
heap.Push(h, 5)
fmt.Println((*h)[0])
for h.Len() > 0 {
	fmt.Println(heap.Pop(h))
}
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
```

usage

```go showLineNumbers
nums := []int{31, 18, 1, 2, 3, 5, 7, 11, 12, 13}
	
h := &IntHeap{}
for _, v := range nums {
	heap.Push(h, v)
	fmt.Println((*h).IntSlice[0])
}

for i, n := 0, len(nums); i < n; i++ }
	fmt.Println(i, heap.Pop(h))
}
```

2. maxheap

重写`Less`变大根堆

```go showLineNumbers
func (h *IntHeap) Less(i, j int) bool {
    return h.IntSlice[i] > h.IntSlice[j]
}
```
