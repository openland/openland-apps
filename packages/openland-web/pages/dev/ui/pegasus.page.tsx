import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { View } from 'react-native';
import { PegasusHost } from 'openland-pegasus/PegasusHost';
import { PowerupSample } from 'openland-powerups/PowerupSample';

export default withApp('Pegasus', 'viewer', props => {
    return (
        <DevDocsScaffold title="Pegasus">
            <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'stretch' }}>
                <PegasusHost>
                    <PowerupSample />
                </PegasusHost>
            </View>
        </DevDocsScaffold>
    );
});