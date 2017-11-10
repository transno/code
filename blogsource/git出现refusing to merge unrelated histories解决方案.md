##git出现refusing to merge unrelated histories解决方案

### 问题重现

在使用git的时候，如果刚开始本地已经有了仓库，但是并没有和远程仓库关联，这时如果直接设置`remote`或者`pull`远程仓库代码，在合并的时候会出现`refusing to merge unrelated histories`提示。

---

### 操作步骤

首先在已有的本地文件夹初始化git：

```
git init
```

然后设置远程仓库地址：

```
git remote add origin http://github.com/your.git
```

拉取远程仓库

```
git fetch origin
```

合并仓库

```
git merge origin/master
fatal: refusing to merge unrelated histories
```

这时就报错了，提示我们没有合并关联的历史记录

---

### 解决方案

在拉取远程仓库的时候使用`--allow-unrelated-histories`就可以了

```
git pull origin master --allow-unrelated-histories
```