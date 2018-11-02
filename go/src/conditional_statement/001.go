package main

import "fmt"

func main() {
	var x interface{}
	switch i := x.(type) {
	case nil:
		fmt.Printf("x 的类型：%T", i)
	case int:
		fmt.Printf("x 是 int 型")
	case float64:
		fmt.Printf("x 是 float64 型")
	case func(int) float64:
		fmt.Printf("x 是 func(int) 型")
	case bool, string:
		fmt.Printf("x 是 bool 或 string 型")
	default:
		fmt.Printf("未知型")
	}
}

func main3() {
	/*定义局部变量*/
	var a int = 100
	var b int = 200

	/*判断条件*/
	if a == 100 {
		/* if 条件语句为 true 执行 */
		if b == 200 {
			/* if 条件语句为 true 执行 */
			fmt.Printf("a 的值为 100 ， b 的值为 200\n")
		}
	}
	fmt.Printf("a 值为 : %d\n", a)
	fmt.Printf("b 值为 : %d\n", b)
}

func main2() {
	/*定义局部变量*/
	var a int = 10

	/*使用 if 语句判断布尔表达式*/
	if a < 20 {
		/*如果条件为 true 则执行以下语句*/
		fmt.Println("a 小于 20\n")
	} else {
		/*如果条件为 false 则执行以下语句*/
		fmt.Println("a 不小于 20\n")
	}
	fmt.Printf("a 的值为：%d\n", a)
}

func main1() {
	/*定义局部变量*/
	var a int = 10

	/*使用 if 语句判断布尔表达式*/
	if a < 20 {
		/*如果条件为 true 则执行以下语句*/
		fmt.Println("a 小于 20\n")
	}
	fmt.Printf("a 的值为：%d\n", a)
}

func main0() {
	/*定义局部变量*/
	var grade string = "B"
	var marks int = 90

	switch marks {
	case 90:
		grade = "A"
	case 80:
		grade = "B"
	case 50, 60, 70:
		grade = "C"
	default:
		grade = "D"
	}
	switch {
	case grade == "A":
		fmt.Printf("优秀!\n")
	case grade == "B", grade == "C":
		fmt.Printf("良好!\n")
	case grade == "D":
		fmt.Printf("及格!\n")
	case grade == "F":
		fmt.Printf("不及格!\n")
	default:
		fmt.Printf("差\n")
	}
	fmt.Printf("你的等级是%s\n", grade)
}
