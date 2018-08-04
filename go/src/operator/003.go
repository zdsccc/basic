// 逻辑运算符

package main

import "fmt"

func main() {
	var a bool = true
	var b bool = false
	var c bool
	c = (a && b)
	fmt.Printf("表达式 a && b 为：%t \n", c)
	c = (a || b)
	fmt.Printf("表达式 a || b 为：%t \n", c)
	c = (!a)
	fmt.Printf("表达式 !a 为：%t \n", c)
	c = (!b)
	fmt.Printf("表达式 !b 为：%t \n", c)
}

// result
/*
表达式 a && b 为：false
表达式 a || b 为：true
表达式 !a 为：false
表达式 !b 为：true
*/
