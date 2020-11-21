const appRoot = require(`app-root-path`);
const { sale, string_to_items } = require(`${appRoot}/sale`);

const row_layout = function ({ code, parse }) {
    this.code = code;
    this.parse = parse;
}

const types = {
    SALESMAN: new row_layout({
        code: `001`,
        parse: ({ row, separator }) => {
            return row;
        }
    }),

    CUSTOMER: new row_layout({
        code: `002`,
        parse: ({ row, separator }) => {
            return row;
        }
    }),

    SALE: new row_layout({
        code: `003`,
        parse: ({ row, sale_separator, item_separator }) => {
            const string_values = row.split(sale_separator);
            return new sale({
                row_layout: types_by_code[string_values[0]],
                sale_id: parseInt(string_values[1]),
                items: string_to_items({ separator: item_separator, string_item: string_values[2] }),
                salesman_name: string_values[3]
            });
        }
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