import * as React from 'react';
import { ConversationThemeResolver, ConversationTheme, getDefaultConversationTheme } from './ConversationThemeResolver';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZStyles } from 'openland-mobile/components/ZStyles';
import { View, TouchableOpacity, Switch, Text } from 'react-native';
import { AndroidAliaser } from 'openland-mobile/components/visual/AndroidAliaser';
import { ZLinearGradient } from 'openland-mobile/components/visual/ZLinearGradient.native';
import { AlertBlanketBuilder, Alert } from 'openland-mobile/components/AlertBlanket';
import { AppStyles } from 'openland-mobile/styles/AppStyles';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZText } from 'openland-mobile/components/ZText';

class ChangeThemeView extends React.PureComponent<{ theme: ConversationTheme, onChanged: (changes: Partial<ConversationTheme>) => void, conversationId: string }, ConversationTheme & { easter: boolean }> {
    constructor(props: { theme: ConversationTheme, onChanged: (changes: Partial<ConversationTheme>) => void, conversationId: string }) {
        super(props);
        this.state = { ...props.theme, easter: false || props.theme.spiral };
    }

    lastColor?: string = undefined;
    counter = 0;
    onThemeSelect = (theme: ConversationTheme) => {
        this.setState(theme)

        if (theme.bubbleColorIn[0] === this.lastColor) {
            this.counter++;
        } else {
            this.counter = 0;
        }

        if (this.counter > 3) {
            this.setState({ easter: true });
        }
        this.lastColor = theme.bubbleColorIn[0];
    }

    onSpiralSwitch = (val: boolean) => {
        this.setState({ spiral: val })
    }

    componentDidUpdate() {
        this.props.onChanged(this.state);
    }

    render() {
        let colorPickerSze = 40;

        const themes = ZStyles.avatars.map(a => ({ ...getDefaultConversationTheme(this.props.conversationId), bubbleColorOut: [a.placeholderColorEnd, a.placeholderColorStart], senderNameColor: a.nameColor, linkColorIn: a.nameColor, }))

        return (
            <View marginBottom={14}>
                <ZListItemGroup divider={false}>
                    <View marginLeft={-2} flexDirection="row">
                        {themes.map(theme => (
                            <TouchableOpacity onPress={() => this.onThemeSelect(theme)}>
                                <View borderRadius={colorPickerSze} borderWidth={2} borderColor={theme.bubbleColorOut[0] === this.state.bubbleColorOut[0] ? AppStyles.primaryColor : '#fff'}>
                                    <AndroidAliaser
                                        width={colorPickerSze}
                                        height={colorPickerSze}
                                        borderRadius={colorPickerSze / 2}
                                        color={theme.bubbleColorOut[0] === this.state.bubbleColorOut[0] ? AppStyles.primaryColor : '#fff'}
                                    >
                                        <ZLinearGradient
                                            width={colorPickerSze}
                                            height={colorPickerSze}
                                            borderRadius={colorPickerSze / 2}
                                            fallbackColor={theme.senderNameColor}
                                            colors={theme.bubbleColorOut}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                        />

                                    </AndroidAliaser>
                                </View>
                            </TouchableOpacity>

                        ))}
                    </View>
                    {this.state.easter && <View marginLeft={-16}>
                        <ZListItem text="Spiral" toggle={this.state.spiral} onToggle={this.onSpiralSwitch} />
                    </View>}

                </ZListItemGroup>
            </View>
        )
    }
}

export let changeThemeModal = async (id: string) => {
    let currentTheme = { ...await ConversationThemeResolver.get(id) };
    let changes = {};
    Alert.builder()
        .title('Change theme')
        .view((
            <ChangeThemeView theme={currentTheme} onChanged={c => changes = c} conversationId={id} />
        ))
        .button('Cancel', 'cancel')
        .action('Save', 'default', async () => await ConversationThemeResolver.update(id, changes))
        .show();

}