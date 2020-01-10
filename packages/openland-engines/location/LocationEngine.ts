import { AppGeolocation } from 'openland-y-runtime/AppGeolocation';
import { MessengerEngine } from 'openland-engines/MessengerEngine';

export class LocationEngine {
    readonly engine: MessengerEngine;
    private allowed = false;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
    }

    start = () => {
        (async () => {
            let initialState = await AppGeolocation.permissionState();
            this.permissionsChanged(initialState);
            AppGeolocation.watchPermissions((state) => {
                this.permissionsChanged(state);
            });
        })();
    }

    private permissionsChanged = (state: 'initial' | 'allow' | 'deny' | 'unsupported') => {
        console.log('[LOCATION]: Permissions: ' + state);
        if (state === 'allow') {
            if (this.allowed) {
                this.allowed = true;
                this.startSharing();
            }
        } else {
            if (this.allowed) {
                this.allowed = false;
                this.stopSharing();
            }
        }
    }

    private startSharing = () => {
        //
    }

    private stopSharing = () => {
        //
    }
}