import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { RoomShort } from 'openland-api/Types';
import { TextStyles } from '../../../../styles/AppStyles';
import { ThemeContext } from '../../AsyncServiceMessageView';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';

interface RoomWrapperProps {
    room: RoomShort;
    onRoomPress: (id: string) => void;
}

export const RoomWrapper = (props: RoomWrapperProps) => (
    <ThemeContext.Consumer>
        {theme => (
            <ASText
                key={'service_text' + theme.theme.linkColorIn}
                color={theme.theme.linkColorIn}
                fontWeight={TextStyles.weight.medium}
                fontSize={12}
                lineHeight={17}
                marginLeft={6}
                marginRight={6}
                onPress={() => props.onRoomPress(props.room.id)}
            >
                {props.room.__typename === 'PrivateRoom' ? useNonBreakingSpaces(props.room.user.name) : props.room.title}
            </ASText>
        )}
    </ThemeContext.Consumer>
);
