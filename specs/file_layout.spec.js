const appRoot = require(`app-root-path`);
const chai = require(`chai`);
chai.use(require('chai-string'));
const { expect } = chai;
const row_layout = require(`${appRoot}/row_layout`);
const { sale, sale_item } = require(`${appRoot}/sale`);;

describe("row_parse", () => {
    it("should identify the SALESMAN layout", () => {
        const row = `001ç1234567891234çDiegoç50000`;
        const layout = row_layout.from_row({ separator: `ç`, row: row });
        expect(layout === row_layout.types.SALESMAN).to.be.true;
    });

    it("should identify the CUSTOMER layout", () => {
        const row = `002ç2345675434544345çJosedaSilvaçRural`;
        const layout = row_layout.from_row({ separator: `ç`, row: row });
        expect(layout === row_layout.types.CUSTOMER).to.be.true;
    });

    it("should identify the SALE layout", () => {
        const row = `003ç08ç[1-34-10,2-33-1.50,3-40-0.10]çRenato`;
        const layout = row_layout.from_row({ separator: `ç`, row: row });
        expect(layout === row_layout.types.SALE).to.be.true;
    });

    it("should parse SALE row", () => {
        const string_row = `003ç08ç[1-34-10,2-33-1.50,3-40-0.10]çRenato`;

        const expected_sale = new sale({
            row_layout: row_layout.types.SALE,
            sale_id: parseInt(`08`),
            items: [
                new sale_item({
                    item_id: parseInt(`1`),
                    item_quantity: parseInt(`34`),
                    item_price: parseFloat(`10`)
                }),
                new sale_item({
                    item_id: parseInt(`2`),
                    item_quantity: parseInt(`33`),
                    item_price: parseFloat(`1.50`)
                }),
                new sale_item({
                    item_id: parseInt(`3`),
                    item_quantity: parseInt(`40`),
                    item_price: parseFloat(`0.10`)
                }),
            ],
            salesman_name: `Renato`
        });

        const actual_sale = row_layout
            .from_row({ separator: `ç`, row: string_row })
            .parse({ row: string_row, sale_separator: `ç`, item_separator: `-` });

        expect(expected_sale).to.eql(actual_sale);
    });
});