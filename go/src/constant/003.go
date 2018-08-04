package main

import "fmt"

//const (
//	a = iota
//	b = iota
//	c = iota
//)

// 简写方式
const (
	a = iota
	b
	c
)

func main() {
	fmt.Println(a, b, c)
}

// result
// 0 1 2
