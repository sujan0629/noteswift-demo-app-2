"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomEmoji = generateRandomEmoji;
// backend/src/services/avatarService.ts
function generateRandomEmoji() {
    var PEOPLE_EMOJIS = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '☺️',
        '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗',
        '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓',
        '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕',
        '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤'
    ];
    return PEOPLE_EMOJIS[Math.floor(Math.random() * PEOPLE_EMOJIS.length)];
}
