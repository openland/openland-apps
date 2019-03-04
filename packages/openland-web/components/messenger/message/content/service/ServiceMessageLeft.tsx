import * as React from 'react';
import { Container } from './views/Container';
import { MentionedUser } from './views/MentionedUser';
import { UserShort } from 'openland-api/Types';
export interface ServiceMessageLeftProps {
    kickedUser: UserShort;
    kickedByUser: UserShort;
    myUserId: string;
}

export const ServiceMessageLeft = React.memo((props: ServiceMessageLeftProps) => {
    return (
        <Container>
            {props.kickedByUser.id === props.kickedUser.id ? (
                <>
                    <MentionedUser
                        user={props.kickedUser}
                        isYou={props.myUserId === props.kickedUser.id}
                    />{' '}
                    left the group
                </>
            ) : (
                <>
                    <MentionedUser
                        user={props.kickedByUser}
                        isYou={props.myUserId === props.kickedByUser.id}
                    />{' '}
                    kicked{' '}
                    <MentionedUser
                        user={props.kickedUser}
                        isYou={props.myUserId === props.kickedUser.id}
                    />
                </>
            )}
        </Container>
    );
});
