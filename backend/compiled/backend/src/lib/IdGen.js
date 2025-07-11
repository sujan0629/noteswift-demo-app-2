"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeId = makeId;
function makeId() {
    return (Math.floor(Math.random() * Math.pow(10, 15))).toString(16);
}
