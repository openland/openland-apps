import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XStore } from 'openland-y-store/XStore';
import { XInput } from 'openland-x/XInput';
import { XTitle } from 'openland-x/XTitle';
import { XTextArea } from 'openland-x/XTextArea';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XButton } from 'openland-x/XButton';
import { XVertical2 } from 'openland-x/XVertical2';
export default withApp('UI Framework - Store', 'viewer', props => {
    return (
        <DevDocsScaffold title="Store">
            <XContent>
                <XVertical2>
                    <XStore
                        onChanged={data => console.warn(data)}
                        defaultData={{ stage: 'Hello!' }}
                    >
                        <XVertical2>
                            <XTitle>Simple</XTitle>
                            <XInput valueStoreKey="stage" />
                            <XInput valueStoreKey="stage" />
                            <XTextArea valueStoreKey="stage" />
                            <XTitle>Invalid</XTitle>
                            <XInput invalidStoreKey="stage" />
                            <XTitle>Reset</XTitle>
                            <XStoreContext.Consumer>
                                {store => {
                                    return (
                                        <XButton
                                            onClick={store!!.reset}
                                            text="Reset to defaults"
                                            alignSelf="flex-start"
                                        />
                                    );
                                }}
                            </XStoreContext.Consumer>
                        </XVertical2>
                    </XStore>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
