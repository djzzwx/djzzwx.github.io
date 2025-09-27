# 三角形

```go showLineNumbers title="任意3点组成的三角形的面积"

func area(p1, p2, p3 []int) float64 {
    p1, p2, p3 := points[i], points[j], points[k]
    x1, y1 := p2[0]-p1[0], p2[1]-p1[1]
    x2, y2 := p3[0]-p1[0], p3[1]-p1[1]
    return float64(abs(x1*y2-y1*x2)) / 2
}

func abs(x int) int { if x < 0 { return -x }; return x }

```