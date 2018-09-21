var o = {
    x: 1,
    y: 2,
    '-x': 3,
    '-showX': function () {
        console.log(this.x);
    }
}
// 此访问方式会报异常
// console.log(o.-x);
// Uncaught SyntaxError: Unexpected token -

// 2
console.log(o.y);

// 3 ：读取带-(横杠)名称的属性，只能采用'[ ]'中括号访问方式
console.log(o['-x']);

// 1 ：若方法名称带-(横杠)，执行方式很别扭
o['-showX']();
