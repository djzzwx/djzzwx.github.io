# 矩阵快速幂

```go showLineNumbers
const mod = 1_000_000_007

type matrix [][]int

func newMatrix(n, m int) matrix {
    a := make(matrix, n)
    for i := range a {
        a[i] = make([]int, m)
    }
    return a
}

func newIdentityMatrix(n int) matrix {
    a := make(matrix, n)
    for i := range a {
        a[i] = make([]int, n)
        a[i][i] = 1
    }
    return a
}

func (a matrix) mul(b matrix) matrix {
    c := newMatrix(len(a), len(b[0]))
    for i, row := range a {
        for j := range b[0] {
            for k, v := range row {
                c[i][j] = (c[i][j] + v*b[k][j]) % mod
            }
        }
    }
    return c
}

func (a matrix) pow(n int64) matrix {
    res := newIdentityMatrix(len(a))
    for ; n > 0; n /= 2 {
        if n%2 > 0 {
            res = res.mul(a)
        }
        a = a.mul(a)
    }
    return res
}
```