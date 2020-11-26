const appRoot = require(`app-root-path`);
const file_processor = require(`${appRoot}/file_processor`);
const fs = require(`fs`)

const run = (folder_path) => {
    const watcher = fs.watch(folder_path, (eventType, filename) => {
        file_processor.process(`${folder_path}/${filename}`);
    });
    return watcher;
}

module.exports = {
    run: run
}