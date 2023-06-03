const fs = require("fs")
const logger = require("../utils/logger.utils");
const moment = require('moment-timezone');

const settheme = async (theme) => {
  try {
    const fileData = await fs.readFileSync("config.json");
    const json = JSON.parse(fileData);
    json.theme = theme;
    await fs.writeFileSync("config.json", JSON.stringify(json, null, 2));
    logger.success(`Successfully updated theme to '${theme}' in config.json`);
  } catch (err) {
    logger.error(`Error updating theme to '${theme}' in config.json: ${err}`);
  }
}

module.exports = {
    settheme
}
