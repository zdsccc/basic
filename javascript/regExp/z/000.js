var str = ' <!-- 注释1 --> <h1 style="color:#00ff00;text-align: center;">ProsperLee <!-- 注释 --> </h1>';
// 去除 HTML 中的注释
document.write(str.replace(/<!--[\w\W\r\n]*?-->/gmi, ''));
// 去除 HTML 标签
document.write(str.replace(/<[^>]+>/g,""));
// 去除 HTML 标签中的属性
document.write(str.replace(/(<[^\s\/>]+)\b[^>]*>/gi,"$1>"));

