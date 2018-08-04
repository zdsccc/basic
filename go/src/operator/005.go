// 赋值运算符

package main

import "fmt"

func main() {
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
