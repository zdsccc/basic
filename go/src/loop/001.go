package main

import "fmt"

func main() {
	for {
		fmt.Println("Hello World")
	}
}

func main4() {
	for no, i := 10, 1; i <= 10 && no <= 19; i, no = i+1, no+1 {
		fmt.Printf("%d * %d = %d\n", no, i, no*i)
	}
}

func main3() {
	i := 0
	//semicolons are ommitted and only condition is present
	for i <= 10 {
		fmt.Printf("%d ", i)
		i += 2
	}
}

func main2() {
	for i := 1; i <= 10; i++ {
		if i%2 == 0 {
			continue
		}
		fmt.Printf("%d ", i)
	}
}

func main1() {
	for i := 1; i <= 10; i++ {
		if i > 5 {
			// loop is terminated if i > 5
			break
		}
		fmt.Printf("%d ", i)
	}
	fmt.Printf("\nline after for loop")
}

func main0() {
	for i := 1; i <= 10; i++ {
		fmt.Printf(" %d", i)
	}
}
