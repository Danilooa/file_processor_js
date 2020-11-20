const appRoot = require(`app-root-path`);
const chai = require(`chai`);
chai.use(require('chai-string'));
const { expect } = chai;
const file_layout = require(`${appRoot}/file_layout`);

describe("file_layout", () => {
    it("should exist", () => {
        expect(file_layout.exists()).to.be.true;
    });
    it("should identify layout 001", () => {
        const row = `001ç1234567891234çDiegoç50000`;
        const layout = file_layout.layout_from_row({ separator: `ç`, row: row });
        expect(layout.code).to.equalIgnoreCase(`001`);
    });
    it("should identify layout 002", () => {
        const row = `002ç2345675434544345çJosedaSilvaçRural`;
        const layout = file_layout.layout_from_row({ separator: `ç`, row: row });
        expect(layout.code).to.equalIgnoreCase(`002`);
    });
    it("should identify layout 003", () => {
        const row = `003ç08ç[1-34-10,2-33-1.50,3-40-0.10]çRenato`;
        const layout = file_layout.layout_from_row({ separator: `ç`, row: row });
        expect(layout.code).to.equalIgnoreCase(`003`);
    });    
});