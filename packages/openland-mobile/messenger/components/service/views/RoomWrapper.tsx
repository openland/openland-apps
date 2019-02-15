import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { RoomShort } from 'openland-api/Types';
import { TextStyles } from '../../../../styles/AppStyles';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';
import { ConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';

interface RoomWrapperProps {
    room: RoomShort;
    onRoomPress: (id: string) => void;
    theme: ConversationTheme;
}

export const RoomWrapper = (props: RoomWrapperProps) => (
    <ASText
        key={'service_text' + props.theme.linkColorIn}
        color={props.theme.linkColorIn}
        fontWeight={TextStyles.weight.medium}
        fontSize={12}
        lineHeight={17}
        marginLeft={6}
        marginRight={6}
        onPress={() => props.onRoomPress(props.room.id)}
    >
        {props.room.__typename === 'PrivateRoom' ? useNonBreakingSpaces(props.room.user.name) : props.room.title}
    </ASText>
);
