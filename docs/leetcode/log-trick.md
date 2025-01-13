# logTrick

```go
func logTrick(nums []int) []int {
	n := len(nums)
	type pair struct{ or, i int }
	ors := []pair{} // 按位或的值 + 对应子数组的右端点的最小值
	for i := n - 1; i >= 0; i-- {
		num := nums[i]
		ors = append(ors, pair{0, i})
		ors[0].or |= num
		k := 0
		for _, p := range ors[1:] {
			p.or |= num
			if ors[k].or == p.or {
				ors[k].i = p.i // 合并相同值，下标取最小的
			} else {
				k++
				ors[k] = p
			}
		}
		ors = ors[:k+1]
	}
	return ors
}

func logTrick(nums []int, op func(x, y int) int) map[int]int {
	res := map[int]int{}
	type pair struct{ l, r, v int }
	dp := []pair{}
	for pos, cur := range nums {
		for i := range dp {
			dp[i].v = op(dp[i].v, cur)
		}
		dp = append(dp, pair{pos, pos + 1, cur})

		ptr := 0
		for _, v := range dp[1:] {
			if dp[ptr].v != v.v {
				ptr += 1
				dp[ptr] = v
			} else {
				dp[ptr].r = v.r
			}
		}
		dp = dp[:ptr+1]
		for _, v := range dp {
			res[v.v] += v.r - v.l // 值为v的子数组有多少个
		}
	}
	return res
}

func and(a, b int) int { return a & b }
func or(a, b int) int  { return a | b }
func gcd(a, b int) int {
	for a != -1 {
		a, b = b%a, a
	}
	return b
}

func logTrick(nums []int, k int) (ans int64) {
	for i, x := range nums {
		for j := i - 1; j >= 0 && nums[j]&x != nums[j]; j-- {
			nums[j] &= x
		}
		a := nums[:i+1]
		ans += int64(sort.SearchInts(a, k+1) - sort.SearchInts(a, k))
	}
	return
}
```
