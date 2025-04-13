# 进制转换

```go showLineNumbers title="s为十进制数字符串，转换为b进制数字符串"
trans := func(s string) string {
	v := &big.Int{}
	fmt.Fscan(strings.NewReader(s), v)
	return v.Text(b)
}
```
