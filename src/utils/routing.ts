import Router from 'next/router';
import * as NProgress from 'nprogress';
import { RouterState } from './withRouter';
import * as qs from 'query-string';
import { trackPage } from './analytics';

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

let nextId: number = 1;
const activeProgresses = new Set<number>();

export function startProgress(src?: number): number {
    let id = src || nextId++;
    activeProgresses.add(id);
    showProgress();
    return id;
}

export function stopProgress(src: number) {
    activeProgresses.delete(src);
    if (activeProgresses.size === 0) {
        hideProgress();
    }
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

    startProgress(0);
};

Router.onRouteChangeComplete = () => {
    // tslint:disable
    console.log(`Naviating Complete`);
    // tslint:enable

    stopProgress(0);

    trackPage();
};

Router.onRouteChangeError = () => {
    // tslint:disable
    console.log(`Naviating Errored`);
    // tslint:enable

    stopProgress(0);
};

export function resolveActionPath(props: {
    path?: string,
    query?: { field: string, value?: string },
    router: RouterState
}) {
    var destPath: string;
    if (props.path) {
        destPath = props.path;
    } else if (props.query) {
        let s = JSON.parse(JSON.stringify(props.router.queryString!!));
        if (props.query.value) {
            s[props.query.field] = props.query.value;
        } else {
            delete s[props.query.field];
        }
        let q = qs.stringify(s);

        var path = props.router.asPath!!;
        if (path.indexOf('?') >= 0) {
            path = path.split('?', 2)[0];
        }

        if (q !== '') {
            destPath = path + '?' + q;
        } else {
            destPath = path;
        }
    } else {
        destPath = '/';
    }
    return destPath;
}