package main

import "fmt"

var x, y int

// 因式分解关键字的写法一般用于声明全局变量
var (
	a int
	b bool
)
var c, d int = 1, 2
var e, f = 123, "hello kitty"

// 这种不带声明格式的只能在函数体中出现
// g, h := 123, "baga"
func main() {
	g, h := 567, "yaluodemo"
	// result:
	// 0 0 0 false 1 2 123 hello kitty 567 yaluodemo
	fmt.Println(x, y, a, b, c, d, e, f, g, h)
}
