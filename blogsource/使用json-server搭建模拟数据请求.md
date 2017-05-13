##使用json-server搭建模拟数据请求

在制作前后端分离项目的时候为了避免后端小伙伴没有开发完成接口导致前端小伙伴没有数据可以测试的尴尬，所以前端小伙伴们会使用一些模拟数据，当后端小伙伴开发完成再使用正式的接口数据，这样可以避免掉人等人所造成的时间成本浪费。

市面上其实也有一些API管理系统，但是在本文就不会进行过多的讨论了，介绍一款前端小伙伴能很简单的搭建起REST API模拟数据请求--[json-server](https://github.com/typicode/json-server)

#### 安装

---

```bash
$ npm install -g json-server
```

#### 例子

---

首先新建一个`db.json`文件，用来存放数据

```json
{
	"posts": [
		{ "id": 1, "title": "这里是测试的数据", "author": "我" }
	],
	"comments": [
		{ "id": 1, "body": "一些评论", "postId": 1 }
	],
	"profile": { "name": "我" }
}
```

运行服务

```bash
json-server --watch db.json

// 运行成功后如下提升
\{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/posts
  http://localhost:3000/comments
  http://localhost:3000/profile

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...
```
然后我们就可以到`http://localhost:3000`查看我们运行的服务了。当我们要查询ID为1的post信息时，可以输入`http://localhost:3000/posts/1`，获取到的信息如下：

```json
{
  "id": 1,
  "title": "这里是测试的数据",
  "author": "我"
}
```

在使用请求的时候，以下有几点需要知道：

> - 假如你使用POST，PUT，PATCH或者DELETE请求时，这些请求的操作数据会立刻更新`db.json`里的数据
> - POST这类请求request需要包含参数`Content-Type:application/json`，不然虽然会返回状态200，但是并不会更新数据
> - 当POST数据的时候，ID是会自然增长，可以不需要赋值
> - 

在这里我使用的是`postman`来模拟请求，我给`db.json`添加一条数据：
![enter image description here](http://wyguang.net/blog/wp-content/uploads/2017/05/json-server-1.png)
![enter image description here](http://wyguang.net/blog/wp-content/uploads/2017/05/json-server-2.png)

添加成功后查看`db.json`
```json
{
    "posts": [
        {"id": 1,"title": "这里是测试的数据","author": "我"},
        {"id": 2},
        ……
        {"title": "json-server4444","author": "serve44444r","id": 5}
    ],
    "comments": [
        {"id": 1,"body": "一些评论","postId": 1}
    ],
    "profile": {"name": "我"}
}
```

#### 路由

---

同样我们也可以配置自己的路由，新建`router.json`路由文件

```json
{
  "/api/": "/",
  "/blog/:resource/:id/show": "/:resource/:id",
  "/blog/:category": "/posts?category=:category"
}
```

运行

```bash
json-server db.json --routes router.json
```

这样我们访问如下左边就相当于右边

```
/posts ## /api/posts
/posts/1 ## /blog/posts/1/show
/posts?category=json ## /blog/json
```

#### 定义访问端口

---

如果不想使用`3000`端口，可以通过如下语句修改访问端口号

```bash
json-server --watch db.json --port 3004
```

如此一个简单的`json-server`搭建完毕