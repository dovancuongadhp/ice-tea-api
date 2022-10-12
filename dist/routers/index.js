"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function allRouter(app) {
    app.use("/user", (req, res) => res.send("hello"));
}
exports.default = allRouter;
//# sourceMappingURL=index.js.map