# 卡特兰数


$$
C_0=1, C_n+1 = \frac{2(2n+1)}{n+1}C_n
$$

```go showLineNumbers
func numTrees(n int) int {
    C := 1
    for i := 0; i < n; i++ {
        C = C * 2 * (2 * i + 1) / (i + 2);
    }
    return C
}
```