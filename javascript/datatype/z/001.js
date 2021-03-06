function isString (o) { //是否字符串
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}
function isNumber (o) { //是否数字
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}
function isBoolean (o) { //是否boolean
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}
function isFunction (o) { //是否函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}
function isNull (o) { //是否为null
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}
function isUndefined (o) { //是否undefined
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}
function isObj (o) { //是否对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}
function isArray (o) { //是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}
function isDate (o) { //是否时间
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}
function isRegExp (o) { //是否正则
    return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}
function isError (o) { //是否错误对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}
function isSymbol (o) { //是否Symbol函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}
function isPromise (o) { //是否Promise对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}
function isSet (o) { //是否Set对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}
function isFalse (o) {
    if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
    return false
}
function isTrue (o) {
    return !this.isFalse(o)
}
console.log(isString("521521"));




