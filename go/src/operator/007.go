// 运算符优先级

package main

import "fmt"

func main() {
	var a int = 20
	var b int = 10
	var c int = 15
	var d int = 5
	var e int

	e = (a + b) * c / d // (30 * 15) / 5
	fmt.Printf("表达式 (a + b) * c / d 的值为：%d \n", e)
	e = ((a + b) * c) / d // (30 * 15) / 5
	fmt.Printf("表达式 ((a + b) * c) / d 的值为：%d \n", e)
	e = (a + b) * (c / d) // (30) * (3)
	fmt.Printf("表达式 (a + b) * (c / d) 的值为：%d \n", e)
	e = a + (b*c)/d // 20 + (30)
	fmt.Printf("表达式 a + (b * c) / d 的值为：%d \n", e)
}

// result
/*
表达式 (a + b) * c / d 的值为：90
表达式 ((a + b) * c) / d 的值为：90
表达式 (a + b) * (c / d) 的值为：90
表达式 a + (b * c) / d 的值为：50
*/
