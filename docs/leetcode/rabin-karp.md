
# Rabin-Karp

#### 相关题目

[1044. 最长重复子串](https://leetcode.cn/problems/longest-duplicate-substring/)

```go showLineNumbers
func longestDupSubstring(s string) string {
    n := len(s)
    var prime uint64 = 31
    find := func(len int) int {
        var h, p uint64
        h, p = 0, 1
        for i := 0; i < len; i++ {
            h = h*prime + uint64(s[i]-'a')
            p *= prime
        }
        mp := map[uint64]bool{h: true}
        for i := len; i < n; i++ {
            h = h*prime - uint64(s[i-len]-'a')*p + uint64(s[i]-'a')
            if mp[h] {
                return i - len + 1
            }
            mp[h] = true
        }
        return -1
    }
    l, r, pos, leng := 0, n-1, -1, 0
    for l <= r {
        mid := l + (r - l) >> 1
        if p := find(mid); p >= 0 {
            pos, leng = p, mid
            l = mid + 1
        } else {
            r = mid - 1
        }
    }
    if pos != -1 {
        return s[pos: pos + leng]
    }
    return ""
}
```