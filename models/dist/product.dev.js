"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fs = require("fs");

var path = require("path");

var p = path.join(path.dirname(require.main.filename), "data", "products.json");

getProductsFromFile = function getProductsFromFile(cb) {
  fs.readFile(p, function (err, fileContent) {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports =
/*#__PURE__*/
function () {
  function Product(id, title, imageURL, description, price) {
    _classCallCheck(this, Product);

    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  _createClass(Product, [{
    key: "save",
    value: function save() {
      var _this = this;

      getProductsFromFile(function (products) {
        if (_this.id) {
          var existingProductIndex = products.findIndex(function (prod) {
            return _this.id === prod.id;
          });

          var updatedProducts = _toConsumableArray(products);

          updatedProducts[existingProductIndex] = _this;
          fs.writeFile(p, JSON.stringify(updatedProducts), function (err) {
            console.log(err);
          });
        } else {
          _this.id = Math.random().toString();
          products.push(_this);
          fs.writeFile(p, JSON.stringify(products), function (err) {
            console.log(err);
          });
        }
      });
    }
  }], [{
    key: "deleteById",
    value: function deleteById(id) {
      getProductsFromFile(function (products) {
        var updatedProducts = products.filter(function (prod) {
          return prod.id !== id;
        });
        fs.write(p, JSON.stringify(updatedProducts), function (err) {
          if (!err) {}
        });
      });
    }
  }, {
    key: "fetchAll",
    value: function fetchAll(cb) {
      getProductsFromFile(cb);
    }
  }, {
    key: "findById",
    value: function findById(id, cb) {
      getProductsFromFile(function (products) {
        var product = products.find(function (prod) {
          return prod.id === id;
        });
        cb(product);
      });
    }
  }]);

  return Product;
}();