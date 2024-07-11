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

func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}

func logTrick(nums []int, op int) map[int]int {
	res := map[int]int{}
	type pair struct{ l, r, v int }
	f := []pair{}
	for pos, cur := range nums {
		for i := range f {
			f[i].v = opc(f[i].v, cur, op)
		}
		f = append(f, pair{pos, pos + 1, cur})

		ptr := 0
		for _, v := range f[1:] {
			if f[ptr].v != v.v {
				ptr += 1
				f[ptr] = v
			} else {
				f[ptr].r = v.r
			}
		}
		f = f[:ptr+1]
		for _, v := range f {
			res[v.v] += v.r - v.l
		}
	}
	return res
}

func opc(a, b, op int) int {
	if op == 1 {
		return a & b
	} else if op == 2 {
		return a | b
	} else if op == 3 {
		return gcd(a, b)
	} else {
		return -1
	}
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