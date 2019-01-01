import { XAppBar } from './XAppBar';
import { XStyleFactoryRegistry } from 'react-mental';
import { css } from 'glamor';

XStyleFactoryRegistry.registerFactory({
    createStyle: styles => {
        return css(styles).toString();
    },
});

export default {
    name: 'XAppBar',
    component: XAppBar,
    props: { title: 'Title' }
};