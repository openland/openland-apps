import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { UserShort } from 'openland-api/Types';
import { TextStyles } from '../../../../styles/AppStyles';

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
    <ASText
        color="#fff"
        fontWeight={TextStyles.weight.medium}
        fontSize={12}
        lineHeight={17}
        marginLeft={6}
        marginRight={6}
        onPress={() => props.onUserPress(props.user.id)}
    >
        {props.user.id === props.myUserId ? 'You' : props.user.name}
    </ASText>
);
