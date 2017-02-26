### 如何保持fork的项目与原仓库同步

在GitHub上难免会遇到自己喜欢的开源项目，这样我们就会把它fork到我们自己所属账号下参考学习。但是fork下来的项目只能保持当前的状态，原项目有更新了我们fork下来的项目并不会同步更新。

有个解决方法就是配置remote，让它指向原项目。

我们都知道fork就相当于把项目克隆到我们远端账号下，通过`git clone`就可以把我们fork的项目从自己的远端账号下克隆到本地。这样`git origin`默认指向的是我们账号下的远端仓库。

配置一个新的remote：

```
git remote add sourceStream https://github.com/username/source.git
```

如此`git sourceStream`指向的就是source仓库

当我们想要同步原项目的代码时，可以执行如下：

```
git fetch sourceStream
```

这样就能把原仓库获取到本地，然后切换到本地**master**分支进行合并

```
git merge sourceStream/master
```

如此，我们本地的**master**分支就能和原项目的保持一致了