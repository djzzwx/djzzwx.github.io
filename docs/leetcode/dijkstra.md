# Dijkstra

```go showLineNumbers
// 适用于稠密图 O(n^2)

func shortestPathDijkstra(g [][]int, st int) []int {
    n := len(g)

    const inf int = 1e18 // 1e9+1
    dis := make([]int, n)
    for i := range dis {
        dis[i] = inf
    }
    dis[st] = 0
    vis := make([]bool, n)
    for {
        v := -1
        for w, b := range vis {
            if !b && (v < 0 || dis[w] < dis[v]) {
                v = w
            }
        }
        if v < 0 {
            return dis
        }
        vis[v] = true
        for w, wt := range g[v] {
            if newD := dis[v] + wt; newD < dis[w] {
                dis[w] = newD
            }
        }
    }
}
```
```go showLineNumbers
// 适用于稀疏图 O(nLogn)

func shortestPathDijkstra(g [][]pair, st int) []int {
    n := len(g)

    const inf int = 1e18 // 1e9+1
    dis := make([]int, n)
    for i := range dis {
        dis[i] = inf
    }

    dis[st] = 0

    hp := new(MinHp)
    heap.Push(hp, pair{ st, 0 })

    for hp.Len() > 0 {
        cur := heap.Pop(hp).(pair)
        if dis[cur.i] >= cur.d {
            for _, ne := range g[cur.i] {
                if tmp := dis[cur.i] + ne.d; tmp < dis[ne.i] {
                    dis[ne.i] = tmp
                    heap.Push(hp, pair{ ne.i, tmp })
                }
            }
        }
    }
    return dis
}

type pair struct { i, d int }

type MinHp []pair

func (h MinHp) Len() int { return len(h) }
func (h MinHp) Less(i, j int) bool { return h[i].d < h[j].d }
func (h MinHp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *MinHp) Push(v interface{}) { *h = append(*h, v.(pair)) }
func (h *MinHp) Pop() interface{} {
  o := (*h)[len(*h)-1]
  *h = (*h)[:len(*h)-1]
  return o
}
```