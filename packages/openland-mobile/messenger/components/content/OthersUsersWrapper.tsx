import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { UserForMention } from 'openland-api/spacex.types';
import { Text, View } from 'react-native';
import { ZModalController } from 'openland-mobile/components/ZModal';
import { ZUserView } from 'openland-mobile/components/ZUserView';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';

interface OthersUsersWrapperProps {
    children?: any;
    users: UserForMention[];
    onUserPress: (id: string) => void;
    useAsync: boolean;
    theme: ThemeGlobal;
}

export class OthersUsersWrapper extends React.Component<OthersUsersWrapperProps> {
    private handlePress = () => {
        if (this.props.users.length > 0) {
            let builder = new ActionSheetBuilder();

            builder.view((ctx: ZModalController) => (
                <View flexGrow={1}>
                    {this.props.users.map((u) => (
                        <ZUserView key={'user-' + u.id} user={u} onPress={(id) => { ctx.hide(); this.props.onUserPress(id); }} />
                    ))}
                </View>
            ));

            builder.cancelable(false);
            builder.show();
        }
    }

    render() {
        return this.props.useAsync ? (
            <ASText
                key={'service_text'}
                color={this.props.theme.foregroundSecondary}
                fontWeight={FontStyles.Weight.Bold}
                fontSize={13}
                lineHeight={18}
                marginLeft={6}
                marginRight={6}
                onPress={() => this.handlePress()}
            >
                {this.props.children}
            </ASText>
        ) : (
                <Text
                    key={'service_text'}
                    style={{
                        color: this.props.theme.foregroundSecondary,
                        fontWeight: FontStyles.Weight.Bold,
                        fontSize: 13,
                        lineHeight: 18,
                        marginLeft: 6,
                        marginRight: 6,
                    }}
                    onPress={() => this.handlePress()}
                    allowFontScaling={false}
                >
                    {this.props.children}
                </Text>
            );
    }
}
