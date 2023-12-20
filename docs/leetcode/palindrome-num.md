# 生成回文数

### 例：生成4e4以内的回文数

```go showLineNumbers
pal := []int{}
for i := 1; i < 400; i++ {
    p := i
    // 长度 n * 2 - 1
    for x := i / 10; x > 0; x /= 10 {
        p = p*10 + x%10
    }
    pal = append(pal, p)
    if i < 100 {
        p := i
        // 长度 n * 2
        for x := i; x > 0; x /= 10 {
            p = p*10 + x%10
        }
        pal = append(pal, p)
    }
}
```