const {
    BrowserWindow
} = require('electron');
const windowStateKeeper = require('electron-window-state');
const handleLinkOpen = require('./links').handleLinkOpen;

module.exports = {
    createMainWindow: (devMode) => {

        // Create window
        const mainWindowState = windowStateKeeper({
            defaultWidth: 1280,
            defaultHeight: 800,
        });
        let win = new BrowserWindow({
            width: mainWindowState.width,
            height: mainWindowState.height
        });
        mainWindowState.manage(win);

        // Setup Link Handling
        win.webContents.on('new-window', handleLinkOpen);

        // Load app URL
        win.loadURL(devMode ? 'http://localhost:3000' : 'https://app.openland.com');

        return win;
    }
}