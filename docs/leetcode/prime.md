# 质数

## 求解 ` <= n ` 的所有质数

### 埃氏筛
```go showLineNumbers
prime := make([]bool, n+1)
for i := 2; i <= n; i++ {
    prime[i] = true
}
for i := 2; i <= n; i++ {
    if prime[i] {
        for j := i * i; j <= n; j += i {
            prime[j] = false
        }
    }
}
```
### 欧拉筛
```go showLineNumbers
prime := make([]bool, n+1)
list := []int{}
for i := 2; i <= n; i++ {
    prime[i] = true
}
for i := 2; i <= n; i++ {
    if prime[i] {
        list = append(list, i)
    }
    for _, v := range list {
        if t := i * v; t <= n {
            prime[i*v] = false
        }
        if i % v == 0 {
            break
        }
    }
}
```

#### 相关题目

[2761. 和等于目标值的质数对](https://leetcode.cn/problems/prime-pairs-with-target-sum/)
