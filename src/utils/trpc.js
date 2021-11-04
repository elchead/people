"use strict";
exports.__esModule = true;
exports.client = void 0;
var client_1 = require("@trpc/client");
exports.client = (0, client_1.createTRPCClient)({
    url: "/api"
});
