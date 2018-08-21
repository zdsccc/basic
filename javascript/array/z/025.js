function is_array(o)
{
    return Object.prototype.toString.call(o) == '[object Array]';
}
var ary = [1, 23, 4];
console.log(is_array(ary));


