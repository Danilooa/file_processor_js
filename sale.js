function sale_item({ item_id, item_quantity, item_price }) {
    this.item_id = item_id;
    this.item_quantity = item_quantity;
    this.item_price = item_price;
}

function sale({ row_layout, sale_id, items = [], salesman_name }) {
    this.row_layout = row_layout;
    this.sale_id = sale_id;
    this.items = items;
    this.salesman_name = salesman_name;
}

function string_to_items({ separator, string_item }) {
    const no_square_braces = string_item.replace(/[\[,\]]/, ``);
    const string_items = no_square_braces.split(`,`);
    const items = [];
    string_items.forEach((string_item) => {
        const split_item = string_item.split(separator);
        items.push(new sale_item({
            item_id: parseInt(split_item[0]),
            item_quantity: parseInt(split_item[1]),
            item_price: parseFloat(split_item[2])
        }));
    });
    return items;
}

module.exports = {
    sale_item: sale_item,
    sale: sale,
    string_to_items: string_to_items
}