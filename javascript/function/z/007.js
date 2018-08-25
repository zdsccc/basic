function add (a, b) {
    console.log(a + b);
}
function sub (a, b) {
    console.log(a - b);
}
add.call(sub, 3, 1);
/*
 * 用 add 来替换 sub
 * add.call(sub, 3, 1) == add(3, 1)
 * 所以运行结果为：4
*/

function Animal() {
    this.name = "Animal";
    this.showName = function () {
        console.log(this.name);
    }
}
function Cat () {
    this.name = "Cat";
}
var animal = new Animal();
var cat = new Cat();
//通过call或apply方法，将原本属于Animal对象的showName()方法交给对象cat来使用了
animal.showName.call(cat, '', '');// Cat
animal.showName.apply(cat, []);// Cat

console.log("-------------------");

function Animal (name) {
    this.name = name;
    this.showName = function () {
        console.log(this.name);
    }
}
function Cat (name) {
    Animal.call(this, name);
}
var cat = new Cat("Black Cat");
cat.showName();// Black Cat

console.log("-------------------");

function Class10 () {
    this.sub = function (a, b) {
        console.log(a - b);
    }
}
function Class11 () {
    this.add = function (a, b) {
        console.log(a + b);
    }
}
function Class2 () {
    Class10.call(this);
    Class11.call(this);
}

var cls = new Class2();

cls.add(3, 5);// 8
cls.sub(10, 8);// 2

