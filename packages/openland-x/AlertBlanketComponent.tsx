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
    const doConfirm = (callback?: () => Promise<void>) => {
        form.doAction(async () => {
            if (callback) {
                await callback();
            }
            controller.hide();
        });
    };

    useShortcuts({ keys: ['Enter'], callback: () => doConfirm((builder._actions.length) ? builder._actions[builder._actions.length - 1].action : undefined) });

    return (
        <>
            {form.error && <XErrorMessage message={form.error} />}
            <XView flexDirection="column" borderRadius={8} overflow="hidden">
                {!!builder._message && (
                    <XModalContent marginTop={builder._title ? undefined : 24}>
                        {builder._message}
                    </XModalContent>
                )}
                {builder._body && builder._body(controller)}
                <XModalFooter>
                    {builder._cancelAction && !builder._actions.find(a => a.name.toLowerCase() === 'cancel') && (
                        <UButton
                            disable={form.loading}
                            text="Cancel"
                            style="tertiary"
                            size="large"
                            onClick={() => {
                                if (builder._onCancel) {
                                    builder._onCancel();
                                }

                                controller.hide();
                            }}
                        />
                    )}

                    {builder._actions.map(action => (
                        <UButton
                            disable={form.loading}
                            text={action.name}
                            style={action.style}
                            size="large"
                            onClick={() => doConfirm(action.action)}
                            loading={form.loading}
                        />
                    ))}
                </XModalFooter>
            </XView>
        </>
    );
});