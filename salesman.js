function salesman({ cpf, name, salary }) {
    this.cpf = cpf;
    this.name = name;
    this.salary = salary;
}

function string_to_salesman({ row, separator }) {
    const string_values = row.split(separator);
    return new salesman({
        cpf: string_values[1],
        name: string_values[2],
        salary: parseFloat(string_values[3])
    });
}

module.exports = {
    salesman: salesman,
    string_to_salesman: string_to_salesman
}