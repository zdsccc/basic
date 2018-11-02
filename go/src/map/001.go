package main

import "fmt"

func main() {
	m := make(map[int]string)

	m[1] = "a"
	m[2] = "b"
	m[3] = "c"

	for k, v := range m {
		fmt.Println(k, v)
	}

	fmt.Println("--------------------")

	mm := make(map[int]string)

	mm[1] = "a"
	mm[2] = "b"
	mm[3] = "c"

	for k, v := range mm {
		fmt.Println(k, v)
	}

	fmt.Println("--------------------")

	mmm := make(map[int]string)

	mmm[1] = "a"
	mmm[2] = "b"
	mmm[3] = "c"

	for k, v := range mm {
		fmt.Println(k, v)
	}

	fmt.Println("--------------------")
}

func main10() {
	//map1 := map[string]int{
	//	"one": 1,
	//	"two": 2,
	//}
	//map2 := map1
	//if map1 == map2{
	//}
}

func main9() {
	personSalary := map[string]int{
		"steve": 12000,
		"jamie": 15000,
	}
	personSalary["mike"] = 9000

	fmt.Println("Original person salary", personSalary)

	newPersonSalary := personSalary

	newPersonSalary["mike"] = 18000

	fmt.Println("Person salary changed", personSalary)
}

func main8() {
	personSalary := map[string]int{
		"steve": 12000,
		"jamie": 15000,
	}
	personSalary["mike"] = 9000
	fmt.Println("length is", len(personSalary))
}

func main7() {
	personSalary := map[string]int{
		"steve": 12000,
		"jamie": 15000,
	}
	personSalary["mike"] = 9000

	fmt.Println("map before deletion", personSalary)

	delete(personSalary, "steve")

	fmt.Println("map after deletion ", personSalary)
}

func main6() {
	personSalary := map[string]int{
		"steve": 12000,
		"jamie": 15000,
	}
	personSalary["mike"] = 9000
	fmt.Println("All items of a map")
	for key, value := range personSalary {
		fmt.Printf("personSalary[%s] = %d\n", key, value)
	}
}

func main5() {
	personSalary := map[string]int{
		"steve": 12000,
		"jamie": 15000,
	}
	personSalary["mike"] = 9000
	newEmp := "joe"

	value, ok := personSalary[newEmp]

	if ok == true {
		fmt.Println("Salary of", newEmp, "is", value)
	} else {
		fmt.Println(newEmp, "not found")
	}
}

func main4() {
	personSalary := map[string]int{
		"steve": 12000,
		"jamie": 15000,
	}
	personSalary["mike"] = 9000
	employee := "jamie"
	fmt.Println("Salary of", employee, "is", personSalary[employee])
	fmt.Println("Salary of joe is", personSalary["joe"])
}

func main3() {
	personSalary := map[string]int{
		"steve": 12000,
		"jamie": 15000,
	}
	personSalary["mike"] = 9000
	employee := "jamie"
	fmt.Println("Salary of", employee, "is", personSalary[employee])
}

func main2() {
	personSalary := map[string]int{
		"steve": 12000,
		"jamie": 15000,
	}
	personSalary["mike"] = 9000
	fmt.Println("personSalary map contents:", personSalary)
}

func main1() {
	personSalary := make(map[string]int)
	personSalary["steve"] = 12000
	personSalary["jamie"] = 15000
	personSalary["mike"] = 9000
	fmt.Println("personSalary map contents:", personSalary)
}

func main0() {
	var personSalary map[string]int
	if personSalary == nil {
		fmt.Println("map is nil.Going to make one.")
		personSalary = make(map[string]int)
	}
}
