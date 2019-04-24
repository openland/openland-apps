import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { UserShort } from 'openland-api/Types';
import { TextStyles } from '../../../../styles/AppStyles';
import { ActionSheetBuilder } from '../../../../components/ActionSheet';
import { Text } from 'react-native';
import { AppTheme } from 'openland-mobile/themes/themes';

interface OthersUsersWrapperProps {
    text: string;
    users: { id: string, name: string }[];
    onUserPress: (id: string) => void;
    useAsync: boolean;
    theme: AppTheme
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
                color={this.props.theme.linkColor}
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
                        color: this.props.theme.linkColor,
                        fontSize: 12,
                        lineHeight: 17,
                        marginLeft: 6,
                        marginRight: 6,
                    }}
                    onPress={() => this.handlePress()}
                    allowFontScaling={false}
                >
                    {this.props.text}
                </Text>
            );
    }
}
