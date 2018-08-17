var array = ["北京市","上海市","广州市","深圳市"];
var html = "<option>" + array.join("</option><option>")+ "</option>";

console.log(html);
// <option>北京市</option><option>上海市</option><option>广州市</option><option>深圳市</option>

