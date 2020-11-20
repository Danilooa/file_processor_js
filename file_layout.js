"use strict";

const file_layout = () => {

    const layout = ({ code_parameter, parse_function }) => {
        const code = code_parameter;
        const parse = parse_function;
        return {
            code,
            parse
        };
    }

    const layouts = {};
    layouts[`001`] = layout({
        code_parameter: `001`,
        parse_function: ({ row = `` }) => {
            return row;
        }
    });
    layouts[`002`] = layout({
        code_parameter: `002`,
        parse_function: ({ row = `` }) => {
            return row;
        }
    });
    layouts[`003`] = layout({
        code_parameter: `003`,
        parse_function: ({ row = `` }) => {
            return row;
        }
    });

    const exists = () => {
        return true;
    }

    const layout_from_row = ({ separator = `;`, row = `` }) => {
        const string_fields = row.split(separator);
        const layout_code = string_fields[0];
        return layouts[layout_code];
    }

    return {
        exists: exists,
        layout_from_row: layout_from_row
    };
}
module.exports = file_layout();