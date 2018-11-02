package main

import "fmt"

func number() int {
	num := 15 * 5
	return num
}

func main() {
	// num is not a constant
	switch num := number(); {
	case num < 50:
		fmt.Printf("%d is lesser than 50\n", num)
		fallthrough
	case num < 100:
		fmt.Printf("%d is lesser than 100\n", num)
		fallthrough
	case num < 200:
		fmt.Printf("%d is lesser than 200", num)
	}
}

func main8() {
	num := 75
	// 表达式被忽略了
	switch {
	case num >= 0 && num <= 50:
		fmt.Println("num is greater than 0 and less than 50")
	case num >= 51 && num <= 100:
		fmt.Println("num is greater than 51 and less than 100")
	case num >= 101:
		fmt.Println("num is greater than 100")
	}
}

func main7() {
	letter := "i"
	switch letter {
	// 一个选项，多个表达式
	case "a", "e", "i", "o", "u":
		fmt.Println("vowel")
	default:
		fmt.Println("not a vowel")
	}
}

func main6() {
	switch finger := 8; finger {
	case 1:
		fmt.Println("Thumb")
	case 2:
		fmt.Println("Index")
	case 3:
		fmt.Println("Middle")
	case 4:
		fmt.Println("Ring")
	case 5:
		fmt.Println("Pinky")
	// 默认情况
	default:
		fmt.Println("incorrect finger number")
	}
}

func main5() {
	finger := 4
	switch finger {
	case 1:
		fmt.Println("Thumb")
	case 2:
		fmt.Println("Index")
	case 3:
		fmt.Println("Middle")
	case 4:
		fmt.Println("Ring")
	// 重复项
	// case 4:
	// fmt.Println("Another Ring")
	case 5:
		fmt.Println("Pinky")
	}
}

func main4() {
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
