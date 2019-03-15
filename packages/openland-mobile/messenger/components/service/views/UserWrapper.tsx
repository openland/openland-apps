import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { UserShort } from 'openland-api/Types';
import { TextStyles } from '../../../../styles/AppStyles';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';

export interface UserWrapperProps {
    user: {
        id: string;
        name: string;
    };
    onUserPress: (id: string) => void;
    myUserId: string;
}

export function UserWrapper(props: UserWrapperProps) {
    return (
        <ASText
            // key={'service_text' + props.theme.linkColorIn}
            color={DefaultConversationTheme.linkColorIn}
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
}
