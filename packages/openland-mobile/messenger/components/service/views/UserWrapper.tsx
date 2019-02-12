import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { UserShort } from 'openland-api/Types';
import { TextStyles } from '../../../../styles/AppStyles';
import { ThemeContext } from '../../AsyncServiceMessageView';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';

interface UserWrapperProps {
    user:
    | UserShort
    | {
        id: string;
        name: string;
    };
    onUserPress: (id: string) => void;
    myUserId: string;
}

export const UserWrapper = (props: UserWrapperProps) => (
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
                onPress={() => props.onUserPress(props.user.id)}
            >
                {props.user.id === props.myUserId ? 'You' : useNonBreakingSpaces(props.user.name)}
            </ASText>
        )}
    </ThemeContext.Consumer>
);
