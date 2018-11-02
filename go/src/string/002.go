//package main
//
//import "fmt"
//
//func main(){
//	name := "Hello World"
//	fmt.Println(name)
//}
//

package main

import "fmt"

func printBytes(s string) {
	slen := len(s)
	fmt.Println(slen)
	for i := 0; i < slen; i++ {
		fmt.Printf("%x ", s[i])
	}
}

func printChars(s string) {
	slen := len(s)
	fmt.Println(slen)
	for i := 0; i < slen; i++ {
		fmt.Printf("%c", s[i])
	}
}

func main() {
	// name := "Hello world"
	// 11
	// 48 65 6c 6c 6f 20 77 6f 72 6c 64
	//
	// 11
	// Hello world

	// name := "中华人民共和国"
	// 21
	// e4 b8 ad e5 8d 8e e4 ba ba e6 b0 91 e5 85 b1 e5 92 8c e5 9b bd
	//
	// 21
	// ä¸­åäººæ°å±åå½
	printBytes(name)

	fmt.Println("\r\n")

	printChars(name)
}
