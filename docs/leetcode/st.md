# 单调栈

```go showLineNumbers title='求左右侧第一个 <= 当前值的位置'
func stMin(nums []int) ([]int, []int) {
    n := len(nums)
    leftMin, rightMin := make([]int, n), make([]int, n)
    for i := range leftMin {
        leftMin[i] = -1
        rightMin[i] = n
    }
    st := []int{}
    for i, v := range nums {
        for len(st) > 0 && v < nums[st[len(st)-1]] {
            rightMin[st[len(st)-1]] = i
            st = st[:len(st)-1]
        }
        if len(st) > 0 {
            leftMin[i] = st[len(st)-1]
        }
        st = append(st, i)
    }
    return leftMin, rightMin
}
```
```go showLineNumbers title='求左右侧第一个 >= 当前值的位置'
func stMax(nums []int) ([]int, []int) {
    n := len(nums)
    leftMax, rightMax := make([]int, n), make([]int, n)
    for i := range leftMax {
        leftMax[i] = -1
        rightMax[i] = n
    }
    st := []int{}
    for i, v := range nums {
        for len(st) > 0 && v > nums[st[len(st)-1]] {
            rightMax[st[len(st)-1]] = i
            st = st[:len(st)-1]
        }
        if len(st) > 0 {
            leftMax[i] = st[len(st)-1]
        }
        st = append(st, i)
    }
    return leftMax, rightMax
}
```
