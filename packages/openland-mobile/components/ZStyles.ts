import { Platform } from 'react-native';
import { PlaceholderRed, PlaceholderOrange, PlaceholderGreen, PlaceholderBlue, PlaceholderCyan, PlaceholderPurple } from 'openland-y-utils/themes/placeholders';

export const ZStyles = {
    selectedListItem: Platform.select({
        default: '#E0E0E0',
        ios: '#EFF1F3',
        macos: '#4747EC'
    }),
    avatars: [{
        placeholderColor: PlaceholderOrange.start,
        placeholderColorStart: PlaceholderOrange.start,
        placeholderColorEnd: PlaceholderOrange.end,
    }, {
        placeholderColor: PlaceholderRed.start,
        placeholderColorStart: PlaceholderRed.start,
        placeholderColorEnd: PlaceholderRed.end
    }, {
        placeholderColor: PlaceholderGreen.start,
        placeholderColorStart: PlaceholderGreen.start,
        placeholderColorEnd: PlaceholderGreen.end
    }, {
        placeholderColor: PlaceholderBlue.start,
        placeholderColorStart: PlaceholderBlue.start,
        placeholderColorEnd: PlaceholderBlue.end
    }, {
        placeholderColor: PlaceholderCyan.start,
        placeholderColorStart: PlaceholderCyan.start,
        placeholderColorEnd: PlaceholderCyan.end
    }, {
        placeholderColor: PlaceholderPurple.start,
        placeholderColorStart: PlaceholderPurple.start,
        placeholderColorEnd: PlaceholderPurple.end
    }]
};