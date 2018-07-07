import { backoff } from 'openland-x-utils/timer';
import { Router } from '../../../../routes';

export class Notifications {
    private notify = backoff(() => import('notifyjs'));
    constructor() {
        this.notify.then((v) => {
            if ((v as any).needsPermission && (v as any).isSupported()) {
                (v as any).requestPermission();
            }
        });
    }

    displayNotification = (title: string, body: string, path: string) => {
        console.warn('notification');
        this.notify.then((v) => {
            if (!(v as any).needsPermission) {
                let not = new (v as any)(title, {
                    body: body,
                    notifyClick: function() {
                        // if (this.close) {
                        //     this.close.close();
                        //     this.close = null;
                        // }
                        Router.replaceRoute(path);
                        window.focus();
                        this.close();
                    }
                });
                not.show();
            }
        });
    }
}