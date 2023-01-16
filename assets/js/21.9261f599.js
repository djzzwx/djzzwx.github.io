(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{435:function(t,e,a){"use strict";a.r(e);var l=a(62),n=Object(l.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"lock-锁"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#lock-锁"}},[t._v("#")]),t._v(" Lock(锁)")]),t._v(" "),a("h3",{attrs:{id:"认识"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#认识"}},[t._v("#")]),t._v(" 认识")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("解释")]),t._v(" "),a("div",{staticClass:"language-tex extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tex"}},[a("code",[t._v("计算机协调多个进程或线程并发访问某一资源的机制。\n")])])])]),t._v(" "),a("li",[a("p",[t._v("重要性")]),t._v(" "),a("div",{staticClass:"language-tex extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tex"}},[a("code",[t._v("在数据库中，除传统计算资源（CPU、RAM、I"),a("span",{pre:!0,attrs:{class:"token function selector"}},[t._v("\\O")]),t._v("等）的争抢，数据也是一种供多用户共享的资源。\n如何保证数据并发访问的一致性，有效性，是所有数据库必须要解决的问题。\n锁冲突也是影响数据库并发访问性能的一个重要因素，因此锁对数据库尤其重要。\n")])])])]),t._v(" "),a("li",[a("p",[t._v("缺点")]),t._v(" "),a("div",{staticClass:"language-tex extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tex"}},[a("code",[t._v("加锁是消耗资源的，锁的各种操作，包括获得锁、检测锁是否已解除、释放锁等 ，都会增加系统的开销。\n")])])])])]),t._v(" "),a("h3",{attrs:{id:"类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#类型"}},[t._v("#")]),t._v(" 类型")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}}),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("表锁")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("行锁")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("种类")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("读锁（read lock | shared lock）针对同一份数据，多个读操作同时进行互不影响"),a("br"),t._v("写锁（write lock | exclusive lock）当前操作未完成之前会阻塞其他操作")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("读锁（read lock|shared lock）允许一个事务去读一行，阻止其他事务获得相同数据集的排他锁"),a("br"),t._v("写锁（write lock|exclusive lock）允许获得排他锁的事务更新数据，阻止其他事务取得相同数据集的共享锁和排他锁"),a("br"),t._v("意向共享锁（IS）一个事务给一个数据行加共享锁时，必须先获得表的IS锁"),a("br"),t._v("意向排他锁（IX）一个事务给一个数据行加排他锁时，必须先获得表的IX锁")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("存储引擎默认锁")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("MyISAM")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Innodb")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("特点")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("对整张表加锁"),a("br"),t._v("开销小"),a("br"),t._v("加锁快"),a("br"),t._v("无死锁"),a("br"),t._v("锁粒度大，锁冲突概率大，并发性低")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("对一行数据加锁"),a("br"),t._v("开销大"),a("br"),t._v("加锁慢"),a("br"),t._v("有死锁"),a("br"),t._v("锁粒度小，锁冲突概率小，并发性高")])])])]),t._v(" "),a("h3",{attrs:{id:"innodb-锁模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#innodb-锁模式"}},[t._v("#")]),t._v(" InnoDB 锁模式")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("InnoDB实现了两种模式的"),a("strong",[t._v("行锁")]),t._v("：")]),t._v(" "),a("ul",[a("li",[t._v("共享锁（s）：允许一个事务读取一行，阻止其他事务获取相同数据集的排他锁。")]),t._v(" "),a("li",[t._v("排他锁（x）：允许获得排他锁的事务更新数据，阻止其他事务获取相同数据集的共享读锁和排他写锁。")])])]),t._v(" "),a("li",[a("p",[t._v("为了表锁行锁共存，实现多粒度锁机制，InnoDB还有两种内部使用的意向锁（Intention Locks），意向锁都是表锁：")]),t._v(" "),a("ul",[a("li",[t._v("意向共享锁（IS）：事务打算给数据行加共享锁，必须先获得该表的 IS 锁。")]),t._v(" "),a("li",[t._v("意向排他锁（IX）：事务打算给数据行加排他锁，必须先获取该表的 IX 锁。")])])]),t._v(" "),a("li",[a("p",[t._v("锁模式兼容性：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}},[t._v("---")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("X")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("IX")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("S")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("IS")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("X")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("冲突")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("冲突")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("冲突")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("冲突")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("IX")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("冲突")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("兼容")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("冲突")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("兼容")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("S")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("冲突")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("冲突")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("兼容")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("兼容")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("IS")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("冲突")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("兼容")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("兼容")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("兼容")])])])]),t._v(" "),a("p",[t._v("注：列为当前锁，行为请求锁。")])])]),t._v(" "),a("h3",{attrs:{id:"行锁的实现算法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#行锁的实现算法"}},[t._v("#")]),t._v(" 行锁的实现算法")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("Record Lock 单行记录上的锁")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Record Lock 总是会去锁住索引记录，如果InnoDB引擎表建立的时候没有设置任何一个索引，那么存储引擎会使用隐式的主键进行锁定。\n")])])])]),t._v(" "),a("li",[a("p",[t._v("Gap Lock 锁")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("当我们用范围条件而不是相等条件检索数据，并请求共享或排他锁时，InnoDB会给符合条件的已有数据记录的索引加锁，对于键值在条件范围内但并不存在的记录也会加锁。\n\n优点：解决了事务并发的幻读问题\n不足：因为query执行过程中通过范围查找的话，他会锁定争个范围内所有的索引键值，即使这个键值并不存在。\n间隙锁有一个致命的弱点，就是当锁定一个范围键值之后，即使某些不存在的键值也会被无辜的锁定，而造成锁定的时候无法插入锁定键值范围内任何数据。在某些场景下这可能会对性能造成很大的危害。\n")])])])]),t._v(" "),a("li",[a("p",[t._v("Next-key Lock 锁")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("同时锁住数据+间隙锁\n在Repeatable Read隔离级别下，Next-key Lock 算法是默认的行记录锁定算法。\n")])])]),a("p",[a("strong",[t._v("行锁tips")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("1. 只有通过索引条件检索数据时，InnoDB才会使用行级锁，否则会使用表级锁(索引失效，行锁变表锁)\n2. 即使是访问不同行的记录，如果使用的是相同的索引键，会发生锁冲突\n3. 如果数据表建有多个索引时，可以通过不同的索引锁定不同的行\n")])])])])]),t._v(" "),a("h3",{attrs:{id:"死锁"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#死锁"}},[t._v("#")]),t._v(" 死锁")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("解释")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("指两个或者多个事务在同一资源上相互占用，并请求锁定对方占用的资源，从而导致恶性循环的现象\n")])])])]),t._v(" "),a("li",[a("p",[t._v("产生条件")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("1. 互斥条件：一个资源每次只能被一个进程使用\n2. 请求与保持条件：一个进程因请求资源而阻塞时，对已获得的资源保持不放\n3. 不剥夺条件：进程已获得的资源，在没有使用完之前，不能强行剥夺\n4. 循环等待条件：多个进程之间形成的一种互相循环等待的资源的关系\n")])])])]),t._v(" "),a("li",[a("p",[t._v("解决")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("1. 查看死锁：show engine innodb status \\G\n2. 自动检测机制，超时自动回滚代价较小的事务（innodb_lock_wait_timeout 默认50s）\n3. 人为解决，kill阻塞进程（show processlist）\n4. wait for graph 等待图（主动检测）\n")])])])]),t._v(" "),a("li",[a("p",[t._v("如何避免")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("1. 加锁顺序一致，尽可能一次性锁定所需的数据行\n2. 尽量基于primary（主键）或unique key更新数据\n3. 单次操作数据量不宜过多，涉及表尽量少\n4. 减少表上索引，减少锁定资源\n5. 尽量使用较低的隔离级别\n6. 尽量使用相同条件访问数据，这样可以避免间隙锁对并发的插入影响\n7. 精心设计索引，尽量使用索引访问数据\n")])])])])]),t._v(" "),a("h3",{attrs:{id:"乐观锁和悲观锁"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#乐观锁和悲观锁"}},[t._v("#")]),t._v(" 乐观锁和悲观锁")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}}),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("悲观锁")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("乐观锁")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("概念")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("假定会发生并发冲突，屏蔽一切可能违反数据完整性的操作")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("假设不会发生并发冲突，只在提交操作时检查是否违反数据完整性")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("实现机制")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("查询时直接锁住记录使其他事务不能查询和更新")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("提交更新时检查版本或时间戳是否符合")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("实现方式")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("表锁、行锁")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("用version或timestamp比较")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("实现者")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("数据库")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("开发者")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("适用场景")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("并发量大")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("并发量小")])])])])])}),[],!1,null,null,null);e.default=n.exports}}]);