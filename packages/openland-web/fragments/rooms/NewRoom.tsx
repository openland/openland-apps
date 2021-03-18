import { css, cx } from 'linaria';
import React from 'react';
import { XViewRouterContext } from 'react-mental';

import { XModalController } from 'openland-x/showModal';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import CloseIcon from 'openland-icons/s/ic-close-24.svg';
import { TextLabel1, TextTitle1 } from 'openland-web/utils/TextStyles';
import { showModalBox } from 'openland-x/showModalBox';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useClient } from 'openland-api/useClient';

const newRoomButton = css`
  margin-right: 16px;
  color: var(--accentPrimary);
  cursor: pointer;
  
  &:hover{
    color: var(--accentPrimaryHover);  
  }
`;

const rootContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
`;

const rootHeader = css`
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    height: 72px;
    padding: 10px;
    background-color: var(--backgroundPrimary);
    z-index: 2;
`;

const contentContainer = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 0;
    max-width: 320px;
    width: 100%;
    padding: 72px 0;
    margin-top: 0;
    margin-bottom: 0;
    height: 100%;
`;

const textTitle = css`
    text-align: center;
    margin-bottom: 32px;
    flex-shrink: 0;
    color: var(--foregroundPrimary);
`;

const contentWrapper = css`
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-direction: column;
    justify-content: center;
    padding: 0 24px;
    margin-top: -72px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    align-items: center;
`;

export const NewRoomForm = React.memo((props:  { ctx: XModalController } ) => {
    const form = useForm();
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;

    const nameField = useField('input.name', '', form, [
        {
            checkIsValid: (value) => !!value.trim(),
            text: 'Please enter name',
        },
    ]);

    const onSubmit = React.useCallback(() => {
        form.doAction(async () => {
            console.log(nameField, '[nameField]');
            const room = (await client.mutateVoiceChatCreate({ input: { title: nameField.value } })).voiceChatCreate;
            props.ctx.hide();
            router.navigate(`/room/${room.id}`);
        });
    }, [nameField.value]);

    return (
        <div className={rootContainer}>
            <div className={rootHeader}>
                <UIconButton
                    icon={<CloseIcon />}
                    onClick={props.ctx.hide}
                    size="large"
                />
            </div>
            <div className={cx(contentWrapper)}>
                <div className={cx(contentContainer)}>
                    <div className={cx(TextTitle1, textTitle)}>
                        New room
                    </div>
                    <UInputField
                        field={nameField}
                        label="Room name"
                        autofocus={true}
                    />
                    <UButton
                        text="Create"
                        size="large"
                        alignSelf="center"
                        marginTop={32}
                        onClick={onSubmit}
                    />
                </div>
            </div>
        </div>
    );
});

export const NewRoomButton = React.memo(() => {
    const onClick = () => {
        showModalBox({ fullScreen: true, useTopCloser: false, hideOnEsc: false }, (ctx) => (
            <NewRoomForm ctx={ctx}/>
        ));
    };
    return (
        <div className={cx(TextLabel1, newRoomButton)} onClick={onClick}>
            New Room
        </div>
    );
});