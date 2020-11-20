var appRoot = require(`app-root-path`);
const { expect } = require(`chai`);
const file_layout = require(`${appRoot}/file_layout`);

describe("file_layout", () => {
    it("should exist", () => {
        expect(file_layout.exists()).to.be.true;
    });
});
