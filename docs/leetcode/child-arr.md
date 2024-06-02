# 子数组

```go
func smallestSubarrays(nums []int) []int {
	n := len(nums)
	ans := make([]int, n)
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
        // 本题只用到了 ors[0]，如果题目改成任意给定数字，可以在 ors 中查找
		ans[i] = ors[0].i - i + 1
	}
	return ans
}
```