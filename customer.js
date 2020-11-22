function customer({ cnpj, name, business_area }) {
    this.cnpj = cnpj;
    this.name = name;
    this.business_area = business_area;
}

function string_to_customer({ row, separator }) {
    const string_values = row.split(separator);
    return new customer({
        cnpj: string_values[1],
        name: string_values[2],
        business_area: string_values[3]
    });
}

module.exports = {
    customer: customer,
    string_to_customer: string_to_customer
}