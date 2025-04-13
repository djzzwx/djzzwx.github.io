# 最大(小)公约(倍)数

```go showLineNumbers title="辗转相除法"
func gcd(a, b int) int {
    for a != 0 {
        a, b = b % a, a
    }
    return b
}
```

```go showLineNumbers title="最小公倍数"
func lcm(a, b int) int {
    return a / gcd(a, b) * b
}
```

```go showLineNumbers
func gcdArr(a []int) int {
    g := 0
    for _, v := range a {
        g = gcd(g, v)
    }
    return g
}

func gcd(a, b int) int {
    for a != 0 {
        a, b = b % a, a
    }
    return b
}
```

```go showLineNumbers
func lcmArr(a []int) int {
    l := 1
    for _, v := range a {
        l = lcm(l, v)
    }
    return l
}

func lcm(a, b int) int {
    return a / gcd(a, b) * b
}
```
