## 网站性能优化项目

####Part 1: 优化 index.html 的 PageSpeed Insights 得分
1. 优化了goole font的加载，使用工具，让goole font的css文件变成异步加载
2. 将css文件压缩并放到index.html文件中
3. 添加了media="print"，使print.css文件在打印时才被访问
4. 添加async，异步解决代码

####Part 2: 优化 pizza.html 的 FPS（每秒帧数）

1.  return newSize;//直接返回新size
2.  重写计算changePizzaSizes的函数
3.  压缩图片大小