import { Mixpanel, MixpanelProperties } from 'mixpanel-react-native';

let pending: ((src: Mixpanel) => void)[] = [];
let instance: Mixpanel | null;

export async function initMixpanel() {
    if (instance) {
        return;
    }
    instance = await Mixpanel.init('93cdcd3b85b01b893a26933288517407');
    instance.setServerURL('https://stats.openland.com/');
    for (let p of pending) {
        p(instance);
    }
}

function withInstance(handler: (src: Mixpanel) => void) {
    if (instance) {
        handler(instance);
    } else {
        pending.push(handler);
    }
}

export const tracker = {
    track: (eventName: string, properties?: MixpanelProperties) => {
        withInstance((src) => src.track(eventName, properties));
    },
    identify: (distinctId: string) => {
        withInstance((src) => src.identify(distinctId));
    },
    people: {
        set: (prop: string, value: any) => {
            withInstance((src) => src.getPeople().set(prop, value));
        },
        setOnce: (prop: string, value: any) => {
            withInstance((src) => src.getPeople().setOnce(prop, value));
        },
        increment: (prop: string, by: number) => {
            withInstance((src) => src.getPeople().increment(prop, by));
        },
        append: (prop: string, value: any) => {
            withInstance((src) => src.getPeople().append(prop, value));
        },
        union: (prop: string, value: Array<any>) => {
            withInstance((src) => src.getPeople().union(prop, value));
        },
        unset: (prop: string) => {
            withInstance((src) => src.getPeople().unset(prop));
        }
    }
};