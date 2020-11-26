const appRoot = require(`app-root-path`);
const chai = require(`chai`);
chai.use(require('chai-string'));
const { expect } = chai;
const sinon = require(`sinon`);
const fs = require(`fs`);
const row_layout = require(`${appRoot}/row_layout`);
const { sale, sale_item } = require(`${appRoot}/sale`);;
const { salesman } = require(`${appRoot}/salesman`);;
const { customer } = require(`${appRoot}/customer`);;
const input_folder_watcher = require(`${appRoot}/input_folder_watcher`)

const process_amount_of_clients = require(`${appRoot}/process_amount_of_clients`);
const process_amount_of_salesmen = require(`${appRoot}/process_amount_of_salesmen`);
const process_the_most_expensive_sale = require(`${appRoot}/process_the_most_expensive_sale`);
const process_the_worst_salesman = require(`${appRoot}/process_the_worst_salesman`);

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

    it("should parse SALESMAN row", () => {
        const string_row = `001ç1234567891234çDiegoç50000`;

        const expected_salesman = new salesman({
            cpf: `1234567891234`,
            name: `Diego`,
            salary: parseFloat(`50000`)
        });

        const actual_salesman = row_layout
            .from_row({ separator: `ç`, row: string_row })
            .parse({ row: string_row, separator: `ç` });

        expect(expected_salesman).to.eql(actual_salesman);
    });

    it("should parse CUSTOMER row", () => {
        const string_row = `002ç2345675434544345çJosedaSilvaçRural`;
        const expected_customer = new customer({
            cnpj: `2345675434544345`,
            name: `JosedaSilva`,
            business_area: `Rural`
        });

        const actual_customer = row_layout
            .from_row({ separator: `ç`, row: string_row })
            .parse({ row: string_row, separator: `ç` });

        expect(expected_customer).to.eql(actual_customer);
    });

    it("should parse SALE row", () => {
        const string_row = `003ç08ç[1-34-10,2-33-1.50,3-40-0.10]çRenato`;

        const expected_sale = new sale({
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

    it("should process file when directory changes", () => {
        const watch_stub = sinon.stub(fs, `watch`);

        const spy_clients = sinon.spy(process_amount_of_clients, `run`);
        const spy_salesmen = sinon.spy(process_amount_of_salesmen, `run`);
        const spy_expensive = sinon.spy(process_the_most_expensive_sale, `run`);
        const spy_salesman = sinon.spy(process_the_worst_salesman, `run`);

        input_folder_watcher.run();
        watch_stub.yield(`change`, `any_file.out`);

        expect(spy_clients.calledOnce).to.nested.true;
        expect(spy_salesmen.calledOnce).to.nested.true;
        expect(spy_expensive.calledOnce).to.nested.true;
        expect(spy_salesman.calledOnce).to.nested.true;
    });
});