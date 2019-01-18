import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { RoomShort } from 'openland-api/Types';
import { TextStyles } from '../../../../styles/AppStyles';

interface RoomWrapperProps {
    room: RoomShort;
    onRoomPress: (id: string) => void;
}

export const RoomWrapper = (props: RoomWrapperProps) => (
    <ASText
        color="#fff"
        fontWeight={TextStyles.weight.medium}
        fontSize={12}
        lineHeight={17}
        marginLeft={6}
        marginRight={6}
        onPress={() => props.onRoomPress(props.room.id)}
    >
        {props.room.__typename === 'PrivateRoom' ? props.room.user.name : props.room.title}
    </ASText>
);
