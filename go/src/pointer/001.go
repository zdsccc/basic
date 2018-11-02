package main

import "fmt"

func main8() {
	var a int
	var ptr *int
	var pptr **int

	a = 3000

	// take the address of var
	ptr = &a

	// take the address of ptr using address of operator &
	pptr = &ptr

	// take the value using pptr
	fmt.Printf("Value of a = %d\n", a)
	fmt.Printf("Value available at *ptr = %d\n", *ptr)
	fmt.Printf("Value available at **ptr = %d\n", **pptr)
}

func main7() {
	// b := [...]int{109, 110, 111}
	// p := &b
	// p++
}

func modify6(sls []int) {
	sls[0] = 90
}

func main6() {
	a := [3]int{89, 90, 91}
	modify6(a[:])
	fmt.Println(a)
}

func modify5(arr *[3]int) {
	(*arr)[0] = 90
	// 简写
	arr[0] = 55
}

func main5() {
	a := [3]int{89, 90, 91}
	modify5(&a)
	fmt.Println(a)
}

func change(val *int) {
	*val = 55
}

func main4() {
	a := 58
	fmt.Println("value of a before function call is", a)
	b := &a
	change(b)
	fmt.Println("value of a after function call is", a)
}

func main3() {
	b := 255
	a := &b
	fmt.Println("address of b is", a)
	fmt.Println("value of b is", *a)

	*a++
	fmt.Println("new value of b is", b)
}

func main2() {
	b := 255
	a := &b
	fmt.Println("address of b is", a)
	fmt.Println("value of b is", *a)
}

func main1() {
	a := 25
	var b *int
	if b == nil {
		fmt.Println("b is", b)

		b = &a
		fmt.Println("b after initialization is", b)
	}
}

func main0() {
	b := 255
	var a *int = &b
	fmt.Printf("Type of a is %T\n", a)
	fmt.Println("address of b is", a)
}
