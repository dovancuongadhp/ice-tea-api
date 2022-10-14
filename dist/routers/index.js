"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRouter_1 = require("./userRouter");
const productRouter_1 = require("./productRouter");
function AllRouter(app) {
    // --> Mapping all Routers
    app.use("/users", userRouter_1.default);
    app.use("/products", productRouter_1.default);
}
exports.default = AllRouter;
//# sourceMappingURL=index.js.map