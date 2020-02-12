import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { showModalBox } from 'openland-x/showModalBox';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { delay } from 'openland-y-utils/timer';

export default withApp('Modals', 'viewer', props => {
    return (
        <DevDocsScaffold title="Modals">
            <XView>
                <UButton
                    text="Simple modal"
                    onClick={() => {
                        showModalBox({ title: 'Simple modal' }, ctx => {
                            return (
                                <div>Text</div>
                            );
                        });
                    }}
                />

                <UButton
                    text="Fullscreen modal"
                    onClick={() => {
                        showModalBox({ title: 'Fullscreen modal', fullScreen: true }, ctx => {
                            return (
                                <div>Text</div>
                            );
                        });
                    }}
                />

                <UButton
                    text="AlertBlanket"
                    onClick={() => {
                        const builder = new AlertBlanketBuilder();

                        builder.title('Title');
                        builder.message('Message');
                        builder.action('Action', async () => {
                            await delay(3000);
                        }, 'danger');
                        builder.show();
                    }}
                />
            </XView>
        </DevDocsScaffold>
    );
});
