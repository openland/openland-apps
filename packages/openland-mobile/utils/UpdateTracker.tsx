import * as React from 'react';
import CodePush from 'react-native-code-push';
import Version from '../version.json';

export enum UpdateStatusCode {
    DISABLED,
    CHECKING_FOR_UPDATES,
    DOWNLOADING,
    UPDATED,
    UP_TO_DATE,
    UNKNOWN_ERROR
}

export interface UpdateStatus {
    status: UpdateStatusCode;
    progress?: number;
    bundleVersion: string;
}

var statusValue: UpdateStatus = {
    status: __DEV__ ? UpdateStatusCode.DISABLED : UpdateStatusCode.CHECKING_FOR_UPDATES,
    bundleVersion: Version.bundleVersion
};

var watchers: ((status: UpdateStatus) => void)[] = [];

export const AppUpdateTracker = {
    get status() {
        return statusValue;
    },
    watch(handler: (status: UpdateStatus) => void) {
        watchers.push(handler);
    },
    unwatch(handler: (status: UpdateStatus) => void) {
        let index = watchers.findIndex((v) => v === handler);
        if (index >= 0) {
            watchers.splice(index, 1);
        } else {
            console.warn('Trying to unsubscribe unknown watcher');
        }
    },
    updateApp() {
        CodePush.restartApp(true);
    }
};

export const withUpdateTracker = (Wrapped: React.ComponentType) => {
    class TrackedComponent extends React.PureComponent {

        codePushStatusDidChange(codePushStatus: number) {
            if (__DEV__) {
                return;
            }

            switch (codePushStatus) {
                case 0:
                    statusValue = {
                        status: UpdateStatusCode.CHECKING_FOR_UPDATES,
                        bundleVersion: Version.bundleVersion
                    };
                    break;
                case 1:
                case 6:
                    statusValue = {
                        status: UpdateStatusCode.UPDATED,
                        bundleVersion: Version.bundleVersion
                    };
                    break;
                case 2:
                case 3:
                case 7:
                    statusValue = {
                        status: UpdateStatusCode.DOWNLOADING,
                        bundleVersion: Version.bundleVersion
                    };
                    break;
                case 4:
                case 5:
                    statusValue = {
                        status: UpdateStatusCode.UP_TO_DATE,
                        bundleVersion: Version.bundleVersion
                    };
                    break;
                default:
                    statusValue = {
                        status: UpdateStatusCode.UNKNOWN_ERROR,
                        bundleVersion: Version.bundleVersion
                    };
                    break;
            }
            for (let w of watchers) {
                w(statusValue);
            }
        }

        codePushDownloadDidProgress() {
            //
        }

        render() {
            return <Wrapped />;
        }
    }
    return CodePush({ checkFrequency: __DEV__ ? CodePush.CheckFrequency.MANUAL : CodePush.CheckFrequency.ON_APP_RESUME })(TrackedComponent);
};