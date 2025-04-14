# 进制转换

```go showLineNumbers title="s为十进制数字符串，转换为b进制数字符串"
func trans(s string, b int) string {
	x := &big.Int{}
	fmt.Fscan(strings.NewReader(s), x)
	return x.Text(b) // 转成 b 进制
}
```
