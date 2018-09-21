// 创建一个Object对象
var box = new Object();
// 创建一个name属性并赋值
box.name = "Lee";
// 创建一个age属性并赋值
box.age = 100;
// 创建一个run方法并返回值
box.run = function () {
	return this.name + this.age + "。";
}
// 调用box对象的run方法
console.log(box.run());
// Lee100。

// 集中实例化的函数
function createObject (name, age) {
	// 创建一个Object对象
	var obj = new Object();
	// 创建一个name属性并赋值
	obj.name = name;
	// 创建一个age属性并赋值
	obj.age = age;
	// 创建一个run方法并返回值
	obj.run = function () {
		return this.name + this.age + "。";
	}
	return obj;
}
var box1 = createObject("Lee", 100),
	box2 = createObject("Jack", 200);
console.log(box1.run());// Lee100。
console.log(box2.run());// Jack200。

// 构造函数模式
function Box (name, age) {
	this.name = name;
	this.age = age;
	this.run = function () {
		return this.name + this.age + "。";
	}
}
var box3 = new Box("Lee", 100),
	box4 = new Box("Jack", 200);
console.log(box3.run());// Lee100。
console.log(box4 instanceof Box);// true

// 原型方式
// 声明一个构造函数
// function Box () {
// 	// 在原型里添加属性
// 	Box.prototype.name = "Lee";
// 	Box.prototype.age = 100;
// 	// 在原型里添加方法
// 	Box.run = function () {
// 		// 这里this是指Box.prototype
// 		return this.name + this.age + "。";
// 	}
// }

var Person = function (name) {
	this.name = name;
}
Person.prototype.getName = function () {
	// 此处this是指Person.prototype
	return this.name;
}
var shuaige = new Person("zhangdashuai");
console.log(shuaige.getName());// zhangdashuai


function Task (id) {
	this.id = id;
}
Task.prototype.status = "STOPPED";
Task.prototype.execute = function (args) {
	return "execute task_" + this.id + "[" + this.status + "]:" + args;
}
var task1 = new Task(1),
	task2 = new Task(2);
task1.status = "ACTIVE";
task2.status = "STARTING";
console.log(task1.execute("task1"));
console.log(task2.execute("task2"));
// execute task_1[ACTIVE]:task1
// execute task_2[STARTING]:task2

