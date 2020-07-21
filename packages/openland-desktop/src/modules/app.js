const {
    app
} = require('electron');
const os = require('os');
const createMainWindow = require('./window').createMainWindow;
const createAppMenu = require('./menu').createAppMenu;
const updates = require('./updates');

let mainWindow;
const isOSX = os.platform() === 'darwin';

module.exports = {
    run: (devMode) => {

        // Try to obtain instance lock
        let lock = app.requestSingleInstanceLock()
        if (!lock) {
            app.quit();
            return;
        }

        // Open new window
        app.on('ready', () => {

            // Create window
            mainWindow = createMainWindow(devMode);

            // Create menu
            createAppMenu(mainWindow, devMode);

            // Handle updates
            if (!devMode) {
                updates.run();
            }

            // Handle closing
            mainWindow.on('close', (event) => {
                if (isOSX) {
                    event.preventDefault();
                    if (mainWindow.isFullScreen()) { // workaround for macOS black scren on close from fullscreen https://github.com/electron/electron/issues/20263#issuecomment-633179965
                        mainWindow.once('leave-full-screen', () => mainWindow.hide());
                        mainWindow.setFullScreen(false);
                    } else {
                        mainWindow.hide();
                    }
                }
            });
        });

        // Mac Dock click
        app.on('activate', (event, hasVisibleWindows) => {
            if (isOSX) {
                // this is called when the dock is clicked
                if (!hasVisibleWindows) {
                    if (mainWindow) {
                        mainWindow.show();
                    }
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