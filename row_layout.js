const appRoot = require(`app-root-path`);
const { string_to_sale } = require(`${appRoot}/sale`);
const { string_to_salesman } = require(`${appRoot}/salesman`);

const row_layout = function ({ code, parse }) {
    this.code = code;
    this.parse = parse;
}

const types = {
    SALESMAN: new row_layout({
        code: `001`,
        parse: string_to_salesman
    }),

    CUSTOMER: new row_layout({
        code: `002`,
        parse: ({ row, separator }) => {
            return row;
        }
    }),

    SALE: new row_layout({
        code: `003`,
        parse: string_to_sale
    })
}

const types_by_code = function () {
    const local_types_by_code = {};
    Object.entries(types).forEach(([type, layout]) => {
        local_types_by_code[layout.code] = layout;
    });
    return local_types_by_code;
}();

const from_row = ({ separator = `;`, row = `` }) => {
    const string_fields = row.split(separator);
    const layout_code = string_fields[0];
    return types_by_code[layout_code];
}

module.exports = {
    row_layout: row_layout,
    from_row: from_row,
    types: types,
    types_by_code: types_by_code
}