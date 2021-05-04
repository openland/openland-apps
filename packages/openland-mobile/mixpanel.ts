import { Mixpanel } from 'mixpanel-react-native';

let instance: Mixpanel | null;

export async function initMixpanel() {
    instance = await Mixpanel.init('93cdcd3b85b01b893a26933288517407');
    instance.setServerURL('https://stats.openland.com/');
}

export function tracking() {
    if (!instance) {
        throw Error('No tracking set');
    }
    return instance;
}