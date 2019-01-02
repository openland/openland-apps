import { XSidebar } from './XSidebar';
import { XStyleFactoryRegistry } from 'react-mental';
import { css } from 'glamor';

XStyleFactoryRegistry.registerFactory({
    createStyle: styles => {
        return css(styles).toString();
    },
});

export default {
    name: 'XSidebar',
    component: XSidebar,
    props: { title: 'Title' }
};