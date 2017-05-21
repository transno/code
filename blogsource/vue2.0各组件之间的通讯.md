## vue2.0各组件之间的通讯

Vuejs是最近流行的前端框架之一，由于我比较喜欢它的语法，并且也有双向绑定，组件化的特点，在日常开发中会作为我首选的框架。既然是双向绑定，就会涉及到数据的通讯，本文讨论的主要是其各组件数据通讯的方法。

### 使用的模板

---

例子使用的是单文件组件的方式，有**father**与**children**两个组件。

**father组件：**

```html
<template>
    <div>
        <div>{{msg}}</div>
        <children></children>
    </div>
</template>

<script>
    import children from './children'
    export default {
        name: 'father',
        components: {
            children
        },
        data () {
            return {
                msg: '这是father组件'
            }
        }
    }
</script>
```

**children组件：**

```html
<template>
    <div>
        <div>{{msg}}</div>
    </div>
</template>

<script>
    export default {
        name: 'children',
        data () {
            return {
                msg: '这是children组件'
            }
        }
    }
</script>
```

### 子组件获取父组件的值

---

子组件获取父组件的值需要在父组件的子组件里挂载一个事件并绑定需要传递的值，上面的父组件模板语句有变化：

```
<template>
    <div>
        <div>{{msg}}</div>
        <children :val="fathermsg"></children>
    </div>
</template>

<script>
    import children from './children'
    export default {
        name: 'father',
        components: {
            children
        },
        data () {
            return {
                msg: '这是father组件',
                fathermsg: '这里是father的值'
            }
        }
    }
</script>
```

子组件需要使用`props`，子组件语句将变成：

```
<template>
    <div>
        <div>{{msg}}</div>
        <div>{{val}}</div>
    </div>
</template>

<script>
    export default {
        name: 'children',
        props: ['val'],
        data () {
            return {
                msg: '这是children组件'
            }
        }
    }
</script>
```

这样子组件通过输出`val`值就能获取到父组件`fathermsg`的值了。

更多的`props`使用方法请参考[官网](https://vuejs.org/v2/guide/components.html#Props)

### 父组件调用子组件

---

该方法不仅可以父组件调用子组件的值，还包括方法。vue2.0使用了`ref`可以获取到子组件的值或者方法，[参考](https://vuejs.org/v2/guide/components.html#Child-Component-Refs)。

**父组件文件：**

```
<template>
    <div>
        <div>{{msg}}</div>
        <children :val="fathermsg" ref="children"></children>
        <button @click="getChildMethods">调用子组件</button>
        <button @click="getChildMsg">获取子组件值</button>
        <div>{{getChildrenMsg}}</div>
    </div>
</template>

<script>
    import children from './children'
    export default {
        name: 'father',
        components: {
            children
        },
        data () {
            return {
                msg: '这是father组件',
                fathermsg: '这里是father的值',
                getChildrenMsg: ''
            }
        },
        methods: {
            getChildMethods () {
                this.$refs.children.useChildren();
            },
            getChildMsg () {
                this.getChildrenMsg = this.$refs.children.childrenMsg;
            }
        }
    }
</script>
<style scoped>
    div {
        color: blue;
    }
</style>
```

**子组件文件：**

```
<template>
    <div>
        <div>{{msg}}</div>
        <div>{{val}}</div>
    </div>
</template>

<script>
    export default {
        name: 'children',
        props: ['val'],
        data () {
            return {
                msg: '这是children组件',
                childrenMsg: '这里是子组件获取值'
            }
        },
        methods: {
            useChildren () {
                alert('这里是子组件方法！');
            }
        }
    }
</script>
<style scoped>
    div {
        color: red;
    }
</style>

```

### 子组件调用父组件方法

---

子组件调用父组件方法需要使用`$emit`发送通知父组件需要使用方法，需要父组件中的子组件绑定`$emit`定义的方法，绑定的值就是父组件的方法，或许有点绕，看看代码就清楚了

**父组件：**

```
<template>
    <div>
        <div>{{msg}}</div>
        <!--绑定emit通知的方法-->
        <children :val="fathermsg" ref="children" @update="updateVal"></children>
        <div>{{faterVal}}</div>
        <button @click="getChildMethods">调用子组件</button>
        <button @click="getChildMsg">获取子组件值</button>
        <div>{{getChildrenMsg}}</div>
    </div>
</template>

<script>
    import children from './children'
    export default {
        name: 'father',
        components: {
            children
        },
        data () {
            return {
                msg: '这是father组件',
                fathermsg: '这里是father传给子组件的值',
                getChildrenMsg: '',
                faterVal: '这里是需要通过子组件来改变的值'
            }
        },
        methods: {
            getChildMethods () {
                this.$refs.children.useChildren();
            },
            getChildMsg () {
                this.getChildrenMsg = this.$refs.children.childrenMsg;
            },
            updateVal () {
                this.faterVal = '子组件的updateFatherVal方法改变了我的值！';
            }
        }
    }
</script>
<style scoped>
    div {
        color: blue;
    }
</style>

```

**子组件：**

```
<template>
    <div>
        <div>{{msg}}</div>
        <div>{{val}}</div>
        <button @click="updateFatherVal">这里是子组件的Button</button>
    </div>
</template>

<script>
    export default {
        name: 'children',
        props: ['val'],
        data () {
            return {
                msg: '这是children组件',
                childrenMsg: '这里是子组件获取值'
            }
        },
        methods: {
            useChildren () {
                alert('这里是子组件方法！');
            },
            updateFatherVal () {
                // 这里的update对应的是父组件中子组件绑定的方法
                this.$emit('update');
            }
        }
    }
</script>
<style scoped>
    div {
        color: red;
    }
</style>

```
