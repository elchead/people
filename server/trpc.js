"use strict";
exports.__esModule = true;
exports.trpcMiddleware = void 0;
var trpc = require("@trpc/server");
var zod_1 = require("zod");
var deta_1 = require("./deta");
var trpcExpress = require("@trpc/server/adapters/express");
var router = trpc
    .router()
    .query("allPeople", {
    resolve: function () {
        return (0, deta_1.allItems)(deta_1.contacts);
    }
})
    .mutation("savePerson", {
    input: zod_1.z.object({ key: zod_1.z.string().optional() }).passthrough(),
    resolve: function (_a) {
        var input = _a.input;
        return deta_1.contacts.put(input, input.key);
    }
})
    .mutation("deletePerson", {
    input: function (inp) {
        if (typeof inp === "string") {
            return inp;
        }
        throw new Error("Received non-string input: " + JSON.stringify(inp));
    },
    resolve: function (_a) {
        var input = _a.input;
        return deta_1.contacts["delete"](input);
    }
});
exports.trpcMiddleware = trpcExpress.createExpressMiddleware({
    router: router
});
