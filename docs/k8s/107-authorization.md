# Authorization 安全机制

## 安全机制说明

> `Kubernetes` 作为一个分布式集群的管理工具，保证集群的安全性是其一个重要的任务。`APIServer` 是集群内部各个组件通信的中介，也是外部控制的入口。所以 `Kubernetes` 自的安全机制基本就是围绕保护 `API Server`来设计的。

## 认证

### 类型

+ `HTTPToken` 认证：通过一个 `Token` 来识别合法用户
    + `HTTPToken` 的认证是用一个很长的特殊编码方式的并且难以被模仿的字符串 `Token` 来表达客户的一种方式。`Token` 是一个很长的很复杂的字符串，每一个 `Token` 对应一个用户名存储在 `API Server` 能访问的文件中。当客户端发起 `API` 调用请求时，需要在 `HTTPHeader` 里放入 `Token` 
+ `HTTPBase` 认证：通过用户名+密码的方式认证
    + 用户名+ ：+密码用 `BASE64` 算法进行编码后的字符串放在 `HTTPRequest` 中的 `Heather Authorization` 域里发送给服务端，服务端收到后进行编码，获取用户名及密码
+ 最严格的 `HTTPS` 证书认证：基于 `CA` 根证书签名的客户端身份认证方式

#### 基于 HTTPS

![Service](/img/k8s/auth-base-on-https.png)

#### 需要认证的节点
+ `Kubenetes` 组件对 `API Server` 的访问：`kubectl`、 `Controller Manager`、 `Scheduler`、`kubelet` 、`kube-proxy`
+ `Kubernetes` 管理的 `Pod` 对容器的访问：`Pod`（`dashborad` 也是以 `Pod` 形式运行）

#### 证书签发模式

+ 手动签发：通过 `k8s` 集群的跟 `CA` 进行签发 `HTTPS` 证书
+ 自动签发：`kubelet` 首次访问 `APIServer` 时，使用 `token` 做认证，通过后，`ControllerManager` 会为 `kubelet` 生成一个证书，以后的访问都是用证书做认证了

#### kubeconfig

+ `kubeconfig` 文件包含集群参数（`CA` 证书、`APIServer` 地址），客户端参数（上面生成的证书和私钥）集群 `context` 信息（集群名称、用户名）。`Kubenetes` 组件通过启动时指定不同的 `kubeconfig` 文件可以切换到不同的集群

#### ServiceAccount

`Pod` 中的容器访间 `APIServer`。因为 `Pod` 的创建、销毁是动态的，所以要为它手动生成证书就不可行了。`Kubenetes` 使用了 `Service Account` 解决 `Pod` 访问 `API Server` 的认证问题

##### ServiceAccount 的组成

`Kubernetes` 设计了一种资源对象叫做 `Secret`,分为两类，一种是用于 `ServiceAccount` 的 `service-account-token`,另一种是用于保存用户自定义保密信息的 `Opaque` [eu'peIk]。`ServiceAccount` 中用到包含三个部分：`Token`、`ca.crt`、`namespace`

+ `token` 是使用 `API Serve`r 私钥签名的 `JWT`。用于访问 `API Server` 时，`Server` 端认证 
+ `ca.crt` 根证书。用于 `Client` 端验证 `API Server` 发送的证书
+ `namespace`,标识这个 `service-account-token` 的作用域名空间

`Json web token` （`JWT`），是为了在网络应用环境间传递声明而执行的一种基于 `JSON` 的开放标准（[（RFC 7519]）.该 `token` 被设计为紧凑且安全的，特别适用于分布式站点的单点登录（`SSO`）场景。`JWT`的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该 `token` 也可直接被用于认证，也可被加密

默认情况下，每个 `namespace` 都会有一个 `ServiceAccount`，如果 `Pod` 在创建时没有指 `ServiceAccount`，就会使用 `Pod` 所属的 `namespace` 的 `ServiceAccount` 
默认挂载目录：`/run/secrets/kubernetes.io/serviceaccount/`

![Service](/img/k8s/auth-service-account.png)

## 鉴权

### 类型

上面认证过程，只是确认通信的双方都确认了对方是可信的，可以相互通信。而鉴权是确定请求方有哪些资源的权限。`APIServer` 日前支持以下几种授权策略（通过 `APIServer` 的启动参数 `--authorization-mode` 设置）
+ `AlwaysDeny`：表示拒绝所有的请求，一般用于测试
+ `AlwaysA11ow`：允许接收所有请求，如果集群不需要授权流程，则可以采用该策略
+ `ABAC`（`Attribute-BasedAccessControl`）：基于属性的访问控制，表示使用用户配置的授权规则对用户请求进行匹配和控制
+ `Webhook`：通过调用外部REST服务对用户进行授权
+ `RBAC`（`Role-Based AccessControl`）：基于角色的访问控制，现行默认规则

### RBAC

#### 特性优势

`RBAC`（`Role-BasedAccessControl`）基于角色的访问控制，在 `Kubernetes1.5` 中引入，现行版本成为默认标准。相对其它访问控制方式，拥有以下优势：
+ 对集群中的资源和非资源均拥有完整的覆盖
+ 整个 `RBAC` 完全由几个 `API` 对象完成，同其它 `API` 对象一样，可以用 `kubectl` 或 `API` 进行操作
+ 可以在运行时进行调整，无需重启 `APIServer`

#### 资源对象

`RBAC` 引入了4个新的顶级资源对象：`Role`、`ClusterRole`、`RoleBinding`、`ClusterRoleBinding`，4种对象类型均可以通过 `kubect` 与 `API` 操作

![Service](/img/k8s/auth-rbac.png)

### ROLE

在 `RBACAPI` 中，`Role` 表示一组规则权限，权限只会增加（累加权限），不存在一个资源一开始就有很多权限而通过 `RBAC` 对其进行减少的操作：`Role` 可以定义在一个 `namespace` 中，如果想要跨 `namespace`则可以创建 `ClusterRole`

### CLUSTERROLE

`ClusterRole` 具有与 `Role` 相同的权限角色控制能力，不同的是 `ClusterRole` 是集群级别的
`ClusterRole` 可以用于：
+ 集群级别的资源控制（例如`node`访问权限）
+ 非资源型`endpoints`（例如`/health`访问）
+ 所有命名空间资源控制（例如`pods`）

### ROLEBINING + ROLE

`RoloBinding` 可以将角色中定义的权限授予用户或用户组，`RoleBinding` 包含一组权限列表（`subjects`），权限列表中包含有不同形式的待授予权限资源类型（`users`，`groups`，Or `service accounts`）；
`RoloBinding` 同样包含对被 `Bind` 的 `Role` 引用；`RoleBinding` 适用于某个命名空间内授权，而 `ClusterRoleBind` 对集群授权。

### ROLEBINING + CLUSTERROLE

`RoleBinding` 同样可以引用 `ClusterRole` 来对当前 `jnamespace` 内用户、用户组或 `ServiceAccount` 进行授权，这种操作允许集群管理员在整个集群内定义一些通用的 `clusterRole`，然后在不同的 `namespace` 使用 `RoleBinding` 来绑定。

### CLUSTERROLEBINING

使用 `ClusterRoleBinding` 可以对整个集群中的所有命名空间资源权限进行授权；以下 `ClusterRoleBinding` 样例展示了授权 `manager` 组内所有用户在全部命名空间中对 `secrets` 进行访问

### Resources

`Kubernetes` 集群内一些资源一般以其名称字符串来表示，这些字符串一般会在 `API` 的 `URL` 地址中出现;
同时某些资源也会包含子资源，例如 `logs` 资源就属于 `pods` 的子资源，`API` 中 `URL` 样例如下
`GET /api/vl/namespaces/{namespace}/pods/{name}/log`
如果要在 `RBAC` 授权模型中控制这些子资源的访问权限，可以通过 `／` 分隔符来实现，以下是一个定义 `pods` 资资源 `1ogs` 访问权限的 `Role` 定义样例
```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1beta1
metedata:
    namespace: default
    name: pod-and-pod-logs-reader
rules:
-   apiGroups: [""]
    resources: ["pods/log"]
    verbs: ["get", "list"]
```

### Subjects

`RoleBinding` 和 `ClusterRoleBinding` 可以将 `Role` 绑定到 `Subjects`；`Subjects` 可以是 `groups`、`users` 或者 `service accounts`
`Subjects` 中 `Users` 使用字符串表示，它可以是一个普通的名字字符串，如 `alice` ：也可以是 `email`格式的邮箱地址，如 `wangyanglinux@163.com`；甚至是一组字符串形式的数字 `ID`。但是 `Users` 的前缀 `system`：是系统保留的，集群管理员应该确保普通用户不会使用这个前格式。
`Groups` 书写格式与 `Users` 相同，都为一个字符串，并且没有特定的格式要求；同样 `system`：前为系统保留

## 准入控制

准入控制是 `APIServer` 的插件集合，通过添加不同的插件，实现额外的准入控制规则。甚至于 `APIServer` 的一些主要的功能都需要通过 `AdmissionControllers` 实现，比如 `ServiceAccount`

### 列举几个插件的功能

+ `NamespaceLifecycle`：防止在不存在的 `namespace` 上创建对象，防止删除系统预置 `namespace`， 删除 `namespace` 时，连带删除它的所有资源对象
+ `LimitRanger`：确保请求的资源不会超过资源所在 `Namespace` 的 `LimitRange` 的限制
+ `ServiceAccount`:  实现了自动化添加 `ServiceAccount`
+ `ResourceQuota`:确保请求的资源不会超过资源的 `ResourceQuota` 限制