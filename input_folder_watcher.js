const appRoot = require(`app-root-path`);
const fs = require(`fs`);

const run = (folder_path) => {
    const EventEmitter = require(`events`);

    const process_amount_of_clients = require(`${appRoot}/process_amount_of_clients`);
    const process_amount_of_salesmen = require(`${appRoot}/process_amount_of_salesmen`);
    const process_the_most_expensive = require(`${appRoot}/process_the_most_expensive_sale`);
    const process_the_worst_salesman = require(`${appRoot}/process_the_worst_salesman`);

    const event_emitter = new EventEmitter();
    event_emitter.on(`new_dat_file`, process_amount_of_clients.run);
    event_emitter.on(`new_dat_file`, process_amount_of_salesmen.run);
    event_emitter.on(`new_dat_file`, process_the_most_expensive.run);
    event_emitter.on(`new_dat_file`, process_the_worst_salesman.run);

    const watcher = fs.watch(folder_path, (eventType, file_path) => {
        if (eventType !== `change`) return;
        event_emitter.emit(`new_dat_file`, `${folder_path}/${file_path}`);
    });
    return watcher;
}

module.exports = {
    run: run
}