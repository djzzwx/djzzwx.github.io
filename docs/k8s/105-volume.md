# Volume 存储

## 分类

+ 元数据
    + `configMap`：用于保存配置数据（明文）
    + `Secret`：用于保存敏感性数据（编码）
    + `DownwardAPI`：容器在运行时从 `KubernetesAPI` 服务器获取有关它们自身的信息
+ 真实数据
    + `Volume`：用于存储临时或者持久性数据
    + `PersistentVolume`：申请制的持久化存储

##  configMap

> 配置信息的保存方式

### 定义

> `ConfigMap` 功能在 `Kubernetes1.2` 版本中引入，许多应用程序会从配置文件、命令行参数或环境变量中读取配置信息。`ConfigMapAPI` 给我们提供了向容器中注入配置信息的机制，`ConfigMap` 可以被用来保存单个属性，也可以用来保存整个配置文件或者 `JSON` 二进制等对象。


```shell title='创建configMap'
# configmap 名称=game-config 数据来源文件=ex.file
kubectl create configmap game-config --from-file=ex.file

kubectl create configmap literal-config --from-literal=name=dave --from-literal=passwd=pass
```

:::tip
+ `-from-file` 要求
  + 文件内部必须是一行一对的 `k=v`，可以在使用的时候注入 `pod` 内部变成环境变量
    + 1.txt
      + `name=zhangsan`
      + `passwd=123`
  + 文件内部不是一行一对的 `k=v`
    + 2.txt
      + `hahaha`
:::


<details>
<summary>configMap使用-ENV</summary>

```yaml showLineNumbers
apiVersion: v1
kind: ConfigMap
metadata:
  name: literal-config
  namespace: default
data:
  name: dave
  password: pass
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: env-config
  namespace: default
data:
  log_level: INFO
---
apiVersion: v1
kind: Pod
metadata:
  name: cm-env-pod
spec:
  containers:
  - name: myapp-container
    image: wangyanglinux/myapp:v1.0
    command: [ "/bin/sh", "-c", "env" ]
    env:
    - name: USERNAME
      valueFrom:
        configMapKeyRef:
          name: literal-config
          key: name
    - name: PASSWORD
      valueFrom:
        configMapKeyRef:
          name: literal-config
          key: password
    envFrom:
    - configMapRef:
        name: env-config
  restartPolicy: Never
```

</details>

<details>
<summary>configMap使用-Command</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
  name: cm-command-pod
spec:
  containers:
    - name: myapp-container
      image: wangyanglinux/myapp:v1.0
      command: [ "/bin/sh", "-c", "echo $(USERNAME) $(PASSWORD)" ]
      env:
        - name: USERNAME
          valueFrom:
            configMapKeyRef:
              name: literal-config
              key: name
        - name: PASSWORD
          valueFrom:
            configMapKeyRef:
              name: literal-config
              key: password
  restartPolicy: Never
```

</details>

### 热更新

<details>
<summary>configMap使用-hotUpdate</summary>

```shell showLineNumbers
[root@k8s-master01 test]# cat default.conf 
server {
    listen 80 default_server;
    server_name example.com www.example.com;
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
[root@k8s-master01 test]# kubectl  create cm default-nginx --from-file=default.conf
```

```yaml showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: hotupdate-deploy
  name: hotupdate-deploy
spec:
  replicas: 5
  selector:
    matchLabels:
      app: hotupdate-deploy
  template:
    metadata:
      labels:
        app: hotupdate-deploy
    spec:
      containers:
      - image: wangyanglinux/myapp:v1.0
        name: nginx
        volumeMounts:
        - name: config-volume
          mountPath: /etc/nginx/conf.d/
      volumes:
        - name: config-volume
          configMap:
            name: default-nginx
```

</details>

> 更新 `ConfigMap` 日前并不会触发相关 `Pod` 的滚动更新，可以通过修改 `podannotations` 的方式强制触发滚动更新
```shell
kubectl patch deployment nginx-test --patch '{"spec"：{"template": {"metadata": {"annotations": {"version/config"："666666667777"}}}}}'
```
> + 更新 `ConfigMap` 后：
>   + 使用该 `ConfigMap` 挂载的 `Env` 不会同步更新
>   + 使用该 `ConfigMap` 挂载的 `Volume` 中的数据需要一段时间（实测大概 `10` 秒）才能同步更新

:::tip
`Kubernetes` 给不可变的 `ConfigMap` 和 `Secret` 提供了一种可选配置，可以设置各个 `Secret` 和 `ConfigMap` 为不可变的。对于大量使用 `configmap` 的集群（至少有成千上万各不相同的 `configmap` 供 `Pod` 挂载），禁止变更它们的数据有下列好处：
  + `configmap.immutable`
    + 防止意外（或非预期的）更新导致应用程序中断
    + 通过将configmap标记为不可变来关闭kube-apiserver对其的监视，从而显著降低kube-apiserver的负载，提升集群性能
:::

##  Secret

> 编码而来的安全

### 定义

`Secret` 对象类型用来保存敏感信息，例如密码、OAuth令牌和SSH密钥。将这些信息放在 `secret` 中比放在 `Pod` 的定义或者容器镜像中来说更加安全和灵活。

### 特性

+ `Kubernetes` 通过仅仅将 `Secret` 分发到需要访问 `Secret` 的 `Pod` 所在的机器节点来保障其安全性
+ `Secret` 只会存储在节点的内存中，永不写入物理存储，这样从节点删除 `secret` 时就不需要擦除磁盘数据
+ 从 `Kubernetes1.7` 版本开始，`etcd` 会以加密形式存储 `Secret`，一定程度的保证了 `Secret` 安全性

### 类型

| 内置类型      | 用法 |
| ----------- | ----------- |
| Opaque      | 用户定义的任意数据       |
| kubernetes.io/service-account-token   | 服务账号令牌        |
| kubernetes.io/dockercfg      | ~/.dockercfg文件的序列化形式       |
| kubernetes.io/dockerconfigjson      | ~/.docker/config.json文件的序列化形式       |
| kubernetes.io/basic-auth      | 用于基本身份认证的凭据       |
| kubernetes.io/ssh-auth      | 用于SSH身份认证的凭据       |
| kubernetes.io/tls      | 用于TLS客户端或者服务器端的数据       |
| bootstrap.kubernetes.io/token      | 启动引导令牌数据       |

#### Opaque

##### 概念

当 `Secret` 配置文件中未作显式设定时，默认的 `Secret` 类型是 `Opaque`。  当你使用 `kubectl` 来创建一个 `Secret` 时，你会使用 `generic` 子命令来标明要创建的是一个 `Opaque` 类型 `Secret`。

<details>
<summary>Opaque Secret</summary>

```shell showLineNumbers
$ echo -n "admin" | base64
YWRtaW4=
$ echo -n "1f2d1e2e67df" | base64
MWYyZDFlMmU2N2Rm
```

```yaml showLineNumbers
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
data:
  password: MWYyZDFlMmU2N2Rm
  username: YWRtaW4=
```

</details>
 
#### Opaque ENV

<details>
<summary>Opaque Secret ENV</summary>

```yaml showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: opaque-secret-env
  name: opaque-secret-env-deploy
spec:
  replicas: 5
  selector:
    matchLabels:
      app: op-se-env-pod
  template:
    metadata:
      labels:
        app: op-se-env-pod
    spec:
      containers:
      - image: wangyanglinux/myapp:v1.0
        name: myapp-continaer
        ports:
        - containerPort: 80
        env:
        - name: TEST_USER
          valueFrom:
            secretKeyRef:
              name: mysecret
              key: username
        - name: TEST_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysecret
              key: password
```

</details>
 
#### Opaque Volumn

<details>
<summary>Opaque Secret Volumn</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
  labels:
    name: secret-volume
  name: secret-volume-pod
spec:
  volumes:
  - name: volumes12
    secret:
      secretName: mysecret
  containers:
  - image: wangyanglinux/myapp:v1.0
    name: myapp-container
    volumeMounts:
    - name: volumes12
      mountPath: "/data"
```

```yaml showLineNumbers
volumes:
  - name: volumes12
    secret:
      secretName: mysecret
      # 二进制的八进制转换
      defaultMode: 256
      
  volumes:
  - name: volumes12
    secret:
      secretName: mysecret
      items:
      - key: username
        path: my-group/my-username
```

</details>
 
#### Opaque Volumn 热更新


> 当已经存储于卷中被使用的 `Secret` 被更新时，被映射的键也将终将被更新。组件 `kubelet` 在周期性同步时检查被挂载的 `Secret` 是不是最新的。但是，它会使用其本地缓存的数值作为 `Secret` 的当前值。使用 `Secret` 作为子路径卷挂载的容器不会收到 `Secret` 更新。

:::tip
`Kubernetes` 给不可变的 `ConfigMap` 和 `Secret` 提供了一种可选配置，可以设置各个 `Secret` 和 `ConfigMap` 为不可变的。对于大量使用 `configmap` 的集群（至少有成千上万各不相同的 `configmap` 供 `Pod` 挂载），禁止变更它们的数据有下列好处：
  + `Secret.immutable`
    + 防止意外（或非预期的）更新导致应用程序中断
    + 通过将configmap标记为不可变来关闭kube-apiserver对其的监视，从而显著降低kube-apiserver的负载，提升集群性能
:::

##  DownwardAPI

> 容器在运行时从 `Kubernetes API` 服务器获取有关它们自身的信息

### 意义

> + `DownwardAPI` 是 `Kubernetes` 中的一个功能，它允许容器在运行时从 `KubernetesAPI` 服务器获取有关它们自身的信息。这些信息可以作为容器内部的环境变量或文件注入到容器中，以便容器可以获取有关其运行环境的各种信息，如 `Pod` 名称、命名空间、标签等
>   + 提供容器元数据
>   + 动态配置
>   + Kubernetes环境集成

#### Downward API env

<details>
<summary>Downward API env</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
  name: downward-api-env-example
spec:
  containers:
  - name: my-container
    image: wangyanglinux/myapp:v1.0
    env:
    - name: POD_NAME
      valueFrom:
        fieldRef:
          fieldPath: metadata.name
    - name: POD_NAMESPACE
      valueFrom:
        fieldRef:
          fieldPath: metadata.namespace
    - name: POD_IP
      valueFrom:
        fieldRef:
          fieldPath: status.podIP
    - name: CPU_REQUEST
      valueFrom:
        resourceFieldRef:
          resource: requests.cpu
    - name: CPU_LIMIT
      valueFrom:
        resourceFieldRef:
          resource: limits.cpu
    - name: MEMORY_REQUEST
      valueFrom:
        resourceFieldRef:
          resource: requests.memory
    - name: MEMORY_LIMIT
      valueFrom:
        resourceFieldRef:
          resource: limits.memory
  restartPolicy: Never
```

</details>
 
#### Downward API volume

<details>
<summary>Downward API volume</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
  name: downward-api-volume-example
spec:
  containers:
  - name: my-container
    image: wangyanglinux/myapp:v1.0
    resources:
      limits:
        cpu: "1"
        memory: "512Mi"
      requests:
        cpu: "0.5"
        memory: "256Mi"
    volumeMounts:
    - name: downward-api-volume
      mountPath: /etc/podinfo
  volumes:
  - name: downward-api-volume
    downwardAPI:
      items:
      - path: "annotations"
        fieldRef:
          fieldPath: metadata.annotations
      - path: "labels"
        fieldRef:
          fieldPath: metadata.labels
      - path: "name"
        fieldRef:
          fieldPath: metadata.name
      - path: "namespace"
        fieldRef:
          fieldPath: metadata.namespace
      - path: "uid"
        fieldRef:
          fieldPath: metadata.uid
      - path: "cpuRequest"
        resourceFieldRef:
          containerName: my-container
          resource: requests.cpu
      - path: "memoryRequest"
        resourceFieldRef:
          containerName: my-container
          resource: requests.memory
      - path: "cpuLimit"
        resourceFieldRef:
          containerName: my-container
          resource: limits.cpu
      - path: "memoryLimit"
        resourceFieldRef:
          containerName: my-container
          resource: limits.memory
  restartPolicy: Never
```

</details>
 
#### `volume` 相较于 `env` 的优势

>> + 会保持热更新的特性
>> + 传递一个容器的资源字段到另一个容器中

### 扩展

`DownwardAPI` 提供了一种简单的方式，将 `pod` 和容器的元数据传递给在它们内部运行的进程。但这种方式其实仅仅可以暴露一个 `pod` 自身的元数据传递给在它们内部运行的进程。但是这种方式其实仅仅可以暴露一个 `pod` 自身的元数据，而且只可以暴露部分元数据。

所以，还有另外一种方式：

![Service](/img/k8s/volume-downwardapi-anthor.png)
 
### Kubernetes API 文档

<details>
<summary>文档开启</summary>

```shell showLineNumbers
kubectl proxy -port=8080

curl localhost: 8080/openapi/v2 > k8s-swagger. json 

docker run
  -rm \ 
  -d \
  -p80:8080\
  -e SWAGGER_JSON=/k8s-swagger. json \
  -v $(pwd)/k8s-swagger.json:/k8s-swagger.json \
  swaggerapi/swagger-ui
```

</details>

## Volume

> 数据的持久化方案

### 存在的意义

容器磁盘上的文件的生命周期是短暂的，这就使得在容器中运行重要应用时会出现一些问题。首先，当容器崩溃时，`kubelet` 会重启它，但是容器中的文件将丢失————容器以干净的状态（镜像最初的状态）重新启动。其次，在 `Pod` 中同时运行多个容器时，这些容器之间通常需要共享文件。`Kubernetes`中的 `Volume` 抽象就很好的解决了这些问题。

+ awsElasticBlockStore   
+ azureDisk   
+ azureFile  
+ cephfs  
+ csi   
+ downwardAPI  
+ emptyDir
+ fc 
+ flocker  
+ gcePersistentDisk  
+ gitRepo  
+ glusterfs   
+ hostPath  
+ iscsi  
+ 1ocal  
+ nfs
+ persistentVolumeclaim  
+ projected  
+ portworxVolume  
+ quobyte  
+ rbd  
+ scaleo   
+ secretstorageos 
+ vsphereolume

### emptyDir

#### 概念

当 `Pod` 被分配给节点时，首先创建 `emptyDir` 卷，并且只要该Pod在该节点上运行，该卷就会存在正如卷的名字所述，它最初是空的。`Pod` 中的容器可以读取和写入 `emptyDir` 卷中的相同文件，尽管该卷可以挂载到每个容器中的相同或不同路径上。当出于任何原因从节点中删除 `Pod` 时，`emptyDir` 中的数据将被永久删除。

容器崩不会从节点中移除 `pod`，因此 `emptyDir` 卷中的数据在容器溃时是安全的。

+ `emptyDir` 的用法有：
  + 暂存空间，例如用于基于磁盘的合并排序、用作长时间计算溃恢复时的检查点
  + web服务器容器提供数据时，保存内容管理器容器提取的文件

<details>
<summary>创建使用</summary>

```yaml showLineNumbers title='disk'
apiVersion: v1
kind: Pod
metadata:
  name: volume-emptydir-disk-pod
  namespace: default
spec:
  containers:
  - name: myapp
    image: wangyanglinux/myapp:v1.0
    ports:
    - containerPort: 80
    volumeMounts:
    - name: logs-volume
      mountPath: /usr/local/nginx/logs
  - name: busybox
    image: wangyanglinux/tools:busybox
    command: ["/bin/sh","-c","touch /logs/access.log && tail -f 
/logs/access.log"]
    volumeMounts:
    - name: logs-volume
      mountPath: /logs
  volumes:
  - name: logs-volume
    emptyDir: {}
```

```yaml showLineNumbers title='memory'
apiVersion: v1
kind: Pod
metadata:
  name: volume-emptydir-mem
  namespace: default
spec:
  containers:
  - name: myapp
    image: wangyanglinux/myapp:v1.0
    ports:
    - containerPort: 80
    resources:
      limits:
        cpu: "1"
        memory: 1024Mi
      requests:
        cpu: "1"
        memory: 1024Mi
    volumeMounts:
    - name: mem-volume
      mountPath: /data
  volumes:
  - name: mem-volume
    emptyDir:
      medium: Memory
      sizeLimit: 500Mi
```

</details>

> 在 `kubelet` 的工作目录（root-dir参数控制），默认为 `/var/1ib/kubelet`，会为每个使用了 `emptyDir：{}`的 `pod` 创建一个目录，格式如 `/var/lib/kubelet/pods/{podid}/volumes/kubernetes.io~empty-dir/`，所有放在 `emptyDir` 中数据，最终都是落在了 `node` 的上述路径中

### hostPath

#### 概念

`hostPath` 卷将主机节点的文件系统中的文件或目录挂载到集群中

+ `hostPath` 用途如下
  + 运行需要访问 `Docker` 内部的容器：使用 `/var/1ib/docker` 的 `hostPath`
  + 在容器中运行 `cAdvisor`；使用 `/dev/cgroups` 的 `hostPath`
  + 允许 `pod` 指定给定的 `hostPath` 是否应该在 `pod` 运行之前存在，是否应该创建，以及它应该以什么形式存在

除了所需的 `path` 属性之外，用户还可以为 `hostPath` 卷指定 `type`

| 值      | 行为 |
| ----------- | ----------- |
|       | 空字符串（默认）用于向后兼容，这意味着在挂载hostPath卷之前不会执行任何检查       |
| DirectoryorCreate   | 如果在给定的路径上没有任何东西存在，那么将根据需要在那里创建一个空目录，权限设置为0755，与 Kubelet 具有相同的组和所有权        |
| Directory      | 给定的路径下必须存在目录       |
| FileorCreate      | 如果在给定的路径上没有任何东西存在，那么会根据需要创建一个空文件，权限设置为0644，与 Kubelet 具有相同的组和所有权       |
| File      | 给定的路径下必须存在文件       |
| Socket      | 给定的路径下必须存在UNIX套接字       |
| CharDevice      | 给定的路径下必须存在字符设备       |
| BlockDevice      | 给定的路径下必须存在块设备       |

:::danger
+ 由于每个节点上的文件都不同，具有相同配置（例如从 `podTemplate` 创建的）的 `pod` 在不同节点上的行为可能会有所不同
+ 当 `Kubernetes` 按照计划添加资源感知调度时，将无法考虑 `hostPath` 使用的资源
+ 在底层主机上创建的文件或目录只能由 `root` 写入。您需要在特权容器中以 `root` 身份运行进程，或修改主机上的文件权限以便写入 `hostPath` 卷
:::

<details>
<summary>hostPath 实验</summary>

```yaml showLineNumbers
apiVersion: v1
kind: Pod
metadata:
  name: hostpath-pod
spec:
  containers:
  - image: wangyanglinux/myapp:v1.0
    name: myapp
    volumeMounts:
    - mountPath: /test-pd
      name: test-volume
  volumes:
  - name: test-volume
    hostPath:
      # directory location on host
      path: /data
      # this field is optional
      type: Directory
```

</details>

## PV/PVC

> 存储中的各司其职

### 关联条件

+ 容量：`PV` 的值不小于 `PVC` 要求，可以大于最好一致
+ 读写策略：完全匹配
  + 单节点读写 - `ReadwriteOnce` - `RWO`
  + 多节点只读 - `ReadOnlyMany` - `ROX`
  + 多节点读写 - `ReadWriteMany` - `RWX`
+ 存储类：`PV` 的类与 `PVC` 的类必须一致，不存在包容降级关系

### 回收策略

+ `Retain`（保留）：手动回收
+ `Recycle`（回收）：基本擦除（`rm-rf/thevolume/*`）
+ `Delete` （删除）：关联的存储资产（例如 `AWS`、 `EBS`、`GCEPD`、`AzureDisk` 和 `OpenStack Cinder`卷）将被删除
当前，只有 `NFS` 和 `HostPath` 支持回收策略。`AWSEBS`、`GCEPD`、`AzureDisk` 和 `Cinder` 卷支持删除策略

### 状态

+ `Available`（可用）一块空闲资源还没有被任何声明所绑定
+ `Bound` （已绑定）－卷已经被声明绑定
+ `Released` （已释放）－声明被删除，但是资源还未被集群重新声明
+ `Failed`（失败）－该卷的自动回收失败

### 保护

+ `PVC` 保护的目的是确保由 `pod` 正在使用的 `PVC` 不会从系统中移除，因为如果被移除的话可能会导致数据去失
+ 注意：当 `pod` 状态为 `Pending` 并且 `pod` 已经分配给节点或 `pod` 为  `Running` 状态时，`PVC` 处于活动状态
+ 当启用 `PVC` 保护功能时，如果用户删除了一个 `pod` 正在使用的 `PVC` ，则该 `PVC` 不会被立即删除。 `PVC` 的删除将被推退，直到 `PVC` 不再被任何 `pod` 使用


<details>
<summary>PV/PVC</summary>

```shell showLineNumbers title='安装 NFS 服务器'
yum install -y nfs-common nfs-utils  rpcbind
mkdir /nfsdata
chmod 666 /nfsdata
chown nfsnobody /nfsdata
cat /etc/exports
    /nfsdata *(rw,no_root_squash,no_all_squash,sync)
systemctl start rpcbind
systemctl start nfs
```

```yaml showLineNumbers title='部署PV'
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfspv1
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Recycle
  storageClassName: nfs
  nfs:
    path: /data/nfs
    server: 10.66.202.11
```

```yaml showLineNumbers title='创建服务并使用 PVC'
apiVersion: v1
kind: Service
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  ports:
  - port: 80
    name: web
  clusterIP: None
  selector:
    app: nginx
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  selector:
    matchLabels:
      app: nginx
  serviceName: "nginx"
  replicas: 3
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: wangyanglinux/myapp:v1.0
        ports:
        - containerPort: 80
          name: web
        volumeMounts:
        - name: www
          mountPath: /usr/local/nginx/html
  volumeClaimTemplates:
  - metadata:
      name: www
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "nfs"
      resources:
        requests:
          storage: 1Gi
```

</details>

## storageClass

> 一种动态的申请存储的机制

### 概念

`Storageclass` 是一种资源对象，用于定义持久卷（`PersistentVolumes`）的动态供给（`Dynamic Provisioning`）策略。`Storageclass` 允许管理员定义不同类型的存储，并指定如何动态创建持久卷以供应用程序使用。这使得 `Kubernetes` 集群中的存储管理更加灵活和自动化。

![Service](/img/k8s/storageclass.png)
