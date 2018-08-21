var mergeJsonObject = function (jsonbject1, jsonbject2)
{
    var resultJsonObject = {};
    for (var attr in jsonbject1) {
        resultJsonObject[attr] = jsonbject1[attr];
    }
    for (var attr in jsonbject2) {
        resultJsonObject[attr] = jsonbject2[attr];
    }
    return resultJsonObject;
};

var jsonObj1 = {a : 1};
var jsonObj2 = {b : 2, c : 3, d : 4};

console.log(mergeJsonObject(jsonObj1, jsonObj2));

// result:
// {a : 1, b : 2, c: 3, d : 4};


