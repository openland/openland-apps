import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { UserShort } from 'openland-api/Types';
import { TextStyles } from '../../../../styles/AppStyles';
import { ActionSheetBuilder } from '../../../../components/ActionSheet';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { Text } from 'react-native';

interface OthersUsersWrapperProps {
    text: string;
    users: { id: string, name: string }[];
    onUserPress: (id: string) => void;
    useAsync: boolean;
}

export class OthersUsersWrapper extends React.Component<OthersUsersWrapperProps> {
    private handlePress = () => {
        let builder = new ActionSheetBuilder();

        this.props.users.map(u => {
            builder.action(u.name, () => {
                this.props.onUserPress(u.id);
            });
        });

        builder.show();
    };

    render() {
        return this.props.useAsync ? (
            <ASText
                key={'service_text'}
                // color={this.props.theme.linkColorIn}
                color={DefaultConversationTheme.linkColorIn}
                fontSize={12}
                lineHeight={17}
                marginLeft={6}
                marginRight={6}
                onPress={() => this.handlePress()}
            >
                {this.props.text}
            </ASText>
        ) : (
            <Text
                key={'service_text'}
                style={{
                    color: DefaultConversationTheme.linkColorIn,
                    fontSize: 12,
                    lineHeight: 17,
                    marginLeft: 6,
                    marginRight: 6,
                }}
                onPress={() => this.handlePress()}
            >
                {this.props.text}
            </Text>
        );
    }
}
