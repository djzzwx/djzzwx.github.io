# 前缀树

```go showLineNumbers
type Trie struct {
    childs [26]*Trie
    end bool
}


func Constructor() Trie {
    return Trie{}
}


func (tr *Trie) Insert(word string)  {
    t := tr
    for _, w := range word {
        id := w - 'a'
        if t.childs[id] == nil {
            t.childs[id] = new(Trie)
        }
        t = t.childs[id]
    }
    t.end = true
}


func (tr *Trie) Search(word string) bool {
    t := tr
    for _, w := range word {
        id := w - 'a'
        if t.childs[id] == nil {
            return false
        }
        t = t.childs[id]
    }
    return t.end
}

func (tr *Trie) StartsWith(prefix string) bool {
    t := tr
    for _, w := range prefix {
        id := w - 'a'
        if t.childs[id] == nil {
            return false
        }
        t = t.childs[id]
    }
    return true
}
```
