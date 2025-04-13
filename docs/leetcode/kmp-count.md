# KMP统计sep出现次数

```go showLineNumbers title='kmp统计出现的次数'
func kmpSearchCount(s, sep string) int {
    calcMaxMatchLengths := func(s string) []int {
        match := make([]int, len(s))
        for i, c := 1, 0; i < len(s); i++ {
            v := s[i]
            for c > 0 && s[c] != v {
                c = match[c-1]
            }
            if s[c] == v {
                c++
            }
            match[i] = c
        }
        return match
    }
    kmpSearch := func(text, pattern string) (cnt int) {
        n := len(text)
        match := calcMaxMatchLengths(pattern)
        lenP := len(pattern)
        c := 0
        for i, v := range text {
            for c > 0 && pattern[c] != byte(v) {
                c = match[c-1]
            }
            if pattern[c] == byte(v) {
                c++
            }
            if c == lenP {
                if i-lenP+1 < n {
                    cnt++
                }
                c = match[c-1]
            }
        }
        return
    }
    return kmpSearch(s, sep)
}
```

```go showLineNumbers title='kmp统计每次出现的位置'
func kmpSearchPos(text, pattern string) []int {
    calcPi := func(s string) []int {
        pi := make([]int, len(s))
        match := 0
        for i := 1; i < len(pi); i++ {
            v := s[i]
            for match > 0 && s[match] != v {
                match = pi[match-1]
            }
            if s[match] == v {
                match++
            }
            pi[i] = match
        }
        return pi
    }

    // 在文本串 text 中查找模式串 pattern，返回所有成功匹配的位置（pattern[0] 在 text 中的下标）
    kmpSearch := func(text, pattern string) (pos []int) {
        pi := calcPi(pattern)
        match := 0
        for i := range text {
            v := text[i]
            for match > 0 && pattern[match] != v {
                match = pi[match-1]
            }
            if pattern[match] == v {
                match++
            }
            if match == len(pi) {
                pos = append(pos, i-len(pi)+1)
                match = pi[match-1] // 如果不允许重叠，将 cnt 置为 0
            }
        }
        return
    }

    return kmpSearch(text, pattern)
}
```