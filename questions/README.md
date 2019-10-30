# questions

1. 写个程序把 entry 转换成如下对象
```js
var entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}

// 要求转换成如下对象
var output = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}
```

2. 写个程序把 entry 转换成如下对象
```js
var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}

// 要求转换成如下对象
var output = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}
```

3. 请写一个函数，完成以下功能
> 输入 '1, 2, 3, 5, 7, 8, 10' 输出 '1~3, 5, 7~8, 10'

4. 考虑到性能问题，如何快速从一个巨大的数组中随机获取部分元素

5. url有三种情况

https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33

匹配elective后的数字输出（写出你认为的最优解法）:
[] || ['800'] || ['800','700']

6. 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

7. 深度优先遍历和广度优先遍历。

8. 模拟实现 new 。

9. Object, Function, Object.prototype, Function.prototype

10. 动态规划

11. 观察者模式和发布订阅模式

12. deepCopy
