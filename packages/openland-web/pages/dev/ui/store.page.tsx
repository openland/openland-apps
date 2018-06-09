import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XStore } from 'openland-x-store/XStore';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XInput } from 'openland-x/XInput';
export default withApp('UI Framework - Sliders', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Sliders">
            <XContent>
                <XVertical>
                    <XStore onChanged={(data) => console.warn(data)}>
                        <XStoreContext.Consumer>
                            {(store) => (
                                <>
                                    <XInput value={store!!.readValue('state')} onChange={(value) => store!!.writeValue('state', value)} />
                                    <XInput value={store!!.readValue('state')} onChange={(value) => store!!.writeValue('state', value)} />
                                </>
                            )}
                        </XStoreContext.Consumer>
                    </XStore>
                    {/* <XTitle>Sliders</XTitle>
                    <XSlider min={0} max={100} />
                    <XTitle>Range</XTitle>
                    <XRange min={0} max={100} /> */}
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});