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
                        <XButton size="x-large" text="x-large" />
                        <XButton size="large" text="large" />
                        <XButton size="medium" text="medium" />
                        <XButton text="default" />
                        <XButton size="small" text="small" />
                    </XHorizontal>
                    <XTitle>Styles</XTitle>
                    <XHorizontal>
                        <XButton style="primary" text="primary" />
                        <XButton style="danger" text="danger" />
                        <XButton text="default" />
                        <XButton style="ghost" text="ghost" />
                        <XButton style="electric" text="electric" />
                        <XButton style="flat" text="flat" />
                    </XHorizontal>
                    <XTitle>Icons</XTitle>
                    <XHorizontal>
                        <XButton size="x-large" text="x-large" icon="star" />
                        <XButton size="large" text="large" icon="star" />
                        <XButton size="medium" text="medium" icon="star" />
                        <XButton text="default" icon="star" />
                        <XButton size="small" text="small" icon="star" />
                    </XHorizontal>
                    <XTitle>Loading</XTitle>
                    <XHorizontal>
                        <XButton style="primary" loading={true} text="primary" />
                        <XButton style="danger" loading={true} text="danger" />
                        <XButton loading={true} text="default" />
                        <XButton style="ghost" loading={true} text="ghost" />
                        <XButton style="electric" loading={true} text="electric" />
                        <XButton style="flat" loading={true} text="flat" />
                    </XHorizontal>
                    <XTitle>Loading</XTitle>
                    <XHorizontal>
                        <XButton size="x-large" style="primary" loading={true} text="primary" />
                        <XButton size="large" style="danger" loading={true} text="danger" />
                        <XButton size="medium" loading={true} text="default" />
                        <XButton size="default" style="ghost" loading={true} text="ghost" />
                        <XButton size="small" style="electric" loading={true} text="electric" />
                    </XHorizontal>
                    <XTitle>Disabled</XTitle>
                    <XHorizontal>
                        <XButton style="primary" text="primary" disabled={true} />
                        <XButton style="danger" text="danger" disabled={true} />
                        <XButton text="default" disabled={true} />
                        <XButton style="ghost" text="ghost" disabled={true} />
                        <XButton style="electric" text="electric" disabled={true} />
                        <XButton style="flat" text="flat" disabled={true} />
                    </XHorizontal>
                    <XTitle>Pressed</XTitle>
                    <XHorizontal>
                        <XButton style="primary" text="primary" pressed={true} />
                        <XButton style="danger" text="danger" pressed={true} />
                        <XButton text="default" pressed={true} />
                        <XButton style="ghost" text="ghost" pressed={true} />
                        <XButton style="electric" text="electric" pressed={true} />
                        <XButton style="flat" text="flat" pressed={true} />
                    </XHorizontal>
                    <XTitle>Additional text</XTitle>
                    <XHorizontal>
                        <XButton style="danger" size="x-large" text="x-large" icon="star" additionalText="text" />
                        <XButton style="ghost" size="large" text="large" icon="star" additionalText="text" />
                        <XButton size="medium" style="primary" text="primary" additionalText="text" />
                        <XButton style="electric" text="electric" additionalText="text" />
                        <XButton text="default" pressed={true} additionalText="text" />
                        <XButton style="ghost" text="ghost" additionalText="text" />
                    </XHorizontal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});