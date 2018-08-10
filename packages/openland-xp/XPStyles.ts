
import { Platform } from 'react-native';

export type XPColor = string;

export const XPStyles = {
    colors: {
        /** Brand Main Color */
        brand: '#4747EC',
        /** Background color for lists where there are no content */
        backyard: 'white',
        /** Primary background color of the app */
        background: 'white', //  Changing this ususally leads to need to update values in platform-specific values in EVERY app
        /** Primary text color  */
        textPrimary: 'black',

        /** Selected List Item color */
        selectedListItem: Platform.select({
            default: '#f8f8fb',
            ios: '#EFF1F3',
            macos: '#4747EC'
        })
    },
    avatars: [{
        nameColor: '#FF8D00',
        placeholderTitle: 'white',
        placeholderColor: '#ffb600',
        placeholderColorStart: '#ffb600',
        placeholderColorEnd: '#ff8d00',
    }, {
        nameColor: '#FF655D',
        placeholderTitle: 'white',
        placeholderColor: '#ff655d',
        placeholderColorStart: '#ff655d',
        placeholderColorEnd: '#ff3d33',
    }, {
        nameColor: '#20A700',
        placeholderTitle: 'white',
        placeholderColor: '#59d23c',
        placeholderColorStart: '#59d23c',
        placeholderColorEnd: '#21ac00',
    }, {
        nameColor: '#1970FF',
        placeholderTitle: 'white',
        placeholderColor: '#11b2ff',
        placeholderColorStart: '#11b2ff',
        placeholderColorEnd: '#1970ff',
    }, {
        nameColor: '#00C6C8',
        placeholderTitle: 'white',
        placeholderColor: '#00d1d4',
        placeholderColorStart: '#00d1d4',
        placeholderColorEnd: '#00afc8'
    }, {
        nameColor: '#8E00E6',
        placeholderTitle: 'white',
        placeholderColor: '#aa22ff',
        placeholderColorStart: '#aa22ff',
        placeholderColorEnd: '#8e00e6'
    }]
};