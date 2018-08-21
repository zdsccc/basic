Array.prototype.mySlice = function (start, end) {
    // 创建一个变量用来接收返回值
    var newAry = [];
    // 变量接收当前数组的长度
    var len = this.length;
    // 先对参数为undefined的情况进行处理
    start = (start !== undefined) ? start : 0;
    end = (end !== undefined) ? end : len;
    // 对于参数的处理，采用三目运算符，由于在与0判断的时候自动转换为数字再进行判断，所以直接与0比较即可
    start = (start >= 0) ? start : Math.max(0, len + start);
    end = (end >= 0) ? Math.min(end, len) : len + end;
    // 用一个变量接收截取区间的长度
    var size = end - start;
    if (size > 0) {
        // 当区间长度大于0时，实例化一个长度为size的数组，并赋值给newAry
        newAry = new Array(size);
        //遍历数组，将当前数组[start,end)区间上的值依次赋值给newAry
        for(var i = 0; i < size; i++) {
            newAry[i] = this[i + start];
        }
    } else {
        // 当区间长度小于等于0的情况下，直接返回空数组
        return newAry;
    }
    return newAry;
};

