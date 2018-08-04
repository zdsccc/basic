package main

import "fmt"

func main() {
	const LENGTH int = 10
	const WIDTH int = 5
	var area int
	// 多重赋值
	const a, b, c = 1, false, "string"
	area = LENGTH * WIDTH
	fmt.Println("计算出来的面积为：", area)
	fmt.Println()
	fmt.Println(a, b, c)
}

/**
计算出来的面积为： 50

1 false string
*/
