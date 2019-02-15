import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { UserShort } from 'openland-api/Types';
import { TextStyles } from '../../../../styles/AppStyles';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';
import { ConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';

interface UserWrapperProps {
    user:
    | UserShort
    | {
        id: string;
        name: string;
    };
    onUserPress: (id: string) => void;
    myUserId: string;
    theme: ConversationTheme
}

export const UserWrapper = (props: UserWrapperProps) => (
    <ASText
        key={'service_text' + props.theme.linkColorIn}
        color={props.theme.linkColorIn}
        fontWeight={TextStyles.weight.medium}
        fontSize={12}
        lineHeight={17}
        marginLeft={6}
        marginRight={6}
        onPress={() => props.onUserPress(props.user.id)}
    >
        {props.user.id === props.myUserId ? 'You' : useNonBreakingSpaces(props.user.name)}
    </ASText>
);
