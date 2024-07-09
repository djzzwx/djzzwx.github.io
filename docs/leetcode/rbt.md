# rbt

```go

xs := redblacktree.New[int, int]()
put := func(tr *redblacktree.Tree[int, int], a int) {
    c, _ := tr.Get(a)
    tr.Put(a, c + 1)
}
remove := func(tr *redblacktree.Tree[int, int], a int) {
    c, _ := tr.Get(a)
    if c == 1 {
        tr.Remove(a)
    } else {
        tr.Put(a, c - 1)
    }
}

```