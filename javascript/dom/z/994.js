function showNode(node) {
    console.log("nodeType:" + node.nodeType);
    console.log("nodeName:" + node.nodeName);
    console.log("nodeValue:" + node.nodeValue);
}

// 元素节点
console.log("元素节点");
showNode(document.getElementById("one"));
// 元素节点
// nodeType:1
// nodeName:DIV
// nodeValue:null

// 属性节点
console.log("属性节点");
var a = document.getElementById("one").getAttributeNode("id");
console.log(a);
console.log(typeof a);
showNode(a);
// 属性节点
// one
// string
// nodeType:undefined
// nodeName:undefined
// nodeValue:undefined

// getAttributeNode
// 属性节点
// id=​"one"
// object
// nodeType:2
// nodeName:id
// nodeValue:one


var one = document.getElementById("one").childNodes;
for (var i = 0; i < one.length; i++) {
    showNode(one[i]);
}
// nodeType:3
// nodeName:#text
// nodeValue:
//
// nodeType:1
// nodeName:DIV
// nodeValue:null
//
// nodeType:3
// nodeName:#text
// nodeValue:
//
// nodeType:1
// nodeName:DIV
// nodeValue:null
// nodeType:3
// nodeName:#text
// nodeValue:

// 文本节点
console.log("文本节点");
showNode(document.getElementById("one").childNodes[0]);
showNode(document.getElementsByClassName("btn")[0].childNodes[1]);
// 文本节点
// nodeType:3
// nodeName:#text
// nodeValue:
// nodeType:3
// nodeName:#text
// nodeValue:1

// 注释节点
console.log("注释节点");
showNode(document.getElementsByClassName("btn")[0].childNodes[0]);
// 注释节点
// nodeType:8
// nodeName:#comment
// nodeValue:onebtn1

// 文档节点
console.log("文档节点");
showNode(document);
// 文档节点
// nodeType:9
// nodeName:#document
// nodeValue:null

// 文档类型节点
console.log("文档类型节点");
showNode(document.childNodes[0]);
// 文档类型节点
// nodeType:10
// nodeName:html
// nodeValue:null

// 文档片段节点
console.log("文档片段节点");
var documentFragment = document.createDocumentFragment();
showNode(documentFragment);
// 文档片段节点
// nodeType:11
// nodeName:#document-fragment
// nodeValue:null

// DTD声明节点
console.log("DTD声明节点");


