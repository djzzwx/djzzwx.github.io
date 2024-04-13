# 最小生成树

```go showLineNumbers title="kruskal"
func (*graph) mstKruskal(n int, edges [][]int) int {
	// 边权范围小的话也可以用桶排
	sort.Slice(edges, func(i, j int) bool { return edges[i][2] < edges[j][2] })

	fa := make([]int, n) // n+1
	for i := range fa {
		fa[i] = i
	}
	var find func(int) int
	find = func(x int) int {
		if fa[x] != x {
			fa[x] = find(fa[x])
		}
		return fa[x]
	}

	sum := 0
	cntE := 0
	for _, e := range edges {
		v, w, wt := e[0], e[1], e[2]
		fv, fw := find(v), find(w)
		if fv != fw {
			fa[fv] = fw
			sum += wt
			cntE++
		}
	}

	// 图不连通
	if cntE < n-1 {
		return -1
	}
	return sum
}
```

```go showLineNumbers title="prim"
func (*graph) mstPrim(dis [][]int, root int) (mstSum int, edges [][2]int) {
	edges = make([][2]int, 0, len(dis)-1)

	// 注意：dis 需要保证 dis[i][i] = inf，从而避免自环的影响

	const inf int = 2e9
	// minD[i].d 表示当前 MST 到点 i 的最小距离，对应的边为 minD[i].v-i
	minD := make([]struct{ v, d int }, len(dis))
	for i := range minD {
		minD[i].d = inf
	}
	minD[root].d = 0
	inMST := make([]bool, len(dis)) // 初始时所有点都不在 MST 中
	for {
		// 根据切分定理，求不在当前 MST 的点到当前 MST 的最小距离，即 minD[v].d
		v := -1
		for w, in := range inMST {
			if !in && (v < 0 || minD[w].d < minD[v].d) {
				v = w
			}
		}
		if v < 0 { // 已求出 MST
			return
		}

		// 加入 MST
		inMST[v] = true
		mstSum += minD[v].d
		if v != root {
			edges = append(edges, [2]int{minD[v].v, v})
		}

		// 更新 minD
		for w, d := range dis[v] {
			// 注：若 mstPrim 结束后 minD 无其他用途，!inMST[w] 的判断可以去掉
			if !inMST[w] && d < minD[w].d {
				minD[w].d = d
				minD[w].v = v
			}
		}
	}
}
```