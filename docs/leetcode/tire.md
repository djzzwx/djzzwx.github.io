# 字典树

```go showLineNumbers title="数组中两数最大异或值"
func findMaximumXOR(nums []int) int {
	ans := 0
	t := new(tree)
	for _, v := range nums {
		ans = max(ans, t.query(v))
		t.insert(v)
	}
	return ans
}

func max(a, b int) int { if a > b { return a }; return b }

type tree struct {
	l, r *tree
}

func (t *tree) query(x int) int {
	if t.l == nil && t.r == nil {
		return -1
	}
	cur := t
	res := 0
	for i := 30; i >= 0; i-- {
		if x>>i&1 == 1 {
			if cur.l != nil {
				cur = cur.l
				res <<= 1
				res |= 1
			} else {
				cur = cur.r
				res <<= 1
			}
		} else {
			if cur.r != nil {
				cur = cur.r
				res <<= 1
				res |= 1
			} else {
				cur = cur.l
				res <<= 1
			}
		}
	}
	return res
}

func (t *tree) insert(x int) {
	cur := t
	for i := 30; i >= 0; i-- {
		if x>>i&1 == 0 {
			if cur.l == nil {
				cur.l = new(tree)
			}
			cur = cur.l
		} else {
			if cur.r == nil {
				cur.r = new(tree)
			}
			cur = cur.r
		}
	}
}
```

```php
/**
 * Class TireNode
 */
class TireNode
{
    /**
     * @var null
     */
    public $val = null;
    /**
     * @var array
     */
    public $children = [];
    /**
     * @var bool
     */
    public $tail = false;

    /**
     * TireNode constructor.
     * @param null $val
     */
    function __construct($val = null)
    {
        $this->val = $val;
    }
}
```

#### 相关题目

[leetcode 648. 单词替换](https://leetcode.cn/problems/replace-words/)

```php
class Solution
{

    /**
     * @param String[] $dictionary
     * @param String $sentence
     * @return String
     */
    function replaceWords($dictionary, $sentence)
    {
        $tire = new Tire;
        foreach ($dictionary as $dic) {
            $tire->insert($dic);
        }
        $sentence = explode(' ', $sentence);
        foreach ($sentence as $k => $sen) {
            $sentence[$k] = $tire->find($sen) ?: $sen;
        }
        return implode(' ', $sentence);
    }
}

class Tire
{
    /**
     * @var
     */
    private $root;

    /**
     * Tire constructor.
     */
    function __construct()
    {
        $this->root = new TireNode('/');
    }

    /**
     * @return TireNode
     */
    function getRoot()
    {
        return $this->root;
    }

    /**
     * @param string $data
     */
    function insert($data)
    {
        $pre = $this->root;
        for ($i = 0; $i < strlen($data); $i++) {
            if (!isset($pre->children[$data[$i]])) {
                $pre->children[$data[$i]] = new TireNode($data[$i] . '/');
            }
            $pre = $pre->children[$data[$i]];
        }
        $pre->tail = true;
    }

    /**
     * @param $data
     *
     * @return string|string[]|null
     */
    function find($data)
    {
        $path = [];
        $node = $this->root;
        for ($i = 0; $i < strlen($data); $i++) {
            $path[] = $node->val;
            if (!isset($node->children[$data[$i]]) || $node->tail) {
                break;
            }
            $node = $node->children[$data[$i]];
        }
        return $node->tail ? preg_replace('/\//', '', implode('', $path)) : '';
    }
}
```

[676. 实现一个魔法字典](https://leetcode.cn/problems/implement-magic-dictionary/)
```php
class Tire{
	public $children = [];
	public $end = false;
}

class MagicDictionary {
	private $root;
    /**
     */
    function __construct() {
		$this->root = new Tire;
    }

    /**
     * @param String[] $dictionary
     * @return NULL
     */
    function buildDict($dictionary) {
		foreach ($dictionary as $dict) {
			$cur = $this->root;
			for ($i = 0; $i < strlen($dict); $i++) {
				if (!isset($cur->children[$dict[$i]])) {
					$cur->children[$dict[$i]] = new Tire;
				}
				$cur = $cur->children[$dict[$i]];
			}
			$cur->end = true;
		}
    }

    /**
     * @param String $searchWord
     * @return Boolean
     */
    function search($searchWord) {
		return $this->_search($this->root, $searchWord, 0, false);
    }

	function _search($node, $search, $idx, $replace) {
		if ($idx == strlen($search)) {
			return $node->end && $replace;
		}
		if (isset($node->children[$search[$idx]])) {
			if ($this->_search($node->children[$search[$idx]], $search, $idx + 1, $replace))
				return true;
		}
		if (!$replace) {
			foreach($node->children as $c => $child){
				if ($c != $search[$idx] && $this->_search($child, $search, $idx + 1, true)) {
					return true;
				}
			}
		}
		return false;
	}
}
```


