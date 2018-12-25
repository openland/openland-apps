const {
    app
} = require('electron');
const os = require('os');
const createMainWindow = require('./window').createMainWindow;

let mainWindow;
const isOSX = os.platform() === 'darwin';

module.exports = {
    run: () => {

        // Try to obtain instance lock
        let lock = app.requestSingleInstanceLock()
        if (!lock) {
            app.quit();
            return;
        }

        // Open new window
        app.on('ready', () => {
            mainWindow = createMainWindow();

            // Handle closing
            mainWindow.on('close', (event) => {
                if (isOSX) {
                    event.preventDefault();
                    mainWindow.hide();
                }
            });
        });

        // Mac Dock click
        app.on('activate', (event, hasVisibleWindows) => {
            if (isOSX) {
                // this is called when the dock is clicked
                if (!hasVisibleWindows) {
                    mainWindow.show();
                }
            }
        });

        app.on('before-quit', () => {
            // not fired when the close button on the window is clicked
            if (isOSX) {
                // need to force a quit as a workaround here to simulate the osx app hiding behaviour
                // Somehow sokution at https://github.com/atom/electron/issues/444#issuecomment-76492576 does not work,
                // e.prevent default appears to persist

                // might cause issues in the future as before-quit and will-quit events are not called
                app.exit(0);
            }
        });

        app.on('window-all-closed', () => {
            if (!isOSX) {
                app.quit();
            }
        });

        app.on('second-instance', (event, argv, cwd) => {
            if (mainWindow) {
                // tray? wtf is tray?
                if (!mainWindow.isVisible()) {
                    mainWindow.show();
                }
                // Minimized
                if (mainWindow.isMinimized()) {
                    mainWindow.restore();
                }
                mainWindow.focus();
            }
        });
    }
}