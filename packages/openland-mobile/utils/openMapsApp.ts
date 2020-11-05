import { Linking, Platform } from 'react-native';
import { normalizeLocation } from 'openland-y-utils/getLocationUrl';

export const openMapsApp = async (location: string | null | undefined) => {
    if (!location) {
        return;
    }

    const locationNormalized = normalizeLocation(location);
    const link = Platform.select({
        ios: `http://maps.apple.com/?address=${locationNormalized}`,
        android: `http://maps.google.com/maps?q=${location}`,
    });

    if (await Linking.canOpenURL(link)) {
        await Linking.openURL(link);
    }
};