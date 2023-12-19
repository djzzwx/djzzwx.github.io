# 最大公约数

```go showLineNumbers title="辗转相除法"
func gcd(a, b int) int {
	for a != 0 {
		a, b = b % a, a
	}
	return b
}
```