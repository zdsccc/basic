package main

import "fmt"

func change(s ...string) {
	s[0] = "Go"
	s = append(s, "playground")
	fmt.Println(s)
}

func change5(s ...string) {
	s[0] = "Go"
}

func main() {
	welcome := []string{"hello", "world"}
	change(welcome...)
	fmt.Println(welcome)
}

func find(num int, nums ...int) {
	fmt.Printf("type of nums is %T\n", nums)

	found := false
	for i, v := range nums {
		if v == num {
			fmt.Println(num, "found at index", i, "in", nums)
			found = true
		}
	}
	if !found {
		fmt.Println(num, "not found in", nums)
	}
	fmt.Printf("\n")
}

func main4() {
	nums := []int{89, 90, 95}
	find(89, nums...)
}

func main3() {
	find(89, 89, 90, 95)
	find(45, 56, 67, 45, 90, 109)
	find(78, 38, 56, 98)
	find(87)
}

func rectProps(length, width float64) (float64, float64) {
	var area = length * width
	var perimeter = (length + width) * 2
	return area, perimeter
}

func main2() {
	area, _ := rectProps1(10.8, 5.6)
	fmt.Printf("Area %f", area)
}

func rectProps1(length, width float64) (area, perimeter float64) {
	area = length * width
	perimeter = (length + width) * 2
	// 不需要明确指定返回值，默认返回 area, perimeter 的值
	return
}

func rectProps0(length, width float64) (float64, float64) {
	var area = length * width
	var perimeter = (length + width) * 2
	return area, perimeter
}

func main1() {
	area, perimeter := rectProps1(10.8, 5.6)
	fmt.Printf("Area %f Perimeter %f", area, perimeter)
}

func calculateBill(price, no int) int {
	var totalPrice = price * no
	return totalPrice
}

func main0() {
	// 定义 price 和 no,默认类型为 int
	price, no := 90, 6
	totalPrice := calculateBill(price, no)
	// 打印到控制台上
	fmt.Println("Total price is", totalPrice)
}
