# 常用命令

## 基础用法

```shell title='查看节点'
kubectl get node
```

```shell title='查看Pod'
kubectl get pod
# -A 获取所有pod = --all-namespaces
# -n 设置名称空间（默认：default）
# -o wide 显示IP地址 显示节点 显示就绪状态 等等扩展信息
# --show-labels 查看标签
# -l 筛选标签，ex：
#     -l app
#     -l app=myapp
# -w 监视
# -o yaml 输出pod的yaml
```

```shell title='进入容器内部'
# -i 交互模式
# -t 打开一个tty终端
# -c 指定当前容器名，-c 可以省略，默认进入唯一的容器内部
# -- 分隔符，指定要执行的命令
kubectl exec -it pod-demo -c myapp-1 -- /bin/bash
```

```shell title='查看日志'
# -c 指定当前容器名
kubectl logs pod-demo -c myapp-1
```

```shell title='查看帮助'
kubectl explain pod.name
```

```shell title='查看pod的详细信息'
kubectl describe pod pod-demo
```

```shell title='删除资源'
kubectl delete pod pod-demo
# 删除当前名字空间里的所有Pod
kubectl delete pod --all

kubectl delete svc myservice # svc 有一个默认的service，如果使用 --all 也会被删除（但是k8s会自动重建他）
kubectl delete rc --all
kubectl delete rs --all
```

```shell title='设置标签'
# 给pod-demo的pod设置version标签
kubectl label pod pod-demo version=v1
# 给pod-demo的pod设置app标签，如果标签已经存在，需要添加 --overwrite
kubectl label pod pod-demo app=myapp --overwrite
```

```shell title='调整RC参数'
kubectl scale rc rc-demo --replicas=5
```

```shell title='自动扩容 / 缩容'
kubectl autoscale deployment deploy-demo --min=10 --max=15 --cpu-percent=80
```

```shell title='声明式与命令式'
# 命令式 - 完全覆盖 / 替换
kubectl replace -f deployment.yaml
# 声明式 - 应用差异
kubectl apply -f deployment.yaml
# 查看差异
kubectl diff -f deployment.yaml
```

```shell title='金丝雀部署'
kubectl patch deployment deployment-demo -p '{"spec": {"strategy": {"rollingUpdate": {"maxSurge": 1, "maxUnavailable": 0))}}'

# rollout pause deploy deployment-demo 滚动暂定
kubectl patch deployment deployment-demo --patch '{"spec": {"template": {"spec":{"containers": [{"name": "deployment-demo-container", "image": "wangyanglinux/myapp: v2.0")]}}})' &&kubectl rollout pause deploy deployment-demo

# rollout resume deploy deployment-demo 恢复滚动更新
kubectl rollout resume deploy deployment-demo

kubectl rollout undo deploy/deployment-demo

kubectl rollout status deployments nginx-deployment

kubectl rollout history deployment/nginx-deployment

# 需要 kubectl create -f deployment.yaml --record 配合
kubectl rollout undo deployment/nginx-deployment -to-revision=2

kubectl rollout pause deployment/nginx-deployment
```

```shell title='生成资源清单'
kubectl create deployment deploy-demo --image=wangyanglinux/myapp:v1.0 --dry-run -o yaml > deploy-demo.yaml.tmp
```

```shell title='创建configMap'
# configmap 名称=game-config 数据来源文件=ex.file
kubectl create configmap game-config --from-file=ex.file

kubectl create configmap game-config literal-config --from-literal=name=dave --from-literal=passwd=pass
```

```shell title='命令补全'
yum install -y bash-completion
source <(kubectl completion bash)
```

```shell title='污点'
# 设置污点
kubectl taint node k8s-master01 computeengine=gpu:NoShedule
# 移除污点
kubectl taint node k8s-master01 computeengine=gpu:NoShedule-
# 移除没有value的污点
kubectl taint node k8s-master01 node-role.kubernetes.io/control-plane=:NoShedule-
```
