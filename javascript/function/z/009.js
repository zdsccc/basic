function foo(a, b) {
    console.log(arguments.length)
}
foo(1, 2, 3);  // 3
console.log(foo.length);    // 2

