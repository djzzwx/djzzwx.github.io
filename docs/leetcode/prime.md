# 质数

## 求解 ` <= n ` 的所有质数

### 埃氏筛
```go showLineNumbers
const N int = 1e5+1
var primes [N]bool

func init() {
    for i := 2; i < N; i++ {
        primes[i] = true
    }
    for i := 2; i < N; i++ {
        if primes[i] {
            for j := i * i; j < N; j += i {
                primes[j] = false
            }
        }
    }
}
```
### 欧拉筛
```go showLineNumbers
const N int = 1e5+1
var primes [N]bool

func init() {
    list := []int{}
    for i := 2; i < N; i++ {
        primes[i] = true
    }
    for i := 2; i < N; i++ {
        if primes[i] {
            list = append(list, i)
        }
        for _, v := range list {
            t := i * v
            if t >= N {
                break
            }
            primes[t] = false
            if i % v == 0 {
                break
            }
        }
    }
}
```
### 判断质数
```go showLineNumbers
func isPrime(n int) bool {
    for i := 2; i*i <= n; i++ {
        if n%i == 0 {
            return false
        }
    }
    return n >= 2 // 1 不是质数
}
```

#### 相关题目

[2761. 和等于目标值的质数对](https://leetcode.cn/problems/prime-pairs-with-target-sum/)
