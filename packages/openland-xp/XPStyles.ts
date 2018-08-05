import { placeholder } from '../../node_modules/glamor';

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
    },
    avatars: [{
        nameColor: '#FF8D00',
        placeholderTitle: 'white',
        placeholderColorStart: '#ffb600',
        placeholderColorEnd: '#ff8d00',
    }, {
        nameColor: '#FF655D',
        placeholderTitle: 'white',
        placeholderColorStart: '#ff655d',
        placeholderColorEnd: '#ff3d33',
    }, {
        nameColor: '#20A700',
        placeholderTitle: 'white',
        placeholderColorStart: '#59d23c',
        placeholderColorEnd: '#21ac00',
    }, {
        nameColor: '#1970FF',
        placeholderTitle: 'white',
        placeholderColorStart: '#11b2ff',
        placeholderColorEnd: '#1970ff',
    }, {
        nameColor: '#00C6C8',
        placeholderTitle: 'white',
        placeholderColorStart: '#00d1d4',
        placeholderColorEnd: '#00afc8'
    }, {
        nameColor: '##8E00E6',
        placeholderTitle: 'white',
        placeholderColorStart: '#aa22ff',
        placeholderColorEnd: '#8e00e6'
    }]
};