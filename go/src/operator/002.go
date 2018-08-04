// 比较运算符

package main

import "fmt"

func main() {
	var a int = 21
	var b int = 10
	var c bool
	c = (a == b)
	fmt.Printf("表达式 a == b 为：%t \n", c)
	c = (a != b)
	fmt.Printf("表达式 a != b 为：%t \n", c)
	c = (a > b)
	fmt.Printf("表达式 a > b 为：%t \n", c)
	c = (a < b)
	fmt.Printf("表达式 a < b 为：%t \n", c)
	c = (a >= b)
	fmt.Printf("表达式 a >= b 为：%t \n", c)
	c = (a <= b)
	fmt.Printf("表达式 a <= b 为：%t \n", c)
}

// result
/*
表达式 a == b 为：false
表达式 a != b 为：true
表达式 a > b 为：true
表达式 a < b 为：false
表达式 a >= b 为：true
表达式 a <= b 为：false
*/
