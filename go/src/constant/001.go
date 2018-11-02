package main

import (
	"fmt"
	"math"
)

func main() {
	// 允许
	var defaultName = "Sam"

	type myString string
	// 允许
	var customName myString = "Sam"
	// 不允许
	customName = defaultName
}

func main2() {
	fmt.Println("Hello World")
	// 允许
	var a = math.Sqrt(4)
	// 不允许
	const b = math.Sqrt(4)
}

func main1() {
	// 允许
	const a = 55
	// 不允许重新赋值
	// a = 89a
	fmt.Println("a", a)
}

func main0() {
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
