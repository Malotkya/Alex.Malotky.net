/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App/Core/App_Base.ts":
/*!**********************************!*\
  !*** ./src/App/Core/App_Base.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Content */ "./src/App/Core/Content.ts");

var App_Base = /** @class */ (function () {
    function App_Base(window) {
        var _this = this;
        if (window) {
            window.onpopstate = function () { return _this._handler(); };
            window.route = function () { return _this._route(); };
            window.onload = function () { return _this._start(); };
        }
        else
            throw new Error("App needs window to work!");
        this._routes = [];
    }
    App_Base.prototype._handler = function () {
        var _this = this;
        var location = window.location.pathname;
        if (location.length === 0)
            location = "/";
        var r = this._get(location);
        if (this._description)
            this._description.setAttribute("content", r.description);
        if (this._title)
            this._title.textContent = r.title;
        if (this._script)
            document.body.removeChild(this._script);
        r.html.then(function (content) {
            _this._target.innerHTML = content;
            r.js.then(function (element) {
                if (element instanceof HTMLElement)
                    _this._script = element;
                else
                    _this._script = undefined;
            }).catch(console.error);
        }).catch(function (error) {
            _this._target.innerHTML = "<h2>".concat(error.message || "An unknown error occured!", "</h2>");
            console.error(error);
        });
    };
    App_Base.prototype._route = function (event) {
        event = event || window.event;
        event.preventDefault();
        window.history.pushState({}, "", event.target.href);
        this._handler();
    };
    App_Base.prototype._get = function (url) {
        for (var _i = 0, _a = this._routes; _i < _a.length; _i++) {
            var router = _a[_i];
            if (router.matches(url))
                return router;
        }
        var fourzerofour = new _Content__WEBPACK_IMPORTED_MODULE_0__["default"]("404", "");
        fourzerofour.set("<h2>Unable to find: " + url + "</h2>");
        return fourzerofour;
    };
    App_Base.prototype._start = function () {
        this._title = document.querySelector("title");
        this._target = document.querySelector("main");
        this._description = document.querySelector("meta[name='description'");
        this._handler();
        if (this._ready)
            this._ready();
    };
    App_Base.prototype.onReady = function (callback) {
        this._ready = callback;
    };
    return App_Base;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App_Base);


/***/ }),

/***/ "./src/App/Core/Content.ts":
/*!*********************************!*\
  !*** ./src/App/Core/Content.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Countent = /** @class */ (function () {
    function Countent(title, description) {
        if (typeof title === "string") {
            this._title = title;
        }
        else {
            throw new Error("Title must be a string!");
        }
        if (typeof description === "string") {
            this._description = description;
        }
        else {
            throw new Error("Description must be a string!");
        }
    }
    Countent.prototype.set = function (html) {
        if (typeof html === "string") {
            this._string = html;
        }
        else {
            throw new Error("Html must be a string!");
        }
    };
    Object.defineProperty(Countent.prototype, "html", {
        get: function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (typeof _this._string === "undefined")
                    reject(new Error("No html given"));
                resolve(_this._string);
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Countent.prototype, "js", {
        get: function () {
            return new Promise(function (res, rej) { return res(undefined); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Countent.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Countent.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    return Countent;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Countent);


/***/ }),

/***/ "./src/App/Core/NavBar.ts":
/*!********************************!*\
  !*** ./src/App/Core/NavBar.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var NavBar = /** @class */ (function () {
    function NavBar(target) {
        this._list = document.querySelector(target);
        if (typeof this._list === "undefined")
            throw new Error("Unable to find NavBar!");
    }
    NavBar.prototype.routeEvent = function (callback) {
        this._list.addEventListener("click", callback);
        var title = document.querySelector("#top-nav-title");
        if (title)
            title.addEventListener("click", callback);
    };
    NavBar.prototype.add = function (router) {
        var item = document.createElement("li");
        var link = document.createElement("a");
        link.className = "top-nav-item";
        link.href = router.href;
        link.textContent = router.title;
        item.appendChild(link);
        this._list.appendChild(item);
    };
    return NavBar;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavBar);


/***/ }),

/***/ "./src/App/Router.ts":
/*!***************************!*\
  !*** ./src/App/Router.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Core_Content__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Core/Content */ "./src/App/Core/Content.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Router = /** @class */ (function (_super) {
    __extends(Router, _super);
    function Router(route, title, description) {
        var _this = _super.call(this, title, description) || this;
        if (typeof route === "string") {
            _this._route = route;
        }
        else {
            throw new Error("Title must be a string!");
        }
        _this._execute = function () { return new Promise(function (res, rej) { return res(undefined); }); };
        return _this;
    }
    Router.prototype.onLoad = function (callback) {
        this._render = callback;
    };
    Router.prototype.onConnected = function (callback) {
        this._execute = callback;
    };
    Object.defineProperty(Router.prototype, "html", {
        get: function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this._render)
                    _this._render().then(resolve).catch(reject);
                else
                    resolve(_this._string);
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "js", {
        get: function () {
            return this._execute();
        },
        enumerable: false,
        configurable: true
    });
    Router.prototype.matches = function (route) {
        if (typeof route !== "string") {
            throw new Error("Title must be a string!");
        }
        return route === this._route;
    };
    Object.defineProperty(Router.prototype, "href", {
        get: function () {
            return this._route;
        },
        enumerable: false,
        configurable: true
    });
    return Router;
}(_Core_Content__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);


/***/ }),

/***/ "./src/App/index.ts":
/*!**************************!*\
  !*** ./src/App/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "execute": () => (/* binding */ execute),
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _Core_App_Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Core/App_Base */ "./src/App/Core/App_Base.ts");
/* harmony import */ var _Core_NavBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Core/NavBar */ "./src/App/Core/NavBar.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this, window) || this;
        _this._navbar = new _Core_NavBar__WEBPACK_IMPORTED_MODULE_1__["default"]("#top-nav-menu");
        _this._navbar.routeEvent(_this._route);
        return _this;
    }
    App.prototype.add = function (router, addToNav) {
        this._routes.push(router);
        if (addToNav)
            this._navbar.add(router);
    };
    return App;
}(_Core_App_Base__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);
function render(filename) {
    return new Promise(function (resolve, reject) {
        fetch("templates/" + filename).then(function (response) {
            if (!response.ok)
                reject(new Error("File not Found!"));
            response.text().then(resolve).catch(reject);
        }).catch(reject);
    });
}
function execute(filename) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        document.body.appendChild(script);
        script.onload = function () {
            resolve(script);
        };
        script.onerror = reject;
        script.async = true;
        script.src = "templates/" + filename;
    });
}


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App/Router */ "./src/App/Router.ts");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/App/index.ts");


var app = new _App__WEBPACK_IMPORTED_MODULE_1__["default"]();
var index = new _App_Router__WEBPACK_IMPORTED_MODULE_0__["default"]("/", "Home", "");
index.onLoad(function () {
    return (0,_App__WEBPACK_IMPORTED_MODULE_1__.render)("home.html");
});
index.onConnected(function () {
    return (0,_App__WEBPACK_IMPORTED_MODULE_1__.execute)("test.js");
});
app.add(index);
app.onReady(function () {
    console.log("Hello World!");
});

})();

/******/ })()
;
//# sourceMappingURL=app.js.map