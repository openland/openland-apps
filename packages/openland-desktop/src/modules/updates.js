const {
    autoUpdater
} = require("electron-updater");

module.exports = {
    run: () => {
        autoUpdater.checkForUpdatesAndNotify();
    }
}