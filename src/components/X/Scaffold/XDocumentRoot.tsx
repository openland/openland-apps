import Glamorous from 'glamorous';

export let XDocumentRoot = Glamorous.div({
    font: 'normal normal 14px/20px \'Aktiv Grotesk Corp\', arial, sans-serif',
    background: '#F5F6F8',
    color: '#182642',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    minWidth: 'initial',
    minHeight: '100vh',

    'input, textarea, button': {
        fontFamily: '\'Aktiv Grotesk Corp\', arial, sans-serif'
    }
});

export let XDocumentAppRoot = Glamorous.div({
    background: '#F5F6F8',
    color: '#182642',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',

    minWidth: '1020px',
    maxWidth: '1400px',
    minHeight: '100vh',

    marginLeft: 'auto',
    marginRight: 'auto'
});

export let XDocumentAppRootFullScreen = Glamorous.div({
    position: 'relative',
    background: '#F5F6F8',
    color: '#182642',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',

    width: '100vw',
    minHeight: '100vh',

    marginLeft: 'auto',
    marginRight: 'auto'
});