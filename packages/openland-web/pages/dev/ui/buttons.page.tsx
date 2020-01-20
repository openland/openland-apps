import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';

export default withApp('Buttons', 'viewer', props => {
    return (
        <DevDocsScaffold title="Buttons">
            <XVertical>
                <XHorizontal>
                    <UButton text="Label" size="small" shape="square" />
                    <UButton text="Label" size="small" style="secondary" />
                    <UButton text="Label" size="small" style="danger" />
                    <UButton text="Label" size="small" style="pay" />
                    <UButton text="Label" size="small" loading={true} />
                    <UButton text="Label" size="small" style="secondary" loading={true} />
                    <UButton text="Label" size="small" style="danger" loading={true} />
                    <UButton text="Label" size="small" style="danger" loading={true} />
                </XHorizontal>
                <XHorizontal>
                    <UButton text="Label" />
                    <UButton text="Label" style="secondary" />
                    <UButton text="Label" style="danger" />
                    <UButton text="Label" style="pay" />
                    <UButton text="Label" loading={true} />
                    <UButton text="Label" style="secondary" loading={true} />
                    <UButton text="Label" style="danger" loading={true} />
                    <UButton text="Label" style="pay" loading={true} />
                </XHorizontal>
                <XHorizontal>
                    <UButton text="Label" size="large" shape="round" />
                    <UButton text="Label" size="large" style="secondary" />
                    <UButton text="Label" size="large" style="danger" />
                    <UButton text="Label" size="large" style="pay" />
                    <UButton text="Label" size="large" loading={true} />
                    <UButton text="Label" size="large" style="secondary" loading={true} />
                    <UButton text="Label" size="large" style="danger" loading={true} />
                    <UButton text="Label" size="large" style="pay" loading={true} />
                </XHorizontal>
            </XVertical>
        </DevDocsScaffold>
    );
});
