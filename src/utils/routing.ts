import Router from 'next/router';
import * as NProgress from 'nprogress';

NProgress.configure({ showSpinner: false, parent: '#progress_container' });

var previousUrl: string | null = null;
var currentUrl: string | null = null;

const extracthPath = (src: string) => {
    if (src.indexOf('?') > 0) {
        src = src.split('?', 2)[0];
    }
    if (src.endsWith('/')) {
        return src.substring(0, src.length - 1);
    }
    return src;
};

export function isPageChanged() {
    if (previousUrl == null) {
        previousUrl = Router.asPath ? Router.asPath : null;
    }
    if (previousUrl == null || currentUrl == null) {
        return true;
    }
    return extracthPath(previousUrl) !== extracthPath(currentUrl);
}

var timeoutId: number | null = null;

function showProgress() {
    if (timeoutId == null) {
        timeoutId = window.setTimeout(
            () => {
                timeoutId = null;
                NProgress.start();
            },
            50);
    }
}

function hideProgress() {
    if (timeoutId != null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
    }
    NProgress.done();
}

Router.onRouteChangeStart = (url) => {

    // Hotfix Current Url
    if (currentUrl == null) {
        currentUrl = Router.asPath ? Router.asPath : null;
    }

    previousUrl = currentUrl;
    currentUrl = url;

    // tslint:disable
    console.log(`Naviating to: ${previousUrl} -> ${currentUrl}`);
    // tslint:enable

    showProgress();
};

Router.onRouteChangeComplete = () => {
    // tslint:disable
    console.log(`Naviating Complete`);
    // tslint:enable

    hideProgress();
};

Router.onRouteChangeError = () => {
    // tslint:disable
    console.log(`Naviating Errored`);
    // tslint:enable

    hideProgress();
};