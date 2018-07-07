import Router, { RouterProps } from 'next/router';
import * as NProgress from 'nprogress';
import { trackPage, trackError } from 'openland-x-analytics';

NProgress.configure({ showSpinner: false, parent: '#progress_container' });

var previousRoute: string | null = null;
var previousPath: string | null = null;
var currentRoute: string | null = null;
var currentPath: string | null = null;

export function isPageChanged() {
    console.warn((Router as any as RouterProps).route);
    if (previousRoute == null) {
        previousRoute = (Router as any as RouterProps).route;
    }
    if (previousRoute == null) {
        previousRoute = Router.router.asPath ? Router.router.asPath : null;
    }
    if (previousRoute == null || currentRoute == null) {
        return true;
    }
    return currentRoute !== previousRoute;
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
    let id = src !== undefined ? src : nextId++;
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

(Router as any as RouterProps).onRouteChangeStart = (url) => {

    // Hotfix Current Url
    if (currentRoute == null) {
        currentRoute = (Router as any as RouterProps).route;
    }
    if (currentRoute == null) {
        currentRoute = Router.router.asPath ? Router.router.asPath : null;
    }

    previousRoute = currentRoute;
    previousPath = currentPath;
    currentRoute = (Router as any as RouterProps).route;
    currentPath = Router.router.asPath ? Router.router.asPath : null;

    // tslint:disable
    console.log(`Naviating to: ${previousPath} -> ${currentPath}`);
    // tslint:enable

    startProgress(0);
};

(Router as any as RouterProps).onRouteChangeComplete = () => {
    // tslint:disable
    console.log(`Naviating Complete`);
    // tslint:enable

    stopProgress(0);

    trackPage();
};

(Router as any as RouterProps).onRouteChangeError = (error) => {
    // Ignore if route canceled
    if ('' + error === 'Error: Route Cancelled') {
        return;
    }

    // tslint:disable
    console.log(`Naviating Errored`);
    // tslint:enable

    trackError(error);
    stopProgress(0);
};