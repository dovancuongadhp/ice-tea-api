"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsersRouter_1 = require("./UsersRouter");
const ProductsRouter_1 = require("./ProductsRouter");
function AllRouter(app) {
    // --> Mapping all Routers
    app.use("/api-users", UsersRouter_1.default);
    app.use("/api-products", ProductsRouter_1.default);
}
exports.default = AllRouter;
//# sourceMappingURL=index.js.map