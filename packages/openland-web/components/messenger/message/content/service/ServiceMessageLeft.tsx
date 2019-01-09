import * as React from 'react';
import { Container } from './views/Container';
import { MentionedUser } from './views/MentionedUser';
import { UserShort } from 'openland-api/Types';
export interface ServiceMessageLeftProps {
    kickedUser: UserShort;
    kickedByUser: UserShort;
    myUserId: string;
}

export const ServiceMessageLeft = (props: ServiceMessageLeftProps) => {
    console.log(props.kickedByUser);
    return (
        <Container>
            {props.kickedByUser.id === props.kickedUser.id ? (
                <>
                    <MentionedUser
                        user={props.kickedUser}
                        isYou={props.myUserId === props.kickedUser.id}
                    />{' '}
                    has left the room
                </>
            ) : (
                <>
                    <MentionedUser
                        user={props.kickedUser}
                        isYou={props.myUserId === props.kickedUser.id}
                    />{' '}
                    was kicked by{' '}
                    <MentionedUser
                        user={props.kickedByUser}
                        isYou={props.myUserId === props.kickedByUser.id}
                    />
                </>
            )}
        </Container>
    );
};
