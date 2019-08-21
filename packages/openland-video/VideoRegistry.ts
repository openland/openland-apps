import * as React from 'react';

class VideoRegistryImpl {
    private _templates = new Map<string, { el: React.ReactElement, duration: number }>();

    register = (name: string, el: React.ReactElement, duration: number) => {
        this._templates.set(name, { el, duration });
    }

    resolve = (name: string) => {
        let t = this._templates.get(name);
        if (!t) {
            throw Error('Unable to find video ' + name);
        }
        return { el: t.el, duration: t.duration };
    }
}

export const VideoRegistry = new VideoRegistryImpl();