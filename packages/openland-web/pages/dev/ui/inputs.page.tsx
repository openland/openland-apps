import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XInput } from 'openland-x/XInput';
import { XTitle } from 'openland-x/XTitle';

export default withApp('UI Framework - Inputs', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Inputs">
            <XContent>
                <XVertical>
                    <XTitle>Sizes</XTitle>
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
                    <XTitle>Icon & Required & Invalid</XTitle>
                    <XVertical>
                        <XInput format="large" placeholder="large" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                        <XInput format="medium" placeholder="medium" icon="star" required={true} invalid={true} alignSelf="flex-start"  />
                        <XInput format="default" placeholder="default" icon="star" required={true} invalid={true} alignSelf="flex-start"  />
                        <XInput format="small" placeholder="small" value="small" icon="star" required={true} invalid={true} alignSelf="flex-start"  />
                    </XVertical>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});