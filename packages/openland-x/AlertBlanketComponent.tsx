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
    const confirmLastAction = () => {
        if (builder._actions.length) {
            doConfirm(builder._actions[builder._actions.length - 1].action);
        }
    };

    useShortcuts({
        keys: ['Enter'], callback: () => {
            if (builder._confirmOnEnter !== false) {
                confirmLastAction();
                return true;
            }
            return false;
        }
    });

    return (
        <>
            {form.error && <XErrorMessage message={form.error} />}
            <XView flexDirection="column" borderRadius={8} overflow="hidden" paddingTop={!!builder._title ? 16 : undefined}>
                {!!builder._message && (
                    <XModalContent>
                        {builder._message}
                    </XModalContent>
                )}
                {builder._body && builder._body(controller, confirmLastAction)}
                <XModalFooter>
                    {builder._cancelAction && !builder._actions.find(a => a.name.toLowerCase() === 'cancel') && (
                        <UButton
                            disable={form.loading}
                            text={builder._cancelText || 'Cancel'}
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
                            key={'action_' + action.name}
                        />
                    ))}
                </XModalFooter>
            </XView>
        </>
    );
});