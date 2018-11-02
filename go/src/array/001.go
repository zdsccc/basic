package main

import "fmt"

func printArray(a [3][2]string) {
	for _, v1 := range a {
		for _, v2 := range v1 {
			fmt.Printf("%s ", v2)
		}
		fmt.Printf("\n")
	}
}

func main7() {
	a := [3][2]string{
		{"lion", "tiger"},
		{"cat", "dog"},
		{"pigeon", "peacock"}, // this comma is necessary. The compiler will complain if you omit this comma
	}
	printArray(a)
	var b [3][2]string
	b[0][0] = "apple"
	b[0][1] = "samsung"
	b[1][0] = "microsoft"
	b[1][1] = "google"
	b[2][0] = "AT&T"
	b[2][1] = "T-Mobile"
	fmt.Printf("\n")
	printArray(b)
}

func main6() {
	a := [...]float64{67.7, 89.8, 21, 78}
	sum := float64(0)
	for i, v := range a {
		// looping from 0 to the length of the array
		fmt.Printf("%d th element of a is %.2f\n", i, v)
		sum += v
	}
	fmt.Println("\nsum of all elements of a is", sum)
}

func main5() {
	a := [...]float64{67.7, 89.8, 21, 78}
	for i := 0; i < len(a); i++ {
		// looping from 0 to the length of the array
		fmt.Printf("%d th element of a is %.2f\n", i, a[i])
	}
}

func main4() {
	a := [...]float64{67.7, 89.8, 21, 78}
	fmt.Println("length of a is : ", len(a))
}

func changeLocal(num [5]int) {
	num[0] = 55
	fmt.Println("inside function: ", num)
}

func main3() {
	num := [...]int{5, 6, 7, 8, 8}
	fmt.Println("before passing to function: ", num)
	// num variable is passed by value
	changeLocal(num)
	fmt.Println("after passing to function: ", num)
}

func main2() {
	a := [...]string{"china", "india", "german", "france"}
	b := a // a copy of a is assigned to b
	b[1] = "usa"
	fmt.Println("a === ", a)
	fmt.Println("b === ", b)
	// a ===  [china india german france]
	// b ===  [china usa german france]
}

func main1() {
	// a := [3]int{5, 78, 8}
	// var b [5] int
	// b = a
}

func main0() {
	a := [...]int{12, 78, 50}
	fmt.Println(a) // [12 78 50]
}
