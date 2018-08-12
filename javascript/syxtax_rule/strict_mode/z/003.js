
    x = 3.14;       // 不报错
    myFunction();

    function myFunction() {
        "use strict";
        y = 3.14;   // 报错 (y 未定义)
    }


