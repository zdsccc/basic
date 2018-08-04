// 其他运算符

package main

import "fmt"

func main() {
	var a int = 4
	var b int32
	var c float32
	var ptr *int
	fmt.Printf("a 变量类型为：%T \n", a)
	fmt.Printf("b 变量类型为：%T \n", b)
	fmt.Printf("c 变量类型为：%T \n", c)

	ptr = &a /* ptr 包含了 a 变量的地址 */
	fmt.Printf("a 变量的值为：%d \n", a)
	fmt.Printf("*ptr 为 %d \n", *ptr)
}

// result
/*
a 变量类型为：int
b 变量类型为：int32
c 变量类型为：float32
a 变量的值为：4
*ptr 为 4
*/
