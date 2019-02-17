import * as React from 'react';
import { Container } from './views/Container';
import { UserWrapper } from './views/UserWrapper';

export interface ServiceMessagePhotoChangedProps {
    myUserId: string;
    onUserPress: (id: string) => void;
    user: {
        id: string;
        name: string;
    };
}

export const ServiceMessagePhotoChanged = (props: ServiceMessagePhotoChangedProps) => {
    return (
        <Container>
            <UserWrapper
                user={props.user}
                onUserPress={props.onUserPress}
                myUserId={props.myUserId}
            />{' '}
            changed group photo
        </Container>
    );
};
