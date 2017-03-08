## .gitignore无效的处理方法

------

*.gitignore*文件的作用是git在提交的时候忽略掉过滤的文件。

不过如果在仓库初始化的时候没有建立*.gitignore*文件并且已经提交了，之后再建立*.gitignore*是没有效果的。原因是
> *.gitignore*只能作用于 Untracked Files，也就是那些从来没有被 Git 记录过的文件（自添加以后，从未 add 及 commit 过的文件）。

既然知道原因了那就好解决了。一个解决的思路就是删除掉*.gitignore*关于里面所写的文件追踪

```bash
git rm --cache src/script/*min.js
```

这样就会取消掉`script文件里所有匹配min的js文件`。

如果需要删除追踪并将文件删除可执行如下

```bash
git rm -r --cache src/script/*min.js
```

最后提交 + 推送，以后git就不会再追踪此类文件了

当然，最好是在仓库构建之前就定义好*.gitignore*

参考资料：[https://segmentfault.com/q/1010000000430426](https://segmentfault.com/q/1010000000430426)