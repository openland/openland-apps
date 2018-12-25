module.exports = {
    handleLinkOpen: (e, url) => {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    }
}