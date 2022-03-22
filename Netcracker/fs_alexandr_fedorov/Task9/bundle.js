/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./mainWP.js":
/*!*******************!*\
  !*** ./mainWP.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _script0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script0 */ \"./script0.js\");\n/* harmony import */ var _script1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script1 */ \"./script1.js\");\n/* harmony import */ var _script2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./script2 */ \"./script2.js\");\n/* harmony import */ var _script3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./script3 */ \"./script3.js\");\n/* harmony import */ var _script4__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./script4 */ \"./script4.js\");\n/* harmony import */ var _script5__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./script5 */ \"./script5.js\");\n/* harmony import */ var _script6__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./script6 */ \"./script6.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://task9/./mainWP.js?");

/***/ }),

/***/ "./script0.js":
/*!********************!*\
  !*** ./script0.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"a\": () => (/* binding */ a),\n/* harmony export */   \"b\": () => (/* binding */ b),\n/* harmony export */   \"c\": () => (/* binding */ c),\n/* harmony export */   \"method\": () => (/* binding */ method)\n/* harmony export */ });\nlet a = 5;\r\nlet b = 4;\r\nlet c;\r\n\r\nfunction method(){\r\n    console.log(`a = ${a}`);\r\n    console.log(`b = ${b}`);\r\n    console.log(\"--------\");\r\n\r\n    c = b;\r\n    b = a;\r\n    a = c;\r\n\r\n    console.log(`a = ${a}`);\r\n    console.log(`b = ${b}`);\r\n    console.log(\"--------\");\r\n\r\n    a += b;\r\n    b = a - b;\r\n    a = a - b;\r\n\r\n    console.log(`a = ${a}`);\r\n    console.log(`b = ${b}`);\r\n}\r\n\n\n//# sourceURL=webpack://task9/./script0.js?");

/***/ }),

/***/ "./script1.js":
/*!********************!*\
  !*** ./script1.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"method1\": () => (/* binding */ method1)\n/* harmony export */ });\nfunction method1(){\r\n    alert('Привет, JavaScript');\r\n}\n\n//# sourceURL=webpack://task9/./script1.js?");

/***/ }),

/***/ "./script2.js":
/*!********************!*\
  !*** ./script2.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"name\": () => (/* binding */ name),\n/* harmony export */   \"age\": () => (/* binding */ age),\n/* harmony export */   \"method2\": () => (/* binding */ method2)\n/* harmony export */ });\nlet name;\r\nlet age;\r\nfunction method2(){\r\n    name = prompt(\"Введите своё имя...\");\r\n    while (true){\r\n        if(!name){\r\n            name = prompt(\"Введите своё имя...\");\r\n        } else break;\r\n    }\r\n    while (true){\r\n        age = prompt(\"Введите свой возраст...\");\r\n        if(age <= 0 || isNaN(age)){\r\n            alert(\"Введите корректный возраст!\");\r\n        } else break;\r\n    }\r\n    name = name[0].toUpperCase() + name.slice(1).toLowerCase();\r\n    alert(`Привет, ${name}! Тебе уже ${age} год/года/лет!`)\r\n}\r\n\n\n//# sourceURL=webpack://task9/./script2.js?");

/***/ }),

/***/ "./script3.js":
/*!********************!*\
  !*** ./script3.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"array\": () => (/* binding */ array),\n/* harmony export */   \"direction\": () => (/* binding */ direction),\n/* harmony export */   \"method3\": () => (/* binding */ method3),\n/* harmony export */   \"fillArray\": () => (/* binding */ fillArray),\n/* harmony export */   \"sortArray\": () => (/* binding */ sortArray),\n/* harmony export */   \"sumOfSquares\": () => (/* binding */ sumOfSquares)\n/* harmony export */ });\nlet array = [];\r\nlet direction;\r\n\r\nfunction method3(){\r\n    while(true){\r\n        direction = prompt(\"Выберите направление сортировки(asc/desc)...\");\r\n        if(direction !== \"asc\" && direction !== \"desc\"){\r\n            alert(\"Выберите корректное направление сортировки!\");\r\n        } else break;\r\n    }\r\n    fillArray();\r\n    alert(`Исходный массив: ${array}`);\r\n    alert(`Отсортированный массив: ${sortArray(array, direction)}` );\r\n    alert(sumOfSquares(array));\r\n}\r\n\r\n\r\nfunction fillArray() {\r\n    const length = 10;\r\n    for(let i = 0; i < length; i++){\r\n        let rand = Math.floor((Math.random() * 100) + 1);\r\n        array.push(rand);\r\n    }\r\n}\r\n\r\nfunction sortArray(array, direction){\r\n    for (let i = 0 ; i < array.length; i++) {\r\n        let current = array[i];\r\n        let j = i - 1;\r\n        switch (direction){\r\n            case \"asc\":{\r\n                while (j >= 0 && array[j] > current) {\r\n                    array[j + 1] = array[j];\r\n                    j--;\r\n                }\r\n                break;\r\n            }\r\n            case \"desc\":{\r\n                while (j >= 0 && array[j] < current) {\r\n                    array[j + 1] = array[j];\r\n                    j--;\r\n                }\r\n                break;\r\n            }\r\n        }\r\n        array[j + 1] = current;\r\n    }\r\n    return array;\r\n}\r\n\r\nfunction sumOfSquares(array){\r\n    return array.filter(elem => elem % 2 !== 0).reduce((sum, elem) => sum + Math.pow(elem, 2), 0);\r\n}\n\n//# sourceURL=webpack://task9/./script3.js?");

/***/ }),

/***/ "./script4.js":
/*!********************!*\
  !*** ./script4.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"method4\": () => (/* binding */ method4)\n/* harmony export */ });\nfunction method4(){\r\n    for(let i = 1; i <= 100; i++){\r\n        setTimeout(() => {\r\n            let fizzBuzz = \"\";\r\n            if(i % 3 === 0){\r\n                fizzBuzz += \"Fizz\"\r\n            }\r\n            if(i % 5 === 0){\r\n                fizzBuzz += \"Buzz\"\r\n            }\r\n            if(fizzBuzz){\r\n                document.write(` ${fizzBuzz}`)\r\n            } else document.write(` ${i}`);\r\n        }, i * 300)\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://task9/./script4.js?");

/***/ }),

/***/ "./script5.js":
/*!********************!*\
  !*** ./script5.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"method5\": () => (/* binding */ method5)\n/* harmony export */ });\nfunction method5(){\r\n    while (true){\r\n        let word = prompt('Напишите слово...');\r\n        let str = word.split('').reverse().join('');\r\n        if (word === str){\r\n            alert(`${word} палиндром!`)\r\n        } else alert(`${word} не палиндром!`)\r\n    }\r\n}\n\n//# sourceURL=webpack://task9/./script5.js?");

/***/ }),

/***/ "./script6.js":
/*!********************!*\
  !*** ./script6.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"guessTheNumber\": () => (/* binding */ guessTheNumber)\n/* harmony export */ });\nfunction guessTheNumber(){\r\n    let count = 0;\r\n    let num;\r\n    let randNum = Math.floor((Math.random() * 1000) + 1);\r\n    while (true){\r\n        num = parseInt(prompt(\"Введите число\"));\r\n        count++;\r\n        while (isNaN(num)){\r\n            num = parseInt(prompt(\"Введите число!\"));\r\n        }\r\n        if(num === randNum){\r\n            if(confirm(`Вы угадали! Количество попыток: ${count}`)){\r\n                guessTheNumber();\r\n            } else return;\r\n        } else if (num > randNum){\r\n            alert(\"Искомое число меньше!\");\r\n        } else {\r\n            alert(\"Искомое число больше!\");\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://task9/./script6.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./mainWP.js");
/******/ 	
/******/ })()
;