import { canUseDOM } from 'openland-y-utils/canUseDOM';
import * as React from 'react';
import { emojiData } from "openland-y-utils/data/emoji-data";

let dt = emojiData.filter((v) => !!v.r)
    .sort((a, b) => b.r! - a.r!);
const defaultCollection = dt.slice(0, 16).map((v) => ({ name: v.n, value: v.v, sprite: v.sc, used: 0 }));

let recent = defaultCollection;
let frequencies = new Map<string, number>();
let listeners: (() => void)[] = [];

if (canUseDOM) {
    try {
        let ex = localStorage.getItem('frequent-emoji');
        if (ex) {
            let e = JSON.parse(ex) as { name: string, count: number }[];
            for (let i of e) {
                frequencies.set(i.name, i.count);
            }
        }
    } catch (e) {
        console.warn(e);
    }

    try {
        let ex = localStorage.getItem('frequent-emoji-recent');
        if (ex) {
            let r: { name: string, value: string, sprite: string, used: number }[] = [];
            let e = JSON.parse(ex) as string[];
            for (let i of e) {
                let exe = emojiData.find((v) => v.n === i);
                if (exe) {
                    r.push({ name: exe.n, value: exe.v, sprite: exe.sc, used: frequencies.get(exe.n) || 0 });
                }
            }
            let ind = 0;
            while (r.length < 16) {
                r.push(defaultCollection[ind]);
                ind++;
            }
            r = r.sort((a, b) => b.used - a.used);
            recent = r;
        }
    } catch (e) {
        console.warn(e);
    }
}

export function getRecent() {
    return [...recent];
}

export function useRecent() {
    let [res, setRes] = React.useState(recent);
    React.useEffect(() => {
        let callback = () => {
            setRes(recent);
        };
        listeners.push(callback);
        return () => {
            listeners.splice(listeners.indexOf(callback), 1);
        };
    }, []);
    return [...res];
}

export function onEmojiSent(name: string) {
    if (frequencies.has(name)) {
        frequencies.set(name, frequencies.get(name)! + 1);
    } else {
        frequencies.set(name, 1);
    }

    // Store frequencies
    let fr: any[] = [];
    for (let k of frequencies) {
        fr.push({ name: k[0], count: k[1] });
    }
    localStorage.setItem('frequent-emoji', JSON.stringify(fr));

    // Update recents
    let exr = recent.find((v) => v.name === name);
    if (!exr) {
        // Add to recent if missing
        let r = recent.slice(0, 15);
        let ex = emojiData.find((v) => v.n === name)!;
        r.push({ name: ex.n, value: ex.v, sprite: ex.sc, used: frequencies.get(name)! });
        r = r.sort((a, b) => b.used - a.used);
        recent = r;

        for (let l of listeners) {
            l();
        }
    } else {
        // Update frequency
        exr.used = frequencies.get(name)!;
        // Sort recent
        let r = [...recent];
        r = r.sort((a, b) => b.used - a.used);
        recent = r;
        console.log(recent);
        for (let l of listeners) {
            l();
        }
    }

    localStorage.setItem('frequent-emoji-recent', JSON.stringify(recent.map((v) => v.name)));
}