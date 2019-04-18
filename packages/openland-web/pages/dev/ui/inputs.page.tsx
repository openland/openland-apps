import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XContent } from 'openland-x-layout/XContent';
import { XInput, XInputGroup } from 'openland-x/XInput';
import { XTitle } from 'openland-x/XTitle';
import { XTextArea } from 'openland-x/XTextArea';
import { XRichTextInput } from 'openland-x/XRichTextInput';
import { XVertical2 } from 'openland-x/XVertical2';

export default withApp('UI Framework - Inputs', 'viewer', props => {
    return (
        <DevDocsScaffold title="Inputs">
            <XContent>
                <XVertical2>
                    <XTitle>Size</XTitle>
                    <XHorizontal>
                        <XVertical2>
                            <XInput size="large" placeholder="large" alignSelf="flex-start" />
                            <XInput placeholder="default" alignSelf="flex-start" />
                            <XInput size="small" placeholder="small" alignSelf="flex-start" />
                        </XVertical2>
                        <XVertical2>
                            <XInput
                                rounded={true}
                                size="large"
                                placeholder="large"
                                alignSelf="flex-start"
                            />
                            <XInput rounded={true} placeholder="default" alignSelf="flex-start" />
                            <XInput
                                rounded={true}
                                size="small"
                                placeholder="small"
                                alignSelf="flex-start"
                            />
                        </XVertical2>
                    </XHorizontal>
                    <XTitle>With title</XTitle>
                    <XHorizontal>
                        <XVertical2>
                            <XInput size="large" title="large" alignSelf="flex-start" />
                            <XInput title="default" alignSelf="flex-start" />
                            <XInput size="small" title="small" alignSelf="flex-start" />
                        </XVertical2>
                        <XVertical2>
                            <XInput
                                required={true}
                                rounded={true}
                                size="large"
                                title="large"
                                alignSelf="flex-start"
                            />
                            <XInput
                                required={true}
                                rounded={true}
                                title="default"
                                alignSelf="flex-start"
                            />
                            <XInput
                                required={true}
                                rounded={true}
                                size="small"
                                title="small"
                                alignSelf="flex-start"
                            />
                        </XVertical2>
                    </XHorizontal>
                    <XTitle>Group</XTitle>
                    <XHorizontal>
                        <XVertical2>
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
                        </XVertical2>
                        <XVertical2>
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
                        </XVertical2>
                    </XHorizontal>
                    <XTitle>Icon</XTitle>
                    <XHorizontal>
                        <XVertical2>
                            <XInput
                                size="large"
                                placeholder="large"
                                icon="star"
                                alignSelf="flex-start"
                            />
                            <XInput placeholder="default" icon="star" alignSelf="flex-start" />
                            <XInput
                                size="small"
                                placeholder="small"
                                icon="star"
                                alignSelf="flex-start"
                            />
                        </XVertical2>
                        <XVertical2>
                            <XInput
                                rounded={true}
                                size="large"
                                placeholder="large"
                                icon="star"
                                alignSelf="flex-start"
                            />
                            <XInput
                                rounded={true}
                                placeholder="default"
                                icon="star"
                                alignSelf="flex-start"
                            />
                            <XInput
                                rounded={true}
                                size="small"
                                placeholder="small"
                                icon="star"
                                alignSelf="flex-start"
                            />
                        </XVertical2>
                    </XHorizontal>
                    <XTitle>Icon Right</XTitle>
                    <XHorizontal>
                        <XVertical2>
                            <XInput
                                size="large"
                                placeholder="large"
                                iconRight="star"
                                alignSelf="flex-start"
                            />
                            <XInput placeholder="default" iconRight="star" alignSelf="flex-start" />
                            <XInput
                                size="small"
                                placeholder="small"
                                iconRight="star"
                                alignSelf="flex-start"
                            />
                        </XVertical2>
                        <XVertical2>
                            <XInput
                                rounded={true}
                                size="large"
                                placeholder="large"
                                iconRight="star"
                                alignSelf="flex-start"
                            />
                            <XInput
                                rounded={true}
                                placeholder="default"
                                iconRight="star"
                                alignSelf="flex-start"
                            />
                            <XInput
                                rounded={true}
                                size="small"
                                placeholder="small"
                                iconRight="star"
                                alignSelf="flex-start"
                            />
                        </XVertical2>
                    </XHorizontal>
                    <XTitle>Icon & Required</XTitle>
                    <XHorizontal>
                        <XVertical2>
                            <XInput
                                size="large"
                                placeholder="large"
                                icon="star"
                                required={true}
                                alignSelf="flex-start"
                            />
                            <XInput
                                placeholder="default"
                                icon="star"
                                required={true}
                                alignSelf="flex-start"
                            />
                            <XInput
                                size="small"
                                placeholder="small"
                                icon="star"
                                required={true}
                                alignSelf="flex-start"
                            />
                        </XVertical2>
                        <XVertical2>
                            <XInput
                                rounded={true}
                                size="large"
                                placeholder="large"
                                icon="star"
                                required={true}
                                alignSelf="flex-start"
                            />
                            <XInput
                                rounded={true}
                                placeholder="default"
                                icon="star"
                                required={true}
                                alignSelf="flex-start"
                            />
                            <XInput
                                rounded={true}
                                size="small"
                                placeholder="small"
                                icon="star"
                                required={true}
                                alignSelf="flex-start"
                            />
                        </XVertical2>
                    </XHorizontal>
                    <XTitle>Icon & Required & Invalid</XTitle>
                    <XHorizontal>
                        <XVertical2>
                            <XInput
                                size="large"
                                placeholder="large"
                                icon="star"
                                required={true}
                                invalid={true}
                                alignSelf="flex-start"
                            />
                            <XInput
                                placeholder="default"
                                icon="star"
                                required={true}
                                invalid={true}
                                alignSelf="flex-start"
                            />
                            <XInput
                                size="small"
                                placeholder="small"
                                icon="star"
                                required={true}
                                invalid={true}
                                alignSelf="flex-start"
                            />
                        </XVertical2>
                        <XVertical2>
                            <XInput
                                rounded={true}
                                size="large"
                                placeholder="large"
                                icon="star"
                                required={true}
                                invalid={true}
                                alignSelf="flex-start"
                            />
                            <XInput
                                rounded={true}
                                placeholder="default"
                                icon="star"
                                required={true}
                                invalid={true}
                                alignSelf="flex-start"
                            />
                            <XInput
                                rounded={true}
                                size="small"
                                placeholder="small"
                                icon="star"
                                required={true}
                                invalid={true}
                                alignSelf="flex-start"
                            />
                        </XVertical2>
                    </XHorizontal>
                    <XTitle>Disabled</XTitle>
                    <XHorizontal>
                        <XVertical2>
                            <XInput
                                size="large"
                                placeholder="large"
                                disabled={true}
                                alignSelf="flex-start"
                            />
                            <XInput
                                placeholder="default"
                                value="default"
                                disabled={true}
                                alignSelf="flex-start"
                            />
                            <XInput
                                size="small"
                                placeholder="small"
                                value="small"
                                disabled={true}
                                alignSelf="flex-start"
                            />
                        </XVertical2>
                        <XVertical2>
                            <XInput
                                rounded={true}
                                size="large"
                                placeholder="large"
                                value="large"
                                disabled={true}
                                alignSelf="flex-start"
                            />
                            <XInput
                                rounded={true}
                                placeholder="default"
                                value="default"
                                disabled={true}
                                alignSelf="flex-start"
                            />
                            <XInput
                                rounded={true}
                                size="small"
                                placeholder="small"
                                disabled={true}
                                alignSelf="flex-start"
                            />
                        </XVertical2>
                    </XHorizontal>
                    <XTitle>Text Area</XTitle>
                    <XHorizontal>
                        <XVertical2 flexGrow={1}>
                            <XTextArea resize={false} size="large" placeholder="default" />
                            <XTextArea
                                resize={false}
                                size="large"
                                value="disabled"
                                disabled={true}
                            />
                            <XTextArea resize={false} size="large" value="invalid" invalid={true} />
                        </XVertical2>
                        <XVertical2 flexGrow={1}>
                            <XTextArea
                                resize={false}
                                size="large"
                                rounded={true}
                                placeholder="default rounded"
                            />
                            <XTextArea
                                resize={false}
                                size="large"
                                rounded={true}
                                value="disabled"
                                disabled={true}
                            />
                            <XTextArea
                                resize={false}
                                size="large"
                                rounded={true}
                                value="invalid"
                                invalid={true}
                            />
                        </XVertical2>
                        <XVertical2 flexGrow={1}>
                            <XTextArea resize={false} placeholder="small" />
                            <XTextArea resize={false} value="disabled" disabled={true} />
                            <XTextArea resize={false} value="invalid" invalid={true} />
                        </XVertical2>
                        <XVertical2 flexGrow={1}>
                            <XTextArea resize={false} rounded={true} placeholder="small rounded" />
                            <XTextArea
                                resize={false}
                                rounded={true}
                                value="disabled"
                                disabled={true}
                            />
                            <XTextArea
                                resize={false}
                                rounded={true}
                                value="invalid"
                                invalid={true}
                            />
                        </XVertical2>
                    </XHorizontal>
                    <XHorizontal>
                        <XVertical2 flexGrow={1}>
                            <XTextArea
                                mode="modern"
                                title="title"
                                resize={false}
                                rounded={true}
                                placeholder="modern "
                            />
                            <XTextArea
                                title="title"
                                mode="modern"
                                resize={false}
                                rounded={true}
                                value="disabled"
                                disabled={true}
                            />
                            <XTextArea
                                title="title"
                                mode="modern"
                                resize={false}
                                rounded={true}
                                value="invalid"
                                invalid={true}
                            />
                        </XVertical2>
                        <XVertical2 flexGrow={1}>
                            <XTextArea
                                size="large"
                                mode="modern"
                                title="title"
                                resize={false}
                                rounded={true}
                                placeholder="modern large"
                            />
                            <XTextArea
                                size="large"
                                title="title"
                                mode="modern"
                                resize={false}
                                rounded={true}
                                value="disabled large"
                                disabled={true}
                            />
                            <XTextArea
                                size="large"
                                title="title"
                                mode="modern"
                                resize={false}
                                rounded={true}
                                value="invalid large"
                                invalid={true}
                            />
                        </XVertical2>
                    </XHorizontal>
                    <XTitle>Rich Text Input</XTitle>
                    <XVertical2>
                        <XRichTextInput placeholder={'Try type something...'} value={''} />
                    </XVertical2>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
