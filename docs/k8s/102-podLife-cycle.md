# Pod 生命周期

![Pod 生命周期](/img/k8s/podLifeCycle.png)

## initC
+ `init` 容器总是运行到成功完成为止
+ 每个 `init` 容器都必须在下一个 `init` 容器启动之前成功完成
+ 如果 `Pod` 的 `init` 容器失败，`k8s`会不断的重启该 `Pod`，直到 `init` 容器成功为止。但是，如果 `Pod` 对应的 `restartPolicy` 为 `Never`，它不会重新启动
+ `initC` 与应用容器具备不同的镜像，可以把一些危险的工具放置在 `initC` 中，进行使用
+ `initC` 多个之间是线性启动的，所以可以做一些延迟性的操作
+ `initC` 无法定义 `readinessProbe`，其它以外同应用容器定义无异

<details>
<summary>检测 initC 的阻塞性</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
  name: initc-1
  labels:
    app: initc
spec:
  containers:
  - name: myapp-container
    image: wangyanglinux/tools:busybox
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  initContainers:
  - name: init-myservice
    image: wangyanglinux/tools:busybox
    command: ['sh', '-c', 'until nslookup myservice; do echo waiting for myservice; sleep 2; done;']
  - name: init-mydb
    image: wangyanglinux/tools:busybox
    command: ['sh', '-c', 'until nslookup mydb; do echo waiting for mydb; sleep 2; done;']
```

<details>
<summary>唤醒</summary>

```shell showLineNumbers
kubectl create svc clusterip myservice --tcp=80:80
kubectl create svc clusterip mydb --tcp=80:80
```

</details>
</details>


<details>
<summary>检查 initC 的执行成功</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
 name: myapp-pod
 labels:
   app: myapp
spec:
 containers:
 - name: myapp
   image: wangyanglinux/myapp:v1.0
 initContainers:
 - name: randexit
     image: wangyanglinux/tools:randexitv1
   args: ["--exitcode=1"]
```

<details>
<summary>镜像构建</summary>

```yaml showLineNumbers
FROM alpine
ADD ./randexit /root
RUN chmod +x /root/randexit
CMD ["--sleeptime=5"]  
ENTRYPOINT ["/root/randexit"]
```

</details>

<details>
<summary>命令代码</summary>

```golang showLineNumbers
package main

import (
    "flag"
    "fmt"
    "math/rand"
    "os"
    "time"
)

func main() {
    sleepTime := flag.Int("sleeptime", 4, "休眠时间")
    exitcode := flag.Int("exitcode", 2, "返回码")
    flag.Parse()
    sleeptimeDing := *sleepTime
    // 处理休眠逻辑
    for *sleepTime >= 0 {
        time.Sleep(time.Second * 1)
        *sleepTime--
    }
    // 产生随机返回码
    // exitcode 值为 0, 返回码为 0
    // exitcode 值为 1，返回码为 1
    // 否则随机产生返回码
    if *exitcode == 0 {
        fmt.Printf("休眠 %v 秒，返回码为 %v！\n", sleeptimeDing, 0)
        os.Exit(0)
    } else if *exitcode == 1 {
        fmt.Printf("休眠 %v 秒，返回码为 %v！\n", sleeptimeDing, 1)
        os.Exit(1)
    } else {
        rand.Seed(time.Now().UnixNano())
        num := rand.Intn(100)
        if num >= 50 {
            fmt.Printf("休眠 %v 秒，产生的随机数为 %v，大于等于 50 ，返回码为 %v！\n", sleeptimeDing, num, 1)
            os.Exit(1)
        } else {
            fmt.Printf("休眠 %v 秒，产生的随机数为 %v，小于等于 50 ，返回码为 %v！\n", sleeptimeDing, num, 0)
            os.Exit(0)
        }
    }
}
```

</details>

</details>

## 探针
+ 探针是由 `kubelet` 对容器执行的定期诊断。要执行诊断，`kubelet` 调用由容器实现的 `Handler`。有三种类型的处理程序：
    + `ExecAction`：在容器内执行指定命令。如果命令退出时返回码为 `0` 则认为诊断成功。
    + `TCPSocketAction`：对指定端口的容器上的`IP`地址执行`TCP`检查。如果端口打开，则认为诊断成功。
    + `HTTPGetAction`：对指定端口和路径上的`IP`地址执行`HTTP Get`请求。如果响应的状态码大于等于200且小于400，则认为诊断成功。
+ 每次此探测都将获得以下三种结果之一：
    + 成功：容器通过了诊断。
    + 失败：容器未通过诊断。
    + 未知：诊断失败，不采取任何行动。

## 探针分类
+ `startupProbe`: 是否开始检测？
+ `livenessProbe`: 是否存活？
+ `readinessProbe`: 是否准备好提供服务？

## redinessProbe 就绪探针
##### 介绍：k8s通过添加就绪探针，解决尤其是在扩容时保证提供给用户的服务都是可用的。
+ 选项说明
    + `initialDelaySeconds`：容器启动后要等待多少秒后就探针开始工作，单位“秒”，默认是`0`秒，最小值是`0`。
    + `periodSeconds`：执行探测的时间间隔（单位是秒），默认为`10s`，单位“秒”，最小值是`1`。
    + `timeoutSeconds`：探针执行检测请求后，等待响应的超时时间，默认为`1s`，单位“秒”，最小值是`1`。
    + `successThreshold`：探针检测失败后认为成功的最小连接成功次数，默认值为`1`。必须为`1`才能激活和启动。最小值为`1`。
    + `failureThreshold`：探测失败的重试次数，重试一定次数后将认为失败，默认值为`3`，最小值为`1`。

+ 就绪探测
    + 如果 `Pod` 内部的 `container` 不添加就绪探测，默认就绪。如果添加了就绪探测， 只有就绪通过以后，才标记修改为就绪状态。当前 `Pod` 内的所有的 `container` 都就绪，才标记当前 `Pod` 就绪
        + 成功：将当前的 C 标记为就绪
        + 失败：静默
        + 未知：静默

### 就绪探测


<details>
<summary>基于 HTTP Get 方式</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
 name: readiness-httpget-pod
 namespace: default
 labels:
   app: myapp
   env: test
spec:
 containers:
 - name: readiness-httpget-container
   image: wangyanglinux/myapp:v1.0
   imagePullPolicy: IfNotPresent
   readinessProbe:
     httpGet:
       port: 80
       path: /index1.html
     initialDelaySeconds: 1
     periodSeconds: 3
```

</details>

<details>
<summary>基于 Exec 方式</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
 name: readiness-exec-pod
 namespace: default
spec:
 containers:
 - name: readiness-exec-container
   image: wangyanglinux/tools:busybox
   imagePullPolicy: IfNotPresent
   command: ["/bin/sh","-c","touch /tmp/live ; sleep 60; rm -rf /tmp/live;
sleep
3600"]
   readinessProbe:
     exec:
       command: ["test","-e","/tmp/live"]
     initialDelaySeconds: 1
     periodSeconds: 3
```

</details>

<details>
<summary>基于 TCP Check 方式</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
 name: readiness-tcp-pod
spec:
 containers:
 - name: readiness-exec-container
   image: wangyanglinux/myapp:v1.0
   readinessProbe:
     initialDelaySeconds: 5
     timeoutSeconds: 1
     tcpSocket:
       port: 80
```

</details>

## livenessProbe 存活探针
##### 介绍：k8s通过添加存活探针，解决虽然活着但是已经死了的问题。
+ 选项说明
    + `initialDelaySeconds`：容器启动后要等待多少秒后就探针开始工作，单位“秒”，默认是`0`秒，最小值是`0`。
    + `periodSeconds`：执行探测的时间间隔（单位是秒），默认为`10s`，单位“秒”，最小值是`1`。
    + `timeoutSeconds`：探针执行检测请求后，等待响应的超时时间，默认为`1s`，单位“秒”，最小值是`1`。
    + `successThreshold`：探针检测失败后认为成功的最小连接成功次数，默认值为`1`。必须为`1`才能激活和启动。最小值为`1`。
    + `failureThreshold`：探测失败的重试次数，重试一定次数后将认为失败，默认值为`3`，最小值为`1`。

+ 存活探测
    + 如果 `Pod` 内部不指定存活探测，可能会发生容器运行但是无法提供服务的情况
        + 成功：静默
        + 失败：根据重启的策略进行重启的动作
        + 未知：静默
### 存活探测

<details>
<summary>基于 HTTP Get 方式</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
 name: liveness-httpget-pod
 namespace: default
spec:
 containers:
 - name: liveness-httpget-container
   image: wangyanglinux/myapp:v1.0
   imagePullPolicy: IfNotPresent
   ports:
   - name: http
     containerPort: 80
   livenessProbe:
     httpGet:
       port: 80
       path: /index.html
     initialDelaySeconds: 1
     periodSeconds: 3
     timeoutSeconds: 3
```

</details>

<details>
<summary>基于 Exec 方式</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
 name: liveness-exec-pod
 namespace: default
spec:
 containers:
 - name: liveness-exec-container
   image: wangyanglinux/tools:busybox
   imagePullPolicy: IfNotPresent
   command: ["/bin/sh","-c","touch /tmp/live ; sleep 60; rm -rf /tmp/live;
sleep
3600"]
   livenessProbe:
     exec:
       command: ["test","-e","/tmp/live"]
     initialDelaySeconds: 1
     periodSeconds: 3
```

</details>

<details>
<summary>基于 TCP Check 方式</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
 name: liveness-tcp-pod
spec:
 containers:
 - name: liveness-tcp-container
   image: wangyanglinux/myapp:v1.0
   livenessProbe:
     initialDelaySeconds: 5
     timeoutSeconds: 1
     tcpSocket:
       port: 80
```

</details>

## startupProbe 启动探针
##### k8s在1.16版本后增加 startupProbe 探针，主要解决在复杂的程序中 readinessProbe livenessProbe 探针无法更好的判断程序是否启动/是否存活
+ 选项说明
    + `initialDelaySeconds`：容器启动后要等待多少秒后就探针开始工作，单位“秒”，默认是`0`秒，最小值是`0`。
    + `periodSeconds`：执行探测的时间间隔（单位是秒），默认为`10s`，单位“秒”，最小值是`1`。
    + `timeoutSeconds`：探针执行检测请求后，等待响应的超时时间，默认为`1s`，单位“秒”，最小值是`1`。
    + `successThreshold`：探针检测失败后认为成功的最小连接成功次数，默认值为`1`。必须为`1`才能激活和启动。最小值为`1`。
    + `failureThreshold`：探测失败的重试次数，重试一定次数后将认为失败，默认值为`3`，最小值为`1`。

+ 启动探测
    + 保障存活探针在执行的时候不会因为时间设定问题导致无限死亡或者延迟很长的情况
        + 成功：开始允许存活探测 /就绪探测开始执行
        + 失败：静默
        + 未知：静默
### 启动探测

<details>
<summary>基于 HTTP Get 方式</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
 name: startupprobe-1
 namespace: default
spec:
 containers:
 - name: myapp-container
   image: wangyanglinux/myapp:v1.0
   imagePullPolicy: IfNotPresent
   ports:
   - name: http
     containerPort: 80
   readinessProbe:
     httpGet:
       port: 80
       path: /index2.html
     initialDelaySeconds: 1
     periodSeconds: 3
   startupProbe:
      httpGet:
       path: /index1.html
       port: 80
     failureThreshold: 30
     periodSeconds: 10
```
> 应用程序将会有最多 5 分钟 failureThreshold * periodSeconds（30 * 10 = 300s）的时间来完成其启动过程。
</details>


## 钩子
##### Pod hook （钩子）是由Kubernetes管理的kubelet发起的，当容器中的进程启动前或者容器中的进程终止之前运行，这是包含在容器的生命周期之中。可以同时为 Pod 中的所有容器都配置 hook
+ `Hook` 的类型包括两种：
    + `exec`：执行一段命令
    + `HTTP`：发送 `HTTP` 请求

### 钩子

<details>
<summary>执行一段命令</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
 name: lifecycle-exec-pod
spec:
 containers:
 - name: lifecycle-exec-container
   image: wangyanglinux/myapp:v1
   lifecycle:
     postStart:
       exec:
        command: ["/bin/sh", "-c", "echo postStart > /usr/share/message"]
     preStop:
       exec:
        command: ["/bin/sh", "-c", "echo preStop > /usr/share/message"]
```

</details>

<details>
<summary>发送 HTTP 请求</summary>

<details>
<summary>开启一个测试 webServer</summary>

```shell showLineNumbers
docker run -it --rm -p 1234:80 wangyanglinux/myapp:v1.0
```

</details>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
 name: lifecycle-httpget-pod
 labels:
   name: lifecycle-httpget-pod
spec:
 containers:
 - name: lifecycle-httpget-container
   image: wangyanglinux/myapp:v1.0
   ports:
     - containerPort: 80
   lifecycle:
     postStart:
       httpGet:
         host: 192.168.66.11
         path: index.html
         port: 1234
     preStop:
       httpGet:
         host: 192.168.66.11
         path: hostname.html
         port: 1234
```

</details>

## 关于 `preStop` 的延伸话题

:::tip
在 k8s 中，理想的状态是 pod 优雅释放，但是并不是每一个 Pod 都会这么顺利
    + Pod 卡死，处理不了优雅退出的命令或者操作
    + 优雅退出的逻辑有 BUG，陷入死循环
    + 代码问题，导致执行的命令没有效果

> 对于以上问题，`k8s` 的 `Pod` 终止流程中还有一个“最多可以容忍的时间”，即 `grace period`（在pod.spec.terminationGracePeriodSeconds 字段定义)，这个值默认是30秒，当我们执行 `kubectl delete`的时候也可以通过 `——grace—period` 参数显示指定一个优雅退出时间来覆盖 `Pod` 中的配置，如果我们配置的 `grace period` 超过时间之后，`k8s` 就只能选择强制 `kill Pod`。值得注意的是，这与`preStop Hook`和 `SIGTERM` 信号并行发生。`k8s` 不会等待 `preStop Hook` 完成。如果你的应用程序完成关闭并在`terminationGracePeriod` 完成之前退出，k8s会立即进入下一步。
:::

