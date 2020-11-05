const {
    BrowserWindow,
    session,
    shell,
    app
} = require('electron');
const windowStateKeeper = require('electron-window-state');
const handleLinkOpen = require('./links').handleLinkOpen;
const os = require('os');

function onDownload(event, item, webContents) {
    if (item.getMimeType() == 'application/pdf') {
        item.setSavePath(`${app.getPath('downloads')}/${item.getFilename()}`);
        item.once('done', (e, s) => {
            if (s === 'completed') {
                webContents.send('download-complete', item.getURL());
                shell.openItem(item.getSavePath());
            }
        });
    }
}

module.exports = {
    createMainWindow: (devMode) => {
        session.defaultSession.on('will-download', onDownload);
        // Create window
        const mainWindowState = windowStateKeeper({
            defaultWidth: 1280,
            defaultHeight: 800,
        });

        var path = require('path');

        let opts = {
            width: mainWindowState.width,
            height: mainWindowState.height,
            minHeight: 375,
            minWidth: 500,
            title: 'Openland',
            webPreferences: {
                nodeIntegration: true
            }
        };

        if (os.platform() === 'linux') {
            opts.icon = path.join(app.getAppPath(), '../../openland.png');
        }

        let win = new BrowserWindow(opts);
        mainWindowState.manage(win);

        // Setup Link Handling
        win.webContents.on('new-window', handleLinkOpen);

        win.webContents.session.setPreloads([path.join(__dirname, 'getUserMedia.js')])

        // Load app URL
        win.loadURL(devMode ? 'http://localhost:3000/mail' : 'https://openland.com/mail');

        return win;
    }
}
