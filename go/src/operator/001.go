// 算术运算符
package main

import "fmt"

func main6() {
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

func main5() {
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

func main4() {
	var a int = 21
	var c int
	c = a
	fmt.Printf("c = a 表达式运算后，c 变量的值为：%d \n", c)
	c += a
	fmt.Printf("c += a 表达式运算后，c 变量的值为：%d \n", c)
	c -= a
	fmt.Printf("c -= a 表达式运算后，c 变量的值为：%d \n", c)
	c *= a
	fmt.Printf("c *= a 表达式运算后，c 变量的值为：%d \n", c)
	c /= a
	fmt.Printf("c /= a 表达式运算后，c 变量的值为：%d \n", c)
	c = 200
	c <<= 2
	fmt.Printf("c <<= 2 表达式运算后，c 变量的值为：%d \n", c)
	c >>= 2
	fmt.Printf("c >>= 2 表达式运算后，c 变量的值为：%d \n", c)
	c &= 2
	fmt.Printf("c &= 2 表达式运算后，c 变量的值为：%d \n", c)
	c ^= 2
	fmt.Printf("c ^= 2 表达式运算后，c 变量的值为：%d \n", c)
	c |= 2
	fmt.Printf("c |= 2 表达式运算后，c 变量的值为：%d \n", c)
}

// result
/*
c = a 表达式运算后，c 变量的值为：21
c += a 表达式运算后，c 变量的值为：42
c -= a 表达式运算后，c 变量的值为：21
c *= a 表达式运算后，c 变量的值为：441
c /= a 表达式运算后，c 变量的值为：21
c <<= 2 表达式运算后，c 变量的值为：800
c >>= 2 表达式运算后，c 变量的值为：200
c &= 2 表达式运算后，c 变量的值为：0
c ^= 2 表达式运算后，c 变量的值为：2
c |= 2 表达式运算后，c 变量的值为：2
*/

func main3() {
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

func main2() {
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

func main1() {
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

func main0() {
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
