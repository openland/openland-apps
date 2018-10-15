import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XContent } from 'openland-x-layout/XContent';
import { XInput, XInputGroup } from 'openland-x/XInput';
import { XTitle } from 'openland-x/XTitle';
import { XTextArea } from 'openland-x/XTextArea';
import { XRichTextInput } from 'openland-x/XRichTextInput';

export default withApp('UI Framework - Inputs', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Inputs">
            <XContent>
                <XVertical>
                    <XTitle>Size</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInput size="large" placeholder="large" alignSelf="flex-start" />
                            <XInput placeholder="default" alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" alignSelf="flex-start" />
                        </XVertical>
                        <XVertical>
                            <XInput rounded={true} size="large" placeholder="large" alignSelf="flex-start" />
                            <XInput rounded={true} placeholder="default" alignSelf="flex-start" />
                            <XInput rounded={true} size="small" placeholder="small" alignSelf="flex-start" />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Group</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInputGroup>
                                <XInput size="large" placeholder="large" />
                                <XInput size="large" placeholder="large" />
                                <XInput size="large" placeholder="large" />
                            </XInputGroup>
                            <XInputGroup>
                                <XInput placeholder="default" />
                                <XInput placeholder="default" />
                                <XInput placeholder="default" />
                            </XInputGroup>
                            <XInputGroup>
                                <XInput size="small" placeholder="small" />
                                <XInput size="small" placeholder="small" />
                                <XInput size="small" placeholder="small" />
                            </XInputGroup>
                        </XVertical>
                        <XVertical>
                            <XInputGroup>
                                <XInput rounded={true} size="large" placeholder="large" />
                                <XInput rounded={true} size="large" placeholder="large" />
                                <XInput rounded={true} size="large" placeholder="large" />
                            </XInputGroup>
                            <XInputGroup>
                                <XInput rounded={true} placeholder="default" />
                                <XInput rounded={true} placeholder="default" />
                                <XInput rounded={true} placeholder="default" />
                            </XInputGroup>
                            <XInputGroup>
                                <XInput rounded={true} size="small" placeholder="small" />
                                <XInput rounded={true} size="small" placeholder="small" />
                                <XInput rounded={true} size="small" placeholder="small" />
                            </XInputGroup>
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Icon</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInput size="large" placeholder="large" icon="star" alignSelf="flex-start" />
                            <XInput placeholder="default" icon="star" alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" icon="star" alignSelf="flex-start" />
                        </XVertical>
                        <XVertical>
                            <XInput rounded={true} size="large" placeholder="large" icon="star" alignSelf="flex-start" />
                            <XInput rounded={true} placeholder="default" icon="star" alignSelf="flex-start" />
                            <XInput rounded={true} size="small" placeholder="small" icon="star" alignSelf="flex-start" />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Icon Right</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInput size="large" placeholder="large" iconRight="star" alignSelf="flex-start" />
                            <XInput placeholder="default" iconRight="star" alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" iconRight="star" alignSelf="flex-start" />
                        </XVertical>
                        <XVertical>
                            <XInput rounded={true} size="large" placeholder="large" iconRight="star" alignSelf="flex-start" />
                            <XInput rounded={true} placeholder="default" iconRight="star" alignSelf="flex-start" />
                            <XInput rounded={true} size="small" placeholder="small" iconRight="star" alignSelf="flex-start" />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Icon & Required</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInput size="large" placeholder="large" icon="star" required={true} alignSelf="flex-start" />
                            <XInput placeholder="default" icon="star" required={true} alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" icon="star" required={true} alignSelf="flex-start" />
                        </XVertical>
                        <XVertical>
                            <XInput rounded={true} size="large" placeholder="large" icon="star" required={true} alignSelf="flex-start" />
                            <XInput rounded={true} placeholder="default" icon="star" required={true} alignSelf="flex-start" />
                            <XInput rounded={true} size="small" placeholder="small" icon="star" required={true} alignSelf="flex-start" />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Icon & Required & Invalid</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInput size="large" placeholder="large" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                            <XInput placeholder="default" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                        </XVertical>
                        <XVertical>
                            <XInput rounded={true} size="large" placeholder="large" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                            <XInput rounded={true} placeholder="default" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                            <XInput rounded={true} size="small" placeholder="small" icon="star" required={true} invalid={true} alignSelf="flex-start" />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Disabled</XTitle>
                    <XHorizontal>
                        <XVertical>
                            <XInput size="large" placeholder="large" disabled={true} alignSelf="flex-start" />
                            <XInput placeholder="default" value="default" disabled={true} alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" value="small" disabled={true} alignSelf="flex-start" />
                        </XVertical>
                        <XVertical>
                            <XInput rounded={true} size="large" placeholder="large" value="large" disabled={true} alignSelf="flex-start" />
                            <XInput rounded={true} placeholder="default" value="default" disabled={true} alignSelf="flex-start" />
                            <XInput rounded={true} size="small" placeholder="small" disabled={true} alignSelf="flex-start" />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Text Area</XTitle>
                    <XHorizontal>
                        <XVertical flexGrow={1}>
                            <XTextArea resize={false} size="large" placeholder="default" />
                            <XTextArea resize={false} size="large" value="disabled" disabled={true} />
                            <XTextArea resize={false} size="large" value="invalid" invalid={true} />
                        </XVertical>
                        <XVertical flexGrow={1}>
                            <XTextArea resize={false} size="large" rounded={true} placeholder="default rounded" />
                            <XTextArea resize={false} size="large" rounded={true} value="disabled" disabled={true} />
                            <XTextArea resize={false} size="large" rounded={true} value="invalid" invalid={true} />
                        </XVertical>
                        <XVertical flexGrow={1}>
                            <XTextArea resize={false} placeholder="small" />
                            <XTextArea resize={false} value="disabled" disabled={true} />
                            <XTextArea resize={false} value="invalid" invalid={true} />
                        </XVertical>
                        <XVertical flexGrow={1}>
                            <XTextArea resize={false} rounded={true} placeholder="small rounded" />
                            <XTextArea resize={false} rounded={true} value="disabled" disabled={true} />
                            <XTextArea resize={false} rounded={true} value="invalid" invalid={true} />
                        </XVertical>
                    </XHorizontal>
                    <XTitle>Rich Text Input</XTitle>
                    <XVertical>
                        <XRichTextInput placeholder={'Try type something...'} />
                    </XVertical>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});