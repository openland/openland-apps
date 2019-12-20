import * as React from 'react';
import { AlertBlanketBuilder } from './AlertBlanket';
import { XModalController } from './showModal';
import { useForm } from 'openland-form/useForm';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XView } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useShortcuts } from './XShortcuts/useShortcuts';

export const AlertBlanketComponent = React.memo<{ builder: AlertBlanketBuilder, controller: XModalController }>(props => {
    const { builder, controller } = props;
    const form = useForm();
    const doConfirm = () => {
        form.doAction(async () => {
            if (builder._action) {
                await builder._action.action();
            }

            controller.hide();
        });
    };

    useShortcuts({ keys: ['Enter'], callback: doConfirm });

    return (
        <>
            {form.error && <XErrorMessage message={form.error} />}
            <XView flexDirection="column" borderRadius={8} overflow="hidden">
                {!!builder._message && (
                    <XModalContent>
                        {builder._message}
                    </XModalContent>
                )}
                {builder._body && builder._body(controller)}
                <XModalFooter>
                    {builder._cancelable && (
                        <UButton
                            text="Cancel"
                            style="secondary"
                            size="large"
                            square={true}
                            onClick={() => {
                                if (builder._onCancel) {
                                    builder._onCancel();
                                }

                                controller.hide();
                            }}
                        />
                    )}

                    {builder._action && (
                        <UButton
                            text={builder._action.name}
                            style={builder._action.style}
                            size="large"
                            square={true}
                            onClick={doConfirm}
                            loading={form.loading}
                            marginLeft={12}
                        />
                    )}
                </XModalFooter>
            </XView>
        </>
    );
});