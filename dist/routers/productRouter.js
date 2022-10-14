"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ProductsController_1 = require("../controller/ProductsController");
const productRouter = express.Router();
productRouter.get('/allProduct', ProductsController_1.default.getListProduct);
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map