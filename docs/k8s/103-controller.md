# Pod 控制器

![Pod 控制器](/img/k8s/controller.png)

## 概述

:::tip
&emsp;&emsp;在 Kubernetes 中运行了一系列控制器来确保集群的当前状态与期望状态保持一致，它们就是 Kubernetes集群内部的管理控制中心或者说是”中心大脑”。例如，ReplicaSet 控制器负责维护集群中运行的 Pod数量；Node控制器负责监控节点的状态，并在节点出现故障时，执行自动化修复流程，确保集群始终处于预期的工作状态。
:::

## Pod 控制器
+ ReplicationController 和 ReplicaSet
+ Deployment
+ DaemonSet
+ StateFulSet
+ Job/CronJob
+ Horizontal Pod Autoscaling

## ReplicationController 和 ReplicaSet
&emsp;&emsp;ReplicationController（RC）用来确保容器应用的副本数始终保持在用户定义的副本数，即如果有容器异常退出，会自动创建新的Pod来替代；而如果异常多出来的容器也会自动回收；

&emsp;&emsp;在新版本的 Kubernetes 中建议使用 ReplicaSet 来取代 ReplicationController 。ReplicaSet 跟 ReplicationController 没有本质的不同，只是名字不一样，并且 ReplicaSet 支持集合式的 selector; 

<details>
<summary>RC控制器</summary>

```yaml showLineNumbers
apiVersion: v1
kind: ReplicationController
metadata:
  name: rc-demo
spec:
  replicas: 3
  selector:
    app: rc-demo
  template:
    metadata:
      labels:
        app: rc-demo
    spec:
      containers:
      - name: rc-demo-container
        image: wangyanglinux/myapp:v1.0
        env:
        - name: GET_HOSTS_FROM
          value: dns
        - name: zhangsan
          value: "123"
        ports:
        - containerPort: 80
```
</details>

<details>
<summary>RS控制器</summary>

```yaml showLineNumbers
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: rs-ml-demo
spec:
  replicas: 3
  selector:
    matchLabels:
      app: rs-ml-demo
  template:
    metadata:
      labels:
        app: rs-ml-demo
    spec:
      containers:
      - name: rs-ml-demo-container
        image: wangyanglinux/myapp:v1.0
        env:
        - name: GET_HOSTS_FROM
          value: dns
        ports:
        - containerPort: 80
```
</details>

> ###### selector.matchExpressions
> `rs` 在标签选择器上，除了可以定义键值对的选择形式，还支持 `matchExpressions` 字段，可以提供多种选择。
> 
> 目前支持的操作包括：
> + In：label 的值在某个列表中
> + NotIn：label 的值不在某个列表中
> + Exists：某个 label 存在
> + DoesNotExist：某个 label 不存在


<details>
<summary>RS控制器 `selector.matchExpressions`</summary>

<details>
<summary>`selector.matchExpressions=Exists`</summary>

```yaml showLineNumbers
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: rs-me-exists-demo
spec:
  selector:
    matchExpressions:
      - key: app
        operator: Exists
  template:
    metadata:
      labels:
        app: spring-k8s
    spec:
      containers:
        - name: rs-me-exists-demo-container
          image: wangyanglinux/myapp:v1.0
          ports:
          - containerPort: 80
```

</details>

<details>
<summary>`selector.matchExpressions=In`</summary>

```yaml showLineNumbers
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: rs-me-in-demo
spec:
  selector:
    matchExpressions:
      - key: app
        operator: In
        values:
        - spring-k8s
        - hahahah
  template:
    metadata:
      labels:
        app: spring-k8s
    spec:
      containers:
        - name: rs-me-in-demo-container
          image: wangyanglinux/myapp:v1.0
          ports:
          - containerPort: 80
```

</details>

</details>

## Deployment

<details>
<summary>Deployment</summary>

```yaml showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: myapp-deploy
  name: myapp-deploy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: myapp-deploy
  template:
    metadata:
      labels:
        app: myapp-deploy
    spec:
      containers:
      - image: wangyanglinux/myapp:v1.0
        name: myapp
```

</details>

> Deployment 为 Pod 和 ReplicaSet 提供了一个声明式定义(declarative )方法，用来替 代以前的 ReplicationController 来方便的管理应用。典型的应用场景包括：
>	+ 定义 Deployment 来创建 Pod 和 ReplicaSet 
>	+ 滚动升级和回滚应用
>	+ 扩容和缩容
>	+ 暂停和继续 Deployment 

### Deployment - 更新策略

> `kubectl explain deploy.spec.strategy.type`
> + Recreate
> + rollingUpdate
> 	+ maxSurge：指定超出副本数有几个，两种方式：1、指定数量2、百分比口
> 	+ maxUnavailable:最多有几个不可用

<details>
<summary>金丝雀部署</summary>

&emsp;&emsp;金丝雀部署的名字灵感来源于17世纪英国矿井工人使用金丝雀作为瓦斯检测指标的传统方法。金丝雀对瓦斯这种气体十分敏感，空气中哪怕有极其微量的瓦斯，金丝雀也会停止歌唱。而当瓦斯含量超过一定限度时，虽然人类毫无察觉，金丝雀却早已毒发身亡。在采矿设备相对简陋的条件下，工人们每次下井都会带上一只金丝雀作为“瓦斯检测指标”，以便在危险状况下紧急撤离。
&emsp;&emsp;金丝雀部署的核心思想是在实际运行环境中的一小部分用户或流量上测试新版本的软件，而大部分用户或流量仍然使用旧版本。通过对新版本进行有限范围的实时测试和监控，可以及早发现潜在的问题，并减少对整个系统的冲击。

</details>

###  Deployment - 清理策略

> 您可以通过设置`.spec.revisionHistoryLimit`项来指定`deployment`最多保留多少`revision`历史记录。默认的会保留所有的`revision`；如果将该项设置为`0`，`Deployment`就不允许回退了。

## DaemonSet

&emsp;&emsp;DaemonSet确保全部（或者一些）Node上运行一个Pod的副本。当有Node加入集群时，也会为他们新增一个Pod。当有Node从集群移除时，这些Pod也会被回收。删除DaemonSet将会删除它创建的所有Pod。
+ 使用DaemonSet  的一些典型用法：
  + 运行集群存储daemon，例如在每个Node上运行 glusterd、 ceph
  + 在每个Node上运行日志收集daemon， 例如fluentd、logstash
  + 在每个Node上运行监控daemon， 例 Prometheus Node Exporter、collectdDatadogg代理、NewRelic代理，或Ganglia  gmond

<details>
<summary>DaemonSet</summary>

```yaml showLineNumbers
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: deamonset-demo
  labels:
    app: daemonset-demo
spec:
  selector:
    matchLabels:
      name: deamonset-demo
  template:
    metadata:
      labels:
        name: deamonset-demo
  spec:
    containers:
    - name: daemonset-demo-container
    image: wangyanglinux/myapp:v1.0
```

</details>

## Job
### 特性

> `Job`负责批处理任务，即仅执行一次的任务，它保证批处理任务的一个或多个`Pod`成功结束特殊说明
>
> + `spec.template` 格式同 `Pod`
> + `RestartPolicy` 仅支持 `Never` 或 `OnFailure`
> + 单个 `Pod` 时，默认 `Pod` 成功运行后 `Job` 即结束
> + `.spec.completions` 标志 `Job` 结束需要成功运行的 `Pod` 个数，默认为 `1` 
> + `.spec.parallelism` 标志并行运行的 `Pod` 的个数，默认为 `1`
> + `spec.activeDeadlineSeconds` 标志失败 `Pod` 的重试最大时间，超过这个时间不会继续重试 


<details>
<summary>Job</summary>

```yaml showLineNumbers
apiVersion: batch/v1
kind: Job
metadata:
  name: job-demo
spec:
  template:
    metadata:
      name: job-demo-pod
    spec:
      containers:
      - name: job-demo-container
        image: wangyanglinux/tools:maqingpythonv1
      restartPolicy: Never
```

</details>

:::tip
`Job` 负责批处理任务，即仅执行一次的任务，它保证批处理任务的一个或多个 `Pod` 成功结束。
:::

## CronJob
### 特性

> `Cron Job` 管理基于时间的 Job,即：
>
> + 在给定时间点只运行一次
> + 周期性地在给定时间点运行
>
> 使用条件：当前使用的 `Kubernetes` 集群，版本 `>=1.8`(对 `CronJob`) 典型的用法如下所示：
>
> + 在给定的时间点调度 `Job` 运行
> + 创建周期性运行的 `Job`，例如：数据库备份、发送邮件

+ `.spec.schedule`：调度，必需字段，指定任务运行周期，格式同 `Cron`
+ `.spec.jobTemplate`： `Job`模板，必需字段，指定需要运行的任务，格式同 `Job`
+ `.spec.startingDeadlineSeconds` ：启动 `Job` 的期限（秒级别） ，该字段是可选的。如果因为任何原因而错过了被调度的时间，那么错过执行时间的`Job`将被认为是失败的。如果没有指定，则没有期限
+ `.spec.concurrencyPolicy`：并发策略，该字段也是可选的。它指定了如何处理被 `Cron Job` 创建的 `Job` 的并发执行。只允许指定下面策略中的一种：
	+ `Allow` （默认）：允许并发运行 `Job`
	+ `Forbid`：禁止并发运行，如果前一个还没有完成，则直接跳过下一个
	+ `Replace`：取消当前正在运行的 `Job`，用一个新的来替换
		+ 注意，当前策略只能应用于同一个 `Cron Job` 创建的 `Job`。如果存在多个 `Cron Job`，它们创建的 `Job` 之间总是允许并发运行。
+ `.spec.suspend`：挂起，该字段也是可选的。如果设置为`true`，后续所有执行都会被挂起。它对已经开始执行的 `Job` 不起作用。默认值为 `false`
+ `.spec.successfulJobsHistoryLimit` 和 `.spec.failedJobsHistoryLimit`:历史限制，是可选的字段。它们指定了可以保留多少完成和失败的 `Job`。默认情况下，它们分别设置为`3`和`1`。设置限制的值为`0`，相关类型的 `Job` 完成后将不会被保留


<details>
<summary>CronJob</summary>

```yaml showLineNumbers
apiVersion: batch/v1
kind: CronJob
metadata:
  name: cronjob-demo
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: cronjob-demo-container
            image: busybox
            args:
            - /bin/sh
            - -c
            - date; echo Hello from the Kubernetes cluster
          restartPolicy: OnFailure
```

</details>

:::danger
创建`Job`操作应该是幂等的
:::

## StatefulSet

### 特性

+ 稳定的网络访问方式
+ 稳定的存储卷
+ 有序创建，有序删除
