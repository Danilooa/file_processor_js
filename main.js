const appRoot = require(`app-root-path`);
const input_folder_watcher = require(`${appRoot}/input_folder_watcher`);

input_folder_watcher.run(`/home/danilo/file_processor_js_input`);