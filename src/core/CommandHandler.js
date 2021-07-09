const path = require("path");
const fs = require("fs");

async function prepareCommandHandler(client) {
  const dirPath = path.resolve(__dirname, "../plugins");
  const pluginFiles = getFiles(dirPath);

  for (const file of pluginFiles) {
    const plugin = require(`../plugins/${file}`);
    client.commands.set(plugin.options.name, plugin);
    if (plugin.options.aliases != undefined) {
      for (const alias of plugin.options.aliases) {
        client.commands.set(alias, plugin);
      }
    }
  }

  return;
}

function getFiles(dir, files_) {
  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  for (const i in files) {
    if (!files[i].includes("_")) {
      const name = dir + "/" + files[i];
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files_);
      } else {
        files_.push(name);
      }
    }
  }

  const splitFileNames = [];

  for (const file of files_) {
    const splitFileName = file.split("plugins/");
    splitFileNames.push(splitFileName[1]);
  }

  return splitFileNames;
}

module.exports = prepareCommandHandler;