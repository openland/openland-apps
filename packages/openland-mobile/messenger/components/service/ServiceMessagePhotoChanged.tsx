import * as React from 'react';
import { Container } from './views/Container';
import { UserWrapper } from './views/UserWrapper';
import { ConversationTheme } from '../../../pages/main/themes/ConversationThemeResolver';

export interface ServiceMessagePhotoChangedProps {
    myUserId: string;
    onUserPress: (id: string) => void;
    user: {
        id: string;
        name: string;
    };
    theme: ConversationTheme;
}

export const ServiceMessagePhotoChanged = (props: ServiceMessagePhotoChangedProps) => {
    return (
        <Container theme={props.theme}>
            <UserWrapper
                theme={props.theme}
                user={props.user}
                onUserPress={props.onUserPress}
                myUserId={props.myUserId}
            />{' '}
            changed group photo
        </Container>
    );
};
