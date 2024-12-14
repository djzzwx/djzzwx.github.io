# 大/小根堆

### 基础用法

```go showLineNumbers title="base"

type pair struct { v, p int }
type PairHeap []pair

func (h PairHeap) Len() int { return len(h) }
func (h PairHeap) Less(i, j int) bool { return h[i].v < h[j].v || h[i].v == h[j].v && h[i].p < h[j].p }
func (h PairHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *PairHeap) Push(x interface{}) { *h = append(*h, x.(pair)) }
func (h *PairHeap) Pop() interface{} { x := (*h)[len(*h)-1]; *h = (*h)[:len(*h)-1]; return x }
func (h *PairHeap) push(v interface{}) { heap.Push(h, v) }
func (h *PairHeap) pop() interface{} { return heap.Pop(h) }

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
