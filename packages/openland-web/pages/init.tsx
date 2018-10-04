import { rehydrate, css, keyframes } from 'glamor';
import { XThemeDefault } from 'openland-x/XTheme';

if (typeof window !== 'undefined') {
    if ((window as any).__NEXT_DATA__.ids) {
        rehydrate((window as any).__NEXT_DATA__.ids);
        (window as any).__NEXT_DATA__.ids = undefined;
    }
}

let fontFamily = '"-apple-system",BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';

// Normalize

css.global('html', {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontVariant: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
    fontFamily,
    textRendering: 'optimizeLegibility !important',
    WebkitTextSizeAdjust: '100%',
    WebkitFontSmoothing: 'antialiased',
    MozFontSmoothing: 'antialiased',
    MsFontSmoothing: 'antialiased',
    OFontSmoothing: 'antialiased',
    WebkitBoxSizing: 'border-box',
    MozBoxSizing: 'border-box'
});
css.global('body, body *', {
    margin: 0,
    padding: 0,
    border: 0,
    outline: 0,
    fontSize: '100%',
    verticalAlign: 'baseline',
    background: 'transparent',
    textDecoration: 'none',
    boxSizing: 'border-box'
});
css.global('body', {
    backgroundColor: XThemeDefault.backyardColor,

});
css.global('input, textarea, button', {
    fontFamily,
});
css.global('input, select', {
    verticalAlign: 'middle'
});
css.global('input::-ms-clear', {
    display: 'none'
});
css.global('a', {
    color: 'inherit',
    textDecoration: 'none',
});
css.global('a:hover', {
    color: '#1790ff'
});
css.global('sub, sup', {
    fontSize: '75%',
    lineHeight: 0,
    position: 'relative'
});
css.global('sup', {
    top: '-0.5em'
});
css.global('sub', {
    bottom: '-0.25em'
});

// Modals

css.global('.ReactModal__Body--open', {
    overflow: 'hidden'
});

css.global('.ReactModal__Overlay', {
    opacity: 0,
    overflowY: 'auto'
});

css.global('.ReactModal__Overlay--after-open', {
    opacity: 1,
    transition: 'opacity 300ms'
});

css.global('.ReactModal__Overlay--before-close', {
    opacity: 0,
});

// Global Loader

css.global('#nprogress', {
    pointerEvents: 'none'
});

css.global('#nprogress .bar', {
    background: '#29d',
    position: 'fixed',
    zIndex: 1031,
    top: 0,
    left: 0,
    width: '100%',
    height: '4px'
});

css.global('#nprogress .peg', {
    display: 'block',
    position: 'absolute',
    right: '0px',
    width: '100px',
    height: '100%',
    boxShadow: '0 0 10px #29d, 0 0 5px #29d',
    opacity: 1.0,
    transform: 'rotate(3deg) translate(0px, -4px)'
});

/* Remove these to get rid of the spinner */
css.global('#nprogress .spinner', {
    display: 'block',
    position: 'fixed',
    zIndex: 1031,
    top: '15px',
    right: '15px'
});

const progressAnimation = keyframes({
    '0%': {
        transform: 'rotate(0deg)'
    },
    '100%': {
        transform: 'rotate(360deg)'
    }
});

css.global('#nprogress .spinner-icon', {
    width: '18px',
    height: '18px',
    boxSizing: 'border-box',
    border: 'solid 2px transparent',
    borderTopColor: '#29d',
    borderLeftCOlor: '#29d',
    borderRadius: '50%',
    animation: `${progressAnimation} 400ms linear infinite`
});