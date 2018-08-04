package main

import (
	"fmt"
	"unsafe"
)

const name = "zhong"

func main() {
	fmt.Println(unsafe.Sizeof(name))
}

// result
// 16
