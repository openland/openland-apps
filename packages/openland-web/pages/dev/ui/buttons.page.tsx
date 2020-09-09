import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UButton } from 'openland-web/components/unicorn/UButton';

export default withApp('Buttons', ['super-admin', 'software-developer'], props => {
    return (
        <DevDocsScaffold title="Buttons">
            <XView marginVertical={16} flexDirection="row" justifyContent="space-between">
                <UButton text="Label" size="small" shape="square" />
                <UButton text="Label" size="small" style="secondary" />
                <UButton text="Label" size="small" style="danger" />
                <UButton text="Label" size="small" style="pay" />
            </XView>
            <XView flexDirection="row" justifyContent="space-between">
                <UButton text="Label" size="small" loading={true} />
                <UButton text="Label" size="small" style="secondary" loading={true} />
                <UButton text="Label" size="small" style="danger" loading={true} />
                <UButton text="Label" size="small" style="danger" loading={true} />
            </XView>
            <XView marginVertical={16} flexDirection="row" justifyContent="space-between">
                <UButton text="Label" />
                <UButton text="Label" style="secondary" />
                <UButton text="Label" style="danger" />
                <UButton text="Label" style="pay" />
            </XView>
            <XView flexDirection="row" justifyContent="space-between">
                <UButton text="Label" loading={true} />
                <UButton text="Label" style="secondary" loading={true} />
                <UButton text="Label" style="danger" loading={true} />
                <UButton text="Label" style="pay" loading={true} />
            </XView>
            <XView marginVertical={16} flexDirection="row" justifyContent="space-between">
                <UButton text="Label" size="large" shape="round" />
                <UButton text="Label" size="large" style="secondary" />
                <UButton text="Label" size="large" style="tertiary" />
                <UButton text="Label" size="large" style="danger" />
                <UButton text="Label" size="large" style="pay" />
            </XView>
            <XView flexDirection="row" justifyContent="space-between">
                <UButton text="Label" size="large" loading={true} />
                <UButton text="Label" size="large" style="secondary" loading={true} />
                <UButton text="Label" size="large" style="tertiary" loading={true} />
                <UButton text="Label" size="large" style="danger" loading={true} />
                <UButton text="Label" size="large" style="pay" loading={true} />
            </XView>
        </DevDocsScaffold>
    );
});
