const {
    BrowserWindow
} = require('electron');
const windowStateKeeper = require('electron-window-state');
const handleLinkOpen = require('./links').handleLinkOpen;

module.exports = {
    createMainWindow: () => {

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
        win.loadURL('https://app.openland.com');

        return win;
    }
}