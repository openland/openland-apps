const {
    Menu,
    app
} = require('electron');

module.exports = {
    createAppMenu: (win, devMode) => {
        if (process.platform !== 'darwin') {
            return;
        }
        if (Menu.getApplicationMenu()) {
            return;
        }
        const template = [{
                label: 'Edit',
                submenu: [{
                        label: 'Undo',
                        accelerator: 'CmdOrCtrl+Z',
                        role: 'undo',
                    },
                    {
                        label: 'Redo',
                        accelerator: 'Shift+CmdOrCtrl+Z',
                        role: 'redo',
                    },
                    {
                        type: 'separator',
                    },
                    {
                        label: 'Cut',
                        accelerator: 'CmdOrCtrl+X',
                        role: 'cut',
                    },
                    {
                        label: 'Copy',
                        accelerator: 'CmdOrCtrl+C',
                        role: 'copy',
                    },
                    {
                        label: 'Paste',
                        accelerator: 'CmdOrCtrl+V',
                        role: 'paste',
                    },
                    {
                        label: 'Paste and Match Style',
                        accelerator: 'CmdOrCtrl+Shift+V',
                        role: 'pasteandmatchstyle',
                    },
                    {
                        label: 'Select All',
                        accelerator: 'CmdOrCtrl+A',
                        role: 'selectall',
                    }
                ],
            }, {
                label: 'View',
                submenu: [{
                        label: 'Back',
                        accelerator: 'CmdOrCtrl+[',
                        click: () => {
                            win.webContents.goBack();
                        },
                    },
                    {
                        label: 'Forward',
                        accelerator: 'CmdOrCtrl+]',
                        click: () => {
                            win.webContents.goForward();
                        },
                    },
                    {
                        label: 'Reload',
                        accelerator: 'CmdOrCtrl+R',
                        click: (item, focusedWindow) => {
                            if (focusedWindow) {
                                focusedWindow.reload();
                            }
                        },
                    },
                    {
                        type: 'separator',
                    },
                    {
                        label: 'Toggle Full Screen',
                        accelerator: (() => {
                            if (process.platform === 'darwin') {
                                return 'Ctrl+Command+F';
                            }
                            return 'F11';
                        })(),
                        click: (item, focusedWindow) => {
                            if (focusedWindow) {
                                focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                            }
                        },
                    },
                ],
            },
            {
                label: 'Window',
                role: 'window',
                submenu: [{
                        label: 'Minimize',
                        accelerator: 'CmdOrCtrl+M',
                        role: 'minimize',
                    },
                    {
                        label: 'Close',
                        accelerator: 'CmdOrCtrl+W',
                        role: 'close',
                    },
                ],
            },
        ];

        if (process.platform === 'darwin') {
            template.unshift({
                label: 'Openland',
                submenu: [{
                        label: 'Services',
                        role: 'services',
                        submenu: [],
                    },
                    {
                        type: 'separator',
                    },
                    {
                        label: 'Hide App',
                        accelerator: 'Command+H',
                        role: 'hide',
                    },
                    {
                        type: 'separator',
                    },
                    {
                        label: 'Quit',
                        accelerator: 'Command+Q',
                        click: () => {
                            app.quit();
                        },
                    },
                ],
            });
        }

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }
}