# 整除分块

```go showLineNumbers
Fscan(in, &n, &m)
f := make([]int, n+1)
f[n] = 1
s := 1
for l, r := 2, 0; l <= n; l = r + 1 {
    r = n / (n / l)
    f[n/l] = (f[n/l] + (r-l+1)*f[n]) % m
}
for i := n - 1; i >= 1; i-- {
    f[i] = (f[i] + s) % m
    for l, r := 2, 0; l <= i; l = r + 1 {
        r = i / (i / l)
        f[i/l] = (f[i/l] + (r-l+1)*f[i]) % m
    }
    s = (s + f[i]) % m
}
Fprintln(out, f[1])
```