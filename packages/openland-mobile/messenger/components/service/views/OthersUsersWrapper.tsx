import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { UserShort } from 'openland-api/Types';
import { TextStyles } from '../../../../styles/AppStyles';
import { ActionSheetBuilder } from '../../../../components/ActionSheet';
import { ThemeContext } from '../../AsyncServiceMessageView';

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
                        onPress={() => this.handlePress()}
                    >
                        {this.props.users.length} others
                    </ASText>
                )}
            </ThemeContext.Consumer>
        );
    }
}
