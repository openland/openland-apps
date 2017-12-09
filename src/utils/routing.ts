import Router from 'next/router';
import * as NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

var previousUrl: string | null = null;
var currentUrl: string | null = null;

const extracthPath = (src: string) => {
    if (src.indexOf('?') > 0) {
        return src.split('?', 2)[0];
    } else {
        return src;
    }
};

export function isPageChanged() {
    if (previousUrl == null || currentUrl == null) {
        return true;
    }
    console.warn(extracthPath(previousUrl));
    console.warn(extracthPath(currentUrl));
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
    }
    NProgress.done();
}

Router.onRouteChangeStart = (url) => {
    // tslint:disable
    console.log(`Naviating to: ${url}`);
    // tslint:enable

    showProgress();
};

Router.onRouteChangeComplete = () => {
    // tslint:disable
    console.log(`Naviating Complete`);
    // tslint:enable
    hideProgress();
};

Router.onBeforeHistoryChange = (src) => {
    previousUrl = currentUrl;
    currentUrl = src;
};

Router.onRouteChangeError = () => {
    hideProgress();
};