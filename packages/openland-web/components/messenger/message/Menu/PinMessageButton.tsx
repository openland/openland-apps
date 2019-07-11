import * as React from 'react';
import Glamorous from 'glamorous';
import { XMutation } from 'openland-x/XMutation';
import { useClient } from 'openland-web/utils/useClient';
import { MutationFunc } from 'react-apollo';
import { XButton } from 'openland-x/XButton';

export const PinButtonStyle = Glamorous(XButton)({
    fontSize: 14,
    lineHeight: '24px',
    padding: '7px 0 9px',
    fontWeight: 400,
    textAlign: 'left',
    justifyContent: 'flex-start',
    height: 40,
    backgroundColor: '#fff',
    color: '#171B1F',
    borderRadius: 0,
    transition: 'none',
    '&:hover, &:active': {
        backgroundColor: '#F0F2F5',
        color: '#171B1F',
    },
    '& > div': {
        padding: '0 16px',
        justifyContent: 'flex-start',
    },
});

export const PinMessageButton = ({
    variables,
    onSuccess,
}: {
    variables: { chatId: string; messageId: string };
    onSuccess: () => void;
}) => {
    const client = useClient();
    const pinMessage = async () => await client.mutatePinMessage(variables);

    return (
        <XMutation mutation={pinMessage as MutationFunc} onSuccess={onSuccess}>
            <PinButtonStyle text="Pin" />
        </XMutation>
    );
};
