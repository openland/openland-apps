import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { XVertical } from '../../../components/X/XVertical';
import { XContent } from '../../../components/X/XContent';
import { XInput } from 'openland-x/XInput';
import { XTitle } from '../../../components/X/XTitle';

export default withApp('UI Framework - Inputs', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Inputs">
            <XContent>
                <XVertical>
                    <XTitle>XInput</XTitle>
                    <XVertical>
                        <XInput format="large" placeholder="large" value="large" alignSelf="flex-start" />
                        <XInput format="medium" placeholder="medium" alignSelf="flex-start" />
                        <XInput format="default" placeholder="default" alignSelf="flex-start" />
                        <XInput format="small" placeholder="small" alignSelf="flex-start" />
                    </XVertical>
                    <XTitle>Icon</XTitle>
                    <XVertical>
                        <XInput format="large" placeholder="large" icon="star" alignSelf="flex-start" />
                        <XInput format="medium" placeholder="medium" value="medium" icon="star" alignSelf="flex-start" />
                        <XInput format="default" placeholder="default" icon="star" alignSelf="flex-start" />
                        <XInput format="small" placeholder="small" icon="star" alignSelf="flex-start" />
                    </XVertical>
                    <XTitle>Icon & Required</XTitle>
                    <XVertical>
                        <XInput format="large" placeholder="large" icon="star" required={true} alignSelf="flex-start" />
                        <XInput format="medium" placeholder="medium" icon="star" required={true} alignSelf="flex-start"  />
                        <XInput format="default" placeholder="default" value="default" icon="star" required={true} alignSelf="flex-start"  />
                        <XInput format="small" placeholder="small" icon="star" required={true} alignSelf="flex-start"  />
                    </XVertical>
                    <XTitle>Icon & Required & Novalid</XTitle>
                    <XVertical>
                        <XInput format="large" placeholder="large" icon="star" required={true} noValid={true} alignSelf="flex-start" />
                        <XInput format="medium" placeholder="medium" icon="star" required={true} noValid={true} alignSelf="flex-start"  />
                        <XInput format="default" placeholder="default" icon="star" required={true} noValid={true} alignSelf="flex-start"  />
                        <XInput format="small" placeholder="small" value="small" icon="star" required={true} noValid={true} alignSelf="flex-start"  />
                    </XVertical>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});