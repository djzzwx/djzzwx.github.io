# Service 暴露服务

## 概述

Kubernetes `Service` 定义了这样一种抽象：一个 `Pod` 的逻辑分组，一种可以访问它们的策略 -- 通常称为微服务。这一组 `Pod` 能被 `Service` 访问到，通常是通过 `Label Selector`。

## 核心迭代

在 `Kubernetes` 集群中，每个 `Node` 运行一个 `kube-proxy` 进程。`kube-proxy` 负责为 `Service` 实现了一种 `VIP`（虚拟 `IP`）的形式

+ 在 `Kubernetes v1.0` 版本，代理完全在 `userspace`。
![Service](/img/k8s/service-userspace.png)
+ 在 `Kubernetes v1.1` 版本，新增了 `iptables` 代理， 但并不是默认的运行模式。
+ 从 `Kubernetes v1.2` 起，默认就是 `iptables` 代理。
![Service](/img/k8s/service-iptables.png)
+ 在 `Kubernetes v1.8.0-beta.0` 中，添加了 `ipvs` 代理。
![Service](/img/k8s/service-ipvs.png)

## 工作模式及使用

### 类型

+ `ClusterIp`：默认类型，自动分配一个仅 `Cluster` 内部可以访问的虚拟IP
+ `NodePort`：在 `clusterIP` 基础上为 `Service` 在每台机器上绑定一个端口，这样就可以通过 `<NodeIP>NodePort` 来访问该服务
+ `LoadBalancer`：在 `NodePort` 的基础上，借助 `cloudprovider` 创建一个外部负载均衡器，并将请求转发到 `<NodeIP>：NodePort`
+ `ExternalName`：把集群外部的服务引入到集群内部来，在集群内部直接使用。没有任何类型代理被创建（这只有 `kubernetes1.7` 或更高版本的 `kube-dns` 才支持）

### ClusterIP

#### 结构

![Service](/img/k8s/service-clusterip-struct.png)

:::tip
+ ipvs 工作模式：
  + NAT
  + DR
  + TUN
:::

+ svc 选中 `Pod` 的逻辑：
  + `pod` 处于就绪状态
  + `pod` 的标签是 `svc` 的集合（同一名字空间下）

+ `svc dns` 域名
    + `svcName.nsName.svc.domainName.` （末尾的 . 代表根域）
              `domainName` `cluster.local.`

+ `svc.spec.internalTrafficPolicy`
  + `Cluster` 集群的内部都可以
  + `Local` 仅集群内部 `pod`

<details>
<summary>ClusterIP</summary>

```yaml showLineNumbers title='创建 myapp-deploy.yaml 文件'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-clusterip-deploy
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      release: stabel
      svc: clusterip
  template:
    metadata:
      labels:
        app: myapp
        release: stabel
        env: test
        svc: clusterip
    spec:
      containers:
      - name: myapp-container
        image: wangyanglinux/myapp:v1.0
        imagePullPolicy: IfNotPresent
        ports:
        - name: http
          containerPort: 80
        # 以下仅为使用 pod 生命周期
        readinessProbe:
          httpGet:
            port: 80
            path: /index1.html
          initialDelaySeconds: 1
          periodSeconds: 3
```

```yaml showLineNumbers title='创建 Service 信息'
apiVersion: v1
kind: Service
metadata:
  name: myapp-clusterip
  namespace: default
spec:
  type: ClusterIP
  selector:
    app: myapp
    release: stabel
    svc: clusterip
  ports:
  - name: http
    port: 80
    targetPort: 80
```
+ 会话保持(IPVS 持久化连接)（https应用）
  + `service.spec.sessionAffinity: ClientIP`

</details>

### NodePort

#### 结构

![Service](/img/k8s/service-nodeport-struct.png)

<details>
<summary>NodePort</summary>

```yaml showLineNumbers title='创建 myapp-deploy.yaml 文件'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-nodeport-deploy
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      release: stabel
      svc: nodeport
  template:
    metadata:
      labels:
        app: myapp
        release: stabel
        env: test
        svc: nodeport
      spec:
        containers:
        - name: myapp-container
          image: wangyanglinux/myapp:v1.0
          imagePullPolicy: IfNotPresent
        ports:
        - name: http
          containerPort: 80
```

```yaml showLineNumbers title='创建 Service 信息'
apiVersion: v1
kind: Service
metadata:
  name: myapp-nodeport
  namespace: default
spec:
  type: NodePort
  selector:
    app: myapp
    release: stabel
    svc: nodeport
  ports:
  - name: http
    port: 80
    targetPort: 80
    nodePort: 30010
```

</details>

### LoadBalancer

#### 结构

![Service](/img/k8s/service-loadbalancer-struct.png)

:::tip
此类型适用于云环境中商家提供的 `LoadBalancer`
:::

### ExternalName

#### 结构

![Service](/img/k8s/service-externalname-struct.png)

> `ExternalName Service` 是 `Service` 的特例，它没有 `selector`，也没有定义任何的端口和 `Endpoint`。相反的，对于运行在集群外部的服务，它通过返回该外部服务的别名这种方式来提供服务。

<details>
<summary>ExternalName</summary>

```yaml showLineNumbers
apiVersion: v1
kind: ExternalName
metadata:
  name: my-service-1
  namespace: default
spec:
  type: ExternalName
  externalName: www.baidu.com
```

</details>

## EndPoints

#### 与 `Service` 和 `Pod` 直接的关联

![Service](/img/k8s/service-endpoints-struct.png)

### 概述

`Kubernetes` 中的 `Service`，它定义了一组 `Pods` 的逻辑集合和个用于访问它们的策略。一个 `Service` 的日标 `Pod` 集合通常是由 `LabelSelector` 来决定的。

`Endpoints` 是一组实际服务的端点集合。一个 `Endpoint` 是一个可被访问的服务端点，即一个状态为 `running` 的 `pod` 的可访问端点。一般 `Pod` 都不是一个独立存在，所以一组 `Pod` 的端点合在一起称为 `EndPoints`。只有被 `ServiceSelector` 匹配选中并且状态为 `Running` 的才会被加入到和 `Service` 同名的 `Endpoints` 中。

+ 关联体系：
  + 自动：配置 `selector`
  + 手动：无配置 `selector`

#### 自动关联体系：配置 `selector`

![Service](/img/k8s/service-endpoints-withselector.png)

#### 手动关联体系：无配置 `selector`

![Service](/img/k8s/service-endpoints-nowithselector.png)

## publishNotReadyAddresses

#### 让未就绪的 `Pod` 也能被 `Service` 捕获

```shell showLineNumbers title='添加 publishNotReadyAddresses: true'
kubectl patch service myapp -p '{"spec":{"publishNotReadyAddresses": true}}'
```