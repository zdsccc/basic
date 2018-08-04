// 位运算符

package main

import "fmt"

func main() {
	var a uint = 60 /* 60 = 0011 1100 */
	var b uint = 13 /* 13 = 0000 1101 */
	var c uint = 0

	c = a & b
	fmt.Printf("表达式 a & b 的值为：%d \n", c)

	c = a | b
	fmt.Printf("表达式 a | b 的值为：%d \n", c)

	c = a ^ b
	fmt.Printf("表达式 a ^ b 的值为：%d \n", c)

	c = a << 2
	fmt.Printf("表达式 a << 2 的值为：%d \n", c)

	c = a >> 2
	fmt.Printf("表达式 a >> 2 的值为：%d \n", c)
}

// result
/*
表达式 a & b 的值为：12
表达式 a | b 的值为：61
表达式 a ^ b 的值为：49
表达式 a << 2 的值为：240
表达式 a >> 2 的值为：15
*/
