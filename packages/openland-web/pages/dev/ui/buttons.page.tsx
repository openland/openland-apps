import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XTitle } from 'openland-x/XTitle';

export default withApp('UI Framework - Buttons', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Buttons">
            <XContent>
                <XVertical>
                    <XTitle>Sizes</XTitle>
                    <XHorizontal>
                        <XButton size="large" text="large" />
                        <XButton text="default" />
                        <XButton size="small" text="small" />
                        <XButton size="tiny" text="tiny" />
                    </XHorizontal>
                    <XTitle>Styles</XTitle>
                    <XHorizontal>
                        <XButton text="default" />
                        <XButton style="primary" text="primary" />
                        <XButton style="success" text="success" />
                        <XButton style="danger" text="danger" />
                        <XButton style="ghost" text="ghost" />
                        <XButton style="electric" text="electric" />
                        <XButton style="flat" text="flat" />
                        <XButton style="light" text="light" />
                        <XButton style="link" text="link" />
                        <XButton style="link-danger" text="link-danger" />
                    </XHorizontal>
                    <XTitle>Icons</XTitle>
                    <XHorizontal>
                        <XButton icon="star" size="large" text="large" />
                        <XButton icon="star" text="default" />
                        <XButton icon="star" size="small" text="small" />
                        <XButton icon="star" size="tiny" text="tiny" />
                    </XHorizontal>
                    <XHorizontal>
                        <XButton iconRight="star" size="large" text="large" />
                        <XButton iconRight="star" text="default" />
                        <XButton iconRight="star" size="small" text="small" />
                        <XButton iconRight="star" size="tiny" text="tiny" />
                    </XHorizontal>
                    <XHorizontal>
                        <XButton icon="star" iconRight="star" text="default" />
                        <XButton icon="star" iconRight="star" style="primary" text="primary" />
                        <XButton icon="star" iconRight="star" style="success" text="success" />
                        <XButton icon="star" iconRight="star" style="danger" text="danger" />
                    </XHorizontal>
                    <XHorizontal>
                        <XButton icon="star" iconRight="star" style="ghost" text="ghost" />
                        <XButton icon="star" iconRight="star" style="electric" text="electric" />
                        <XButton icon="star" iconRight="star" style="flat" text="flat" />
                        <XButton icon="star" iconRight="star" style="light" text="light" />
                    </XHorizontal>
                    <XTitle>Loading</XTitle>
                    <XHorizontal>
                        <XButton loading={true} text="default" />
                        <XButton loading={true} style="primary" text="primary" />
                        <XButton loading={true} style="success" text="success" />
                        <XButton loading={true} style="danger" text="danger" />
                        <XButton loading={true} style="ghost" text="ghost" />
                        <XButton loading={true} style="electric" text="electric" />
                        <XButton loading={true} style="flat" text="flat" />
                        <XButton loading={true} style="light" text="light" />
                    </XHorizontal>
                    <XTitle>Disabled</XTitle>
                    <XHorizontal>
                        <XButton enabled={false} text="default" />
                        <XButton enabled={false} style="primary" text="primary" />
                        <XButton enabled={false} style="danger" text="danger" />
                        <XButton enabled={false} style="ghost" text="ghost" />
                        <XButton enabled={false} style="electric" text="electric" />
                        <XButton enabled={false} style="flat" text="flat" />
                        <XButton enabled={false} style="light" text="light" />
                    </XHorizontal>
                    <XTitle>Pressed</XTitle>
                    <XHorizontal>
                        <XButton pressed={true} text="default" />
                        <XButton pressed={true} style="primary" text="primary" />
                        <XButton pressed={true} style="danger" text="danger" />
                        <XButton pressed={true} style="ghost" text="ghost" />
                        <XButton pressed={true} style="electric" text="electric" />
                        <XButton pressed={true} style="flat" text="flat" />
                        <XButton pressed={true} style="light" text="light" />
                    </XHorizontal>
                    <XTitle>Responsive button</XTitle>
                    <XHorizontal>
                        <XButton text="left (custom breakpoint)" breakpoint={1400} tooltipPlacement="left" iconResponsive="star" />
                        <XButton text="top" tooltipPlacement="top" iconResponsive="star" />
                        <XButton text="bottom" tooltipPlacement="bottom" iconResponsive="star" />
                        <XButton text="right" tooltipPlacement="right" iconResponsive="star" />
                    </XHorizontal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});