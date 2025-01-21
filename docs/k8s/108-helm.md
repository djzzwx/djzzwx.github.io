# HELM

## 概念

> 在没使用 `helm` 之前，向 `kubernetes` 部署应用，我们要依次部署 `deployment`、`svc` 等，步骤较繁项。况且随着很多项目微服务化，复杂的应用在容器中部署以及管理显得较为复杂，`helm` 通过打包的方式支持发布的版本管理和控制，很大程度上简化了 `Kubernetes` 应用的部署和管理

> `Helm` 本质就是让K8s的应用管理（`Deployment`，`Service`等）可配置，能<b>动态生成</b>。通过动态生成 `K8s` 资源清单文件（`deployment.yaml`，`service.yaml`）。然后调用 `Kubectl` 自动执行 `K8s` 资源部署

## 重要概念

`Helm` 是官方提供的类似于 `YUM` 的包管理器，是部署环境的流程封装。`Helm` 有两个重要的概念：`chart` 和 `release`
+ `Chart`：是创建一个应用的信息集合，包括各种 `Kubernetes` 对象的配置模板、参数定义、依赖关系、文档说明等。`chart` 是应用部署的自包含逻辑单元。可以将 `chart` 想象成 `apt`、`yum` 中的软件安装包
+ `Release`：是 `chart` 的运行实例，代表了一个正在运行的应用。当 `chart` 被安装到 `Kubernetes` 集群，就生成一个 `release`。`chart` 能够多次安装到同一个集群，每次安装都是一个 `release`
+ `Helm cli`：`helm` 客户端组件，负责和 `kubernetes apiS` 通信
+ `Repository`：用于发布和存储 `Chart` 的仓库

## 组件结构 v2/v3

![Service](/img/k8s/helm-comtents.png)

`Helm v2` 是 `C/S` 架构，主要分为客户端 `helm` 和服务器端 `tiller`。而由于 `RBAC` 等权限控制体系的逐渐完善，多租户和安全的需求日益兴起，`tiller` 变得越来越不安全，社区在权限控制领域遇到了极大的阻得。所以在 `Helm3` 版本中，直接将 `tiller` 这一核心组件移除，`helm` 直接和 `kubernetesAPI` 进行通信。
直接带来的好处如下：
+ `Helm`的架构变的更为简单和灵活
+ 不再需要创建 `ServiceAccount`，直接使用当前环境中的 `kubeconfig` 配置
+ 可以直接和 `kubernetesAPI` 交互，更为安全
+ 不再需要使用 `helm init` 来进行初始化

## Ingress-nginx

### 基于 LVS 的 HTTPS 负载均衡

![Service](/img/k8s/ingress-nginx-lvs-https.png)

### 基于 NGINX 的 HTTPS 负载均衡

![Service](/img/k8s/ingress-nginx-nginx-https.png)

### 基于手动的七层实现

![Service](/img/k8s/ingress-nginx-handle-7.png)

### 基于 Ingress API 的七层实现

![Service](/img/k8s/ingress-nginx-ingress-api-7.png)

### 流量分析

![Service](/img/k8s/ingress-nginx-traffic-analysis.png)

### 架构图

![Service](/img/k8s/ingress-nginx-architecture.png)

### http 代理

<details>
<summary>http 代理</summary>

```yaml showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ingress-httpproxy-www1
spec:
  replicas: 2
  selector:
    matchLabels:
      hostname: www1
  template:
    metadata:
      labels:
        hostname: www1
    spec:
      containers:
      - name: nginx
        image: wangyanglinux/myapp:v1.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: ingress-httpproxy-www1
spec:
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
  selector:
    hostname: www1
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-httpproxy-www1
spec:
  ingressClassName: nginx
  rules:
  - host: www1.xinxianghf.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ingress-httpproxy-www1
            port:
              number: 80
```

</details>

### https 代理

<details>
<summary>https 代理</summary>

```shell showLineNumbers
$ openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=nginxsvc/O=nginxsvc"
$ kubectl create secret tls ingress-nginx-tls  --key tls.key --cert tls.crt
```

```yaml showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ingress-httpproxy-ssl
spec:
  replicas: 2
  selector:
    matchLabels:
      hostname: ssl
  template:
    metadata:
      labels:
        hostname: ssl
    spec:
      containers:
      - name: nginx
        image: wangyanglinux/myapp:v3.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: ingress-httpproxy-ssl
spec:
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
  selector:
    hostname: ssl
--- 
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-httpproxy-ssl
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  rules:
  - host: ssl.xinxianghf.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ingress-httpproxy-ssl
            port:
              number: 80
  tls:
  - hosts:
    - ssl.xinxianghf.com
    secretName: ingress-nginx-tls
```

</details>

### BasicAuth 代理

<details>
<summary>BasicAuth 代理</summary>

```shell showLineNumbers
$ dnf -y install httpd-tools
$ htpasswd -c auth xinxianghf
$ kubectl create secret generic ingress-basic-auth --from-file=auth
```

```yaml showLineNumbers
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-with-auth
  annotations:
    nginx.ingress.kubernetes.io/auth-type: basic
    nginx.ingress.kubernetes.io/auth-secret: ingress-basic-auth
    nginx.ingress.kubernetes.io/auth-realm: 'Authentication Required - xinxianghf'
spec:
  ingressClassName: nginx
  rules:
  - host: auth.xinxianghf.com
    http:
      paths:
      - path: /
        pathType: ImplementationSpecific
        backend:
          service:
            name: ingress-httpproxy-www1
            port:
              number: 80
```

</details>

### 域名重定向

<details>
<summary>域名重定向</summary>

```yaml showLineNumbers
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: redirect.xinxianghf.com
  namespace: default
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/permanent-redirect: https://www.baidu.com
    nginx.ingress.kubernetes.io/permanent-redirect-code: '301'
spec:
  ingressClassName: "nginx"
  rules:   
  - host: redirect.xinxianghf.com
    http:
```

</details>

### Rewrite

<details>
<summary>Rewrite</summary>

```yaml showLineNumbers
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: rew.xinxianghf.com
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  ingressClassName: "nginx"
  rules:
  - host: rew.xinxianghf.com
    http:
      paths:
      - path: /api(/|$)(.*)
        pathType: ImplementationSpecific
        backend:
          service:
            name: www1svc
            port:
              number: 80
```

</details>

### Rewrite 和 Redirect

在 `Ingress` 控制器中，`rewrite` 和 `redirect` 是两种不同的操作，它们的作用和行为有所不同：
+ Rewrite（重写）
    + 作用：重写是指修改请求的路径，但是客户端不会察觉到这个变化，它仅在服务器内部发生。在 `Kubernetes` 中，可以通过 `Ingress` 的注解来配置重写规则
    + 示例：比如你有一个服务部署在 `/v1` 路径下，但是你希望用户访问时不需要输入 `/v1`，那么你可以使用重写将请求从根路径 `/` 重写到 `/1`
+ Redirect（重定向）
    + 作用：重定向是指服务器向客户端发出一个新的 `URL`，让客户端进行新的请求。客户端会收到一个 `HTTP3xx` 状态码，然后根据其中的重定向地址进行新的请求。这意味着客户端会知道发生了重定向，它会发起新的请求
    + 示例：比如你有一个网站的旧地址是 `http://example.com`，但是你希望所有的请求都转发到 `https://example.com`，这时你就可以使用重定向将所有的 `HTTP` 请求重定向到 `HTTPS`
+ 区别：
    + 影响范围：`Rewrite` 只在服务器内部修改请求路径，不会影响到客户端，而 `Redirect` 则会向客户端发送一个新的 `URL`，让客户端发起新的请求
    + 状态码：`Rewrite` 不涉及状态码的改变，而 `Redirect` 会向客户端发送一个重定向的 `HTTP` 状态码（例如 `301` 永久重定向、`302` 临时重定向等)
    + 可见性：`Rewrite` 对于客户端来说是透明的，而 `Redirect` 则会告知客户端发生了重定向

在选择使用 `Rewrite` 还是 `Redirect` 时，需要根据具体的需求来决定。如果你希望在不修改客户端请求的情况下修改路径，那么使用 `Rewrite`；如果你希望客户端知道发生了重定向，并且根据新的 `URL` 进行新的请求，那么使用 `Redirect`。

### 错误代码重定向

<details>
<summary>默认错误后端</summary>

```yaml showLineNumbers
defaultBackend:
  enabled: true
  name: defaultbackend
  image:
    registry: docker.io
    image: wangyanglinux/tools
    tag: "errweb1.0"
  port: 80
```

</details>

<details>
<summary>单独申明错误后端</summary>

```yaml showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: errcode
  name: errcode
spec:
  replicas: 1
  selector:
    matchLabels:
      app: errcode
  template:
    metadata:
      labels:
        app: errcode
    spec:
      containers:
      - image: wangyanglinux/tools:errweb1.0
        name: tools
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: errcode
  name: errcode
spec:
  ports:
  - name: 80-80
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: errcode
  type: ClusterIP
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: errtest
  name: errtest
spec:
  replicas: 1
  selector:
    matchLabels:
      app: errtest
  template:
    metadata:
      labels:
        app: errtest
    spec:
      containers:
      - image: wangyanglinux/myapp:v1.0
        name: tools
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: errtest
  name: errtest
spec:
  ports:
  - name: 80-80
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: errtest
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: err.xinxianghf.com
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/default-backend: 'errcode'
    nginx.ingress.kubernetes.io/custom-http-errors: "404,415"
spec:
  rules:
  - host: err.xinxianghf.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: errtest
            port:
              number: 80
```

</details>

### 匹配请求头

`Ingress annotations` 的 `nginx.ingress.kubernetes.io/server-snippet` 配置。`Snippet` 配置是专门用于一些复杂的 `Nginx` 配置，和 `Nginx` 配置通用，在这里模拟下移动端与电脑端访问同一个域名转发到不同服务。

<details>
<summary>单独申明错误后端</summary>

```yaml showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: snippet
  name: snippet
spec:
  replicas: 1
  selector:
    matchLabels:
      app: snippet
  template:
    metadata:
      labels:
        app: snippet
    spec:
      containers:
      - image: wangyanglinux/myapp:v1.0
        name: tools
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: snippet
  name: snippet
spec:
  ports:
  - name: 80-80
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: snippet
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: snippet.xinxianghf.com
 
 
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/server-snippet: |
      set $agentflag 0;
      if ($http_user_agent ~* "(Android|IPhone)") {
        set $agentflag 1;
      }
      if ($agentflag = 1) {
        return 302 http://www.baidu.com;
      }
spec:
  rules:
  - host: snippet.xinxianghf.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: snippet
            port:
              number: 80
```

</details>

### 配置黑白名单

+ 配置方案
    + `Annotations`：只对指定的 `ingress` 生效
    + `ConfigMap`：全局生效
    + 若是同时配置了 `Annotations` 和 `configmap`，一般都是 `annotations` 生效，`configmap` 不生效，因为 `annotations` 优先级比 `configmap` 高

+ 黑白名单区别
    + 白名单是默认是拒绝所有，只允许一个地址去访问
    + 黑名单是不允许该地址去访问所有

+ 黑白名单配置使用 `configmap` 还是 `annotations`
    + 黑名单可以使用 `ConfigMap` 去配置
    + 白名单建议使用 `Annotations` 去配置

<details>
<summary>黑名单</summary>

1. configmap 添加黑名单  
```shell showLineNumbers
$ kubectl  edit cm ingress-nginx-controller -n ingress
  data:
    allow-snippet-annotations: "true"
    block-cidrs: 192.168.10.12
```

```yaml showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: test
  name: test-deploy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: test
  template:
    metadata:
      labels:
        app: test
    spec:
      containers:
      - image: wangyanglinux/myapp:v1.0
        name: myapp
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: test
  name: test-svc
spec:
  ports:
  - name: 80-80
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: test
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: test.xinxianghf.com
spec:
  rules:
  - host: test.xinxianghf.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: test-svc
            port:
              number: 80
```
2. Annotations 添加黑名单  
  
```yaml showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: black
  name: black-deploy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: black
  template:
    metadata:
      labels:
        app: black
    spec:
      containers:
      - image: wangyanglinux/myapp:v1.0
        name: myapp
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: black
  name: black-svc
spec:
  ports:
  - name: 80-80
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: black
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/server-snippet: |-
      deny 192.168.10.11;
      allow all;
  name: black.xinxianghf.com
spec:
  rules:
  - host: black.xinxianghf.com
    http:
      paths:
      - pathType: Prefix
        backend:
          service:
            name: black-svc
            port:
              number: 80
        path: /
```

</details>

<details>
<summary>白名单</summary>

1. Configmap 设置白名单  

```shell showLineNumbers
$ kubectl  edit cm ingress-nginx-controller -n ingress
  apiVersion: v1
  data:
    allow-snippet-annotations: "true"
    whitelist-source-range: 192.168.10.11
```

```yaml showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: test
  name: test-deploy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: test
  template:
    metadata:
      labels:
        app: test
    spec:
      containers:
      - image: wangyanglinux/myapp:v1.0
        name: myapp
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: test
  name: test-svc
spec:
  ports:
  - name: 80-80
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: test
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: test.xinxianghf.com
spec:
  rules:
  - host: test.xinxianghf.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: test-svc
            port:
              number: 80
```

2. annotations 添加白名单  

```yaml showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: white
  name: white-deploy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: white
  template:
    metadata:
      labels:
        app: white
    spec:
      containers:
      - image: wangyanglinux/myapp:v1.0
        name: myapp
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: white
  name: white-svc
spec:
  ports:
  - name: 80-80
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: white
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/whitelist-source-range: 192.168.10.11
  name: white.xinxianghf.com
spec:
  rules:
  - host: white.xinxianghf.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: white-svc
            port:
              number: 80
```

</details>

### 速率限制

+ 有时候可能需要限制速率以降低后端压力，或者限制单个 `IP` 每秒的访问速率防止攻击。此时可以使用 `Nginx` 的 `rate limit` 进行配置
    + `nginx.ingress.kubernetes.io/limit-rps`：限制每秒的连接，单个 `IP`
    + `ginx.ingress.kubernetes.io/limit-rpm`：限制每分钟的连接，单个 `IP`
    + `nginx.ingress.kubernetes.io/limit-rate`：限制客户端每秒传输的字节数，单位为 `K`，需要开启 `proxy-buffering`
    + `nginx.ingress.kubernetes.io/limit-whitelist`：速率限制白名单


<details>
<summary>基本测试</summary>

```yaml showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: speed
  name: speed-deploy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: speed
  template:
    metadata:
      labels:
        app: speed
    spec:
      containers:
      - image: wangyanglinux/myapp:v1.0
        name: myapp
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: speed
  name: speed-svc
spec:
  ports:
  - name: 80-80
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: speed
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: speed.xinxianghf.com
  namespace: default
spec:
  rules:   
  - host: speed.xinxianghf.com
    http: 
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: speed-svc
            port:
              number: 80
```

```shell showLineNumbers
$ ab -c 10 -n 100 http://speed.xinxianghf.com/ | grep requests
```

```yaml showLineNumbers
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: speed.xinxianghf.com
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/limit-connections: "1"
spec:
  rules:   
  - host: speed.xinxianghf.com
    http: 
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: speed-svc
            port:
              number: 80
```

</details>

### 灰度或金丝雀发布


<details>
<summary>金丝雀部署</summary>

```yaml showLineNumbers title='创建一个v1版本的 ingress'
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: v1
  name: v1-deploy
spec:
  replicas: 10
  selector:
    matchLabels:
      app: v1
  template:
    metadata:
      labels:
        app: v1
    spec:
      containers:
      - image: wangyanglinux/myapp:v1.0
        name: myapp
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: v1
  name: v1-svc
spec:
  ports:
  - name: 80-80
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: v1
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: v1.xinxianghf.com
  namespace: default
spec:
  rules:   
  - host: svc.xinxianghf.com
    http: 
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: v1-svc
            port:
              number: 80
```

```yaml showLineNumbers title='创建一个 v2 版本的 ingress 金丝雀'
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: v2
  name: v1-deploy
spec:
  replicas: 10
  selector:
    matchLabels:
      app: v2
  template:
    metadata:
      labels:
        app: v2
    spec:
      containers:
      - image: wangyanglinux/myapp:v2.0
        name: myapp
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: v2
  name: v2-svc
spec:
  ports:
  - name: 80-80
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: v2
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: v2.xinxianghf.com
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/canary: "true"
    nginx.ingress.kubernetes.io/canary-weight: "10"
spec:
  rules:   
  - host: svc.xinxianghf.com
    http: 
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: v2-svc
            port:
              number: 80
```

```shell showLineNumbers title='测试'
$ for i in {1..100};do curl svc.xinxianghf.com  >> sum;done
$ cat sum | sort | uniq -c
```

</details>

### 开启链路追踪


<details>
<summary>官方示例</summary>

```shell
# https://raw.githubusercontent.com/jaegertracing/jaeger-kubernetes/master/all-in-one/jaeger-all-in-one-template.yml
```

```yaml showLineNumbers
$ kubectl  edit cm ingress-nginx-controller -n ingress
    apiVersion: v1
    data:
      allow-snippet-annotations: "true"
      enable-opentracing: "true"   #开启链路追踪
      jaeger-collector-host: jaeger-agent.default.svc.cluster.local  #链路追踪的svc名称
    kind: ConfigMap
    metadata:
      name: ingress-nginx-controller
      namespace: ingress-nginx
```

</details>