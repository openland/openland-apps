import * as React from 'react';
import { View, Text, Keyboard, TextInput, } from 'react-native';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { ZRoundedButton } from './ZRoundedButton';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZModalController } from './ZModal';
import { PromptBuilder } from './Prompt';

export const PromptComponent = XMemo((props: { builder: PromptBuilder; modalController: ZModalController }) => {
    const theme = React.useContext(ThemeContext);
    const { builder, modalController } = props;

    return (
        <View
            flexDirection="column"
            justifyContent="flex-start"
            paddingHorizontal={24}
            paddingVertical={20}
        >
            {builder._title && <Text style={{ marginBottom: 12, color: theme.foregroundPrimary, fontSize: 20, fontWeight: FontStyles.Weight.Medium as any }}>{builder._title}</Text>}
            <TextInput defaultValue={builder._value} onChangeText={builder.onTextChange} autoFocus={true} multiline={true} maxHeight={100} marginBottom={15} style={{ color: theme.foregroundPrimary }} keyboardAppearance={theme.keyboardAppearance} />
            <View flexDirection="row" alignItems="flex-end" alignSelf="flex-end" >
                {builder._actions.map((a, i) => (
                    <>
                        <View style={{ width: 4 }} />
                        <ZRoundedButton
                            key={i + '-ac'}
                            style={a.style === 'cancel' ? 'secondary' : a.style === 'destructive' ? 'danger' : 'primary'}
                            title={a.name}
                            onPress={() => {
                                Keyboard.dismiss();
                                modalController.hide();
                                if (a.callback) {
                                    a.callback(builder._value);
                                }
                            }}
                        />
                    </>
                ))}
            </View>
        </View>
    );
});