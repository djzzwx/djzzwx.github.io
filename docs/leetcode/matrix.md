# 矩阵快速幂

```go showLineNumbers
func fib(n int) int {
    if n == 0 {
        return 0
    }
    m := matrix{
        {1, 1},
        {1, 0},
    }
    f0 := matrix{{1}, {0}}
    fn := m.powMul(n-1, f0)
    return fn[0][0]
}

type matrix [][]int

func newMatrix(n, m int) matrix {
    a := make(matrix, n)
    for i := range a {
        a[i] = make([]int, m)
    }
    return a
}

// 返回矩阵 a 和矩阵 b 相乘的结果
func (a matrix) mul(b matrix) matrix {
    c := newMatrix(len(a), len(b[0]))
    for i, row := range a {
        for k, x := range row {
            if x == 0 {
                continue
            }
            for j, y := range b[k] {
                c[i][j] += x * y
            }
        }
    }
    return c
}

// a^n * f0
func (a matrix) powMul(n int, f0 matrix) matrix {
    res := f0
    for ; n > 0; n /= 2 {
        if n%2 > 0 {
            res = a.mul(res)
        }
        a = a.mul(a)
    }
    return res
}

```

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
