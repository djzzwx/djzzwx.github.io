# 快速幂

```go showLineNumbers
func pow(a, b int) int {
    res := 1
    for b > 0 {
        if b & 1 == 1 {
            res *= a
        }
        a *= a
        b >>= 1
    }
    return res
}
```

# 快速幂取模

```go showLineNumbers
func powMod(a, b, m int) int {
    res := 1
    a %= m
    if b == 0 {
        return 1 % m
    }
    for b > 0 {
        if b & 1 == 1 {
            res = (res * a) % m
        }
        a = (a * a) % m
        b >>= 1
    }
    return res
}
```