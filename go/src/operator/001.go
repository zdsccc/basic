// 算术运算符
package main

import "fmt"

func main() {
	var a int = 21
	var b int = 10
	var c int
	c = a + b
	fmt.Printf("加法--- c 的值为：%d \n", c)
	c = a - b
	fmt.Printf("减法--- c 的值为：%d \n", c)
	c = a * b
	fmt.Printf("乘法--- c 的值为：%d \n", c)
	c = a / b
	fmt.Printf("除法--- c 的值为：%d \n", c)
	c = a % b
	fmt.Printf("取余--- c 的值为：%d \n", c)
	a++
	fmt.Printf("自增--- a 的值为：%d \n", a)
	a = 21
	a--
	fmt.Printf("自减--- a 的值为：%d \n", a)
}

// result
/*
加法--- c 的值为：31
减法--- c 的值为：11
乘法--- c 的值为：210
除法--- c 的值为：2
取余--- c 的值为：1
自增--- a 的值为：22
自减--- a 的值为：20
*/
