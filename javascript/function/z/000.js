function fn (a, b) {
    console.log(this);
    console.log(a);
    console.log(a+b);
}
fn.call(1);
fn.call.call(fn);
fn.call.call.call(fn,1,2);
fn.call.call.call.call(fn,1,2,3);


