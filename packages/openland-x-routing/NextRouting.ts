import NRouter, { RouterProps } from 'next/router';
import * as NProgress from 'nprogress';
import { trackPage, trackError } from 'openland-x-analytics';

NProgress.configure({ showSpinner: false, parent: '#progress_container' });

var currentPathName: string | null = null;
var currentPath: string | null = null;

export function isPageChanged(updated: { query: any, pathname: any, asPath: any }) {
    console.warn(updated);
    let updatedPathName = updated.pathname as string;

    // console.warn((Router as any as RouterProps).route);
    // if (previousRoute == null) {
    //     previousRoute = (NRouter as any as RouterProps).route;
    // }
    // if (previousPath == null) {
    //     previousPath = NRouter.router.asPath ? NRouter.router.asPath : null;
    // }
    // if (previousRoute == null || currentRoute == null) {
    //     return true;
    // }
    return updatedPathName !== currentPathName;
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

(NRouter as any as RouterProps).onRouteChangeStart = (url) => {
    // Hotfix Current Url (for initial render)
    if (currentPath == null) {
        currentPath = (NRouter as any as RouterProps).asPath!!;
        currentPathName = (NRouter as any as RouterProps).pathname;
    }
    if (currentPath !== null) {
        console.log(`Naviating to: ${currentPath} -> ${url}`);
    }
    currentPath = url;

    startProgress(0);
};

(NRouter as any as RouterProps).onRouteChangeComplete = () => {
    // tslint:disable
    console.log(`Naviating Complete`);
    // tslint:enable

    currentPathName = (NRouter as any as RouterProps).pathname;
    currentPath = (NRouter as any as RouterProps).asPath!!;

    stopProgress(0);

    trackPage();
};

(NRouter as any as RouterProps).onRouteChangeError = (error) => {
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