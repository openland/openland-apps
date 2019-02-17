import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { UserShort } from 'openland-api/Types';
import { TextStyles } from '../../../../styles/AppStyles';
import { ActionSheetBuilder } from '../../../../components/ActionSheet';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';

interface OthersUsersWrapperProps {
    users: UserShort[];
    onUserPress: (id: string) => void;
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
        return (
            <ASText
                key={'service_text'}
                // color={this.props.theme.linkColorIn}
                color={DefaultConversationTheme.linkColorIn}
                fontWeight={TextStyles.weight.medium}
                fontSize={12}
                lineHeight={17}
                marginLeft={6}
                marginRight={6}
                onPress={() => this.handlePress()}
            >
                {this.props.users.length} others
            </ASText>
        );
    }
}
