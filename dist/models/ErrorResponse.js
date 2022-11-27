"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ErrorResponse({ errorCode, message, data }) {
    return {
        errorCode: errorCode,
        message: message,
        data: data
    };
}
exports.default = ErrorResponse;
//# sourceMappingURL=ErrorResponse.js.map