window.console = window.console || (function () {
    var c ={};
    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile= c.clear = c.exception = c.trace = c.assert = function(){};
    return c;
})();

var dd_chrome = new Date("2016-08-03 00:00:00");

var dd_ie = new Date("2016/08/03 00:00:00");

alert(dd_chrome);
alert(dd_ie);

console.log(dd_chrome);
console.log(dd_ie);


