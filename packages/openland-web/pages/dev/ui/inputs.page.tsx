import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XContent } from 'openland-x-layout/XContent';
import { XInput } from 'openland-x/XInput';
import { XTitle } from 'openland-x/XTitle';
import { XTextArea } from 'openland-x/XTextArea';
import { XRichTextInput } from 'openland-x/XRichTextInput';

export default withApp('UI Framework - Inputs', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Inputs">
            <XContent>
                <XVertical>
                    <XTitle>Sizes</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInput size="large" placeholder="large" value="large" alignSelf="flex-start" />
                            <XInput size="medium" placeholder="medium" alignSelf="flex-start" />
                            <XInput size="default" placeholder="default" alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" alignSelf="flex-start" />
                        </XVertical>
                        <XVertical>
                            <XInput size="r-default" color="primary-sky-blue" placeholder="r-default" value="r-default" alignSelf="flex-start" />
                            <XInput size="r-small" color="primary-sky-blue" placeholder="r-small" alignSelf="flex-start" />
                            <XInput size="r-tiny" color="primary-sky-blue" placeholder="r-tiny" alignSelf="flex-start" />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Icon</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInput size="large" placeholder="large" icon="star" alignSelf="flex-start" />
                            <XInput size="medium" placeholder="medium" value="medium" icon="star" alignSelf="flex-start" />
                            <XInput size="default" placeholder="default" icon="star" alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" icon="star" alignSelf="flex-start" />
                        </XVertical>
                        <XVertical>
                            <XInput size="r-default" color="primary-sky-blue" placeholder="r-default" icon="star" alignSelf="flex-start" />
                            <XInput size="r-small" color="primary-sky-blue" placeholder="r-small" icon="star" alignSelf="flex-start" />
                            <XInput size="r-tiny" color="primary-sky-blue" placeholder="r-tiny" icon="star" alignSelf="flex-start" />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Icon Right</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInput size="large" placeholder="large" iconRight="star" alignSelf="flex-start" />
                            <XInput size="medium" placeholder="medium" value="medium" iconRight="star" alignSelf="flex-start" />
                            <XInput size="default" placeholder="default" iconRight="star" alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" iconRight="star" alignSelf="flex-start" />
                        </XVertical>
                        <XVertical>
                            <XInput size="r-default" color="primary-sky-blue" placeholder="r-default" iconRight="star" alignSelf="flex-start" />
                            <XInput size="r-small" color="primary-sky-blue" placeholder="r-small" iconRight="star" alignSelf="flex-start" />
                            <XInput size="r-tiny" color="primary-sky-blue" placeholder="r-tiny" iconRight="star" alignSelf="flex-start" />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Icon & Required</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInput size="large" placeholder="large" icon="star" required={true} alignSelf="flex-start" />
                            <XInput size="medium" placeholder="medium" icon="star" required={true} alignSelf="flex-start" />
                            <XInput size="default" placeholder="default" value="default" icon="star" required={true} alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" icon="star" required={true} alignSelf="flex-start" />
                        </XVertical>
                        <XVertical>
                            <XInput size="r-default" color="primary-sky-blue" placeholder="r-default" icon="star" required={true} alignSelf="flex-start" />
                            <XInput size="r-small" color="primary-sky-blue" placeholder="r-small" icon="star" required={true} alignSelf="flex-start" />
                            <XInput size="r-tiny" color="primary-sky-blue" placeholder="r-tiny" icon="star" required={true} alignSelf="flex-start" />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Icon & Required & Invalid</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInput size="large" placeholder="large" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                            <XInput size="medium" placeholder="medium" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                            <XInput size="default" placeholder="default" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" value="small" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                        </XVertical>
                        <XVertical>
                            <XInput size="r-default" color="primary-sky-blue" placeholder="r-default" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                            <XInput size="r-small" color="primary-sky-blue" placeholder="r-small" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                            <XInput size="r-tiny" color="primary-sky-blue" placeholder="r-tiny" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Disabled</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInput size="large" placeholder="large" disabled={true} alignSelf="flex-start" />
                            <XInput size="medium" placeholder="medium" value="some text" disabled={true} alignSelf="flex-start" />
                            <XInput size="default" placeholder="default" disabled={true} alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" value="some text" disabled={true} alignSelf="flex-start" />
                        </XVertical>
                        <XVertical>
                            <XInput size="r-default" color="primary-sky-blue" placeholder="r-default" value="some text" disabled={true} alignSelf="flex-start" />
                            <XInput size="r-small" color="primary-sky-blue" placeholder="r-small" disabled={true} alignSelf="flex-start" />
                            <XInput size="r-tiny" color="primary-sky-blue" placeholder="r-tiny" value="some text" disabled={true} alignSelf="flex-start" />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Text Area</XTitle>
                    <XVertical>
                        <XTextArea />
                        <XTextArea value="disabled" disabled={true} />
                        <XTextArea invalid={true} />
                    </XVertical>
                    <XTitle>Rich Text Input</XTitle>
                    <XVertical>
                        <XRichTextInput placeholder={'Try type something...'} />
                    </XVertical>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});