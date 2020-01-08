import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { View } from 'react-native';
import { PegasusHost } from 'openland-pegasus/PegasusHost';
import { PowerupSample } from 'openland-powerups/PowerupSample';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { XLoader } from 'openland-x/XLoader';

export default withApp('Pegasus', 'viewer', props => {
    return (
        <DevDocsScaffold title="Pegasus">
            <Deferred>
                <React.Suspense fallback={<XLoader loading={true} />}>
                    <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'stretch' }}>
                        <PegasusHost>
                            <PowerupSample />
                        </PegasusHost>
                    </View>
                </React.Suspense>
            </Deferred>
        </DevDocsScaffold>
    );
});