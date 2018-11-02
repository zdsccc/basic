package main

import (
	"fmt"
	"reflect"
)

func main() {
	var x int32 = 20
	fmt.Println("type:", reflect.TypeOf(x))
}

func main7() {
	cars := []string{"Ferrari", "Honda", "Ford"}

	// capacity of cars is 3
	fmt.Println("cars:", cars, "has old length", len(cars), "and capacity", cap(cars))

	cars = append(cars, "Toyota")

	// capacity of cars is doubled to 6
	fmt.Println("cars:", cars, "has new length", len(cars), "and capacity", cap(cars))
}

func main6() {
	i := make([]int, 5, 5)
	fmt.Println(i)
	// [0 0 0 0 0]

	i = make([]int, 5)
	fmt.Println(i)
	// [0 0 0 0 0]

	// 暂时还不是很理解
	i = make([]int, 5, 8)
	fmt.Println(i)
	// [0 0 0 0 0]
}

func main5() {
	fruitarray := [...]string{"apple", "orange", "grape", "mango", "water melon", "pine apple", "chikoo"}
	fruitslice := fruitarray[1:3]
	fmt.Printf("length of slice %d capacity %d\n", len(fruitslice), cap(fruitslice))
	// length of slice 2 capacity 6

	// re-slicing fruitslice till its capacity
	fruitslice = fruitslice[:cap(fruitslice)]
	fmt.Println("After re-slicing length is", len(fruitslice), "and capacity is", cap(fruitslice))
}

func main4() {
	fruitarray := [...]string{"apple", "orange", "grape", "mango", "water melon", "pine apple", "chikoo"}
	fruitslice := fruitarray[1:3]
	fmt.Printf("length of slice %d capacity %d", len(fruitslice), cap(fruitslice))
	// length of slice 2 capacity 6
}

func main3() {
	numa := [3]int{78, 79, 80}
	// create a slice which contains all elements of the array
	nums1 := numa[:]
	nums2 := numa[:]
	fmt.Println("array before change 1", numa)
	nums1[0] = 100
	fmt.Println("array after modification to slice nums1", numa)
	nums2[1] = 101
	fmt.Println("array after modification to slice nums2", numa)
}

func main2() {
	darr := [...]int{57, 89, 90, 82, 100, 78, 67, 69, 59}
	dslice := darr[2:5]
	fmt.Println("array before", darr)
	for i := range dslice {
		dslice[i]++
	}
	fmt.Println("array after ", darr)
}

func main1() {
	// creates an array and returns a slice reference
	c := []int{6, 7, 8}
	fmt.Println(c)
	// [6 7 8]
}

func main0() {
	a := [...]int{76, 77, 78, 79, 80}
	// create a slice from a[1] to a[3]
	var b []int = a[1:4]
	fmt.Println(b)
	// [77 78 79]
}
