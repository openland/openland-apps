import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XLocationPickerModal } from 'openland-x-map/XLocationPickerModal';

export default withApp('UI Framework - LocationPicker', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Location Picker">
            <XContent>
                <XLocationPickerModal />
            </XContent>
        </DevDocsScaffold >
    );
});