"use strict";

const file_layout = () => {
    const exists = () => {
        return true;
    }
    return {
        exists: exists
    };
}
module.exports = file_layout();