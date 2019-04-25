import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { UserShort, UserTiny } from 'openland-api/Types';
import { ActionSheetBuilder } from '../../../../components/ActionSheet';
import { Text, View } from 'react-native';
import { AppTheme } from 'openland-mobile/themes/themes';
import { ZModalController } from 'openland-mobile/components/ZModal';
import { ZUserView } from 'openland-mobile/components/ZUserView';

interface OthersUsersWrapperProps {
    text: string;
    users: UserTiny[];
    onUserPress: (id: string) => void;
    useAsync: boolean;
    theme: AppTheme
}

export class OthersUsersWrapper extends React.Component<OthersUsersWrapperProps> {
    private handlePress = () => {
        let builder = new ActionSheetBuilder();

        builder.flat();
        builder.view((ctx: ZModalController) => (
            <View flexGrow={1} paddingTop={5}>
                {this.props.users.map((u) => (
                    <ZUserView user={u} onPress={(id) => { ctx.hide(); this.props.onUserPress(id); }} />
                ))}
            </View>
        ));

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
