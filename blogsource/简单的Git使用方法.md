## 简单的Git使用方法

------------------

本文只是对Git的基本命令进行记录，并不会做过多的详解，如需要看详细了解，请留意[官方文档](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)

##### 克隆仓库

----

通过如下命令就可以把远程仓库克隆到本地文件夹（本地文件夹已经git init的前提下）

```
git clone https://github.com/username/code.git
```

克隆下来的仓库默认只有**master**分支

#### 分支

----

克隆下来的仓库可以通过`git branch`命令查看本地分支

```
$ git branch
* master
```

使用`git branch -a`命令可以查看仓库的所有分支，包括本地和线上。前面带有*号的为当前分支，有**origin**开头的为线上

```
$ git branch -a
* master
  origin/HEAD -> origin/master
  origin/dev
  origin/master
```

使用`git branch dev`可以在本地创建一个名为**dev**的分支

```
$ git branch dev

$ git branch -a
* master
  dev
  origin/HEAD -> origin/master
  origin/dev
  origin/master
```

使用`git checkout dev`可以切换分支

```
$ git checkout dev
Switched to branch 'dev'
```

使用`git branch -d dev`可以删除**dev**分支，前提是当前分支不能为**dev**

```
$ git branch -d dev
Deleted branch dev (was c706262)
```

使用`git checkout -b dev`可以建立并直接切换到**dev**分支，如果后面再加上远程仓库的分支名就可以创建并复制远程分支到本地

```
$ git checkout -b dev origin/dev
Branch dev set up to track remote branch dev from origin.
Switch to a new branch 'dev'
```

使用`git merge`可以合并分支。如当前在**master**分支，执行`git merge dev`可以将**dev**分支合并到**master**

> 当有同伴一起维护开发同一个分支，如**dev**时，建议不应直接使用`git pull`将本地分支直接同步，应该使用`git fetch origin`与线上仓库同步，然后通过`git merge origin/dev`进行合并

#### 提交上传

----

当你修改了一个文件的时候，可以通过`git status`来查看仓库的状态

```
$ git status
On branch master
nothing to commit, working directory clean
```

出现以上说明当前仓库信息并没有任何修改

```
$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)

    README

nothing added to commit but untracked files present (use "git add" to track)
```

当出现以上，说明**README**文件有修改，所以我们要执行`git add README`，然后通过`git commit -m 'update README'`提交修改，最后通过`git push origin dev`推送到远程分支

> 提交修改使用命令行个人觉得有时会麻烦些，这样可以通过Git Gui简单方便的操作Git的提交和推送