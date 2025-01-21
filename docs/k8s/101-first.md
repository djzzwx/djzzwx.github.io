# 资源清单（第一个简单Pod）

```yaml showLineNumbers title="first pod"
apiVersion: v1
kind: Pod
metadata:
  name: pod-demo
  namespace: default
  labels:
    app: myapp
spec:
  containers:
    - name: myapp-1
      image: wangyanglinux/myapp:v1
    - name: busybox-1
      image: wangyanglinux/tools:busybox
      command:
        - "/bin/sh"
        - "-c"
        - "sleep 3600"
```