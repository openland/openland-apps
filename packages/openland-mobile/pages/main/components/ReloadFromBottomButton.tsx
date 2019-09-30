import * as React from 'react';
import { View, Platform, Text, Image, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, SafeAreaView } from 'react-native';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { SAnimated } from 'react-native-s/SAnimated';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';
import UUID from 'uuid/v4';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';

export const ReloadFromBottomButton = (props: { conversation: ConversationEngine }) => {
    const theme = React.useContext(ThemeContext);
    const [animated] = React.useState(new SAnimatedShadowView(UUID(), { translateY: 68 }));
    const [show, setShow] = React.useState(!props.conversation.dataSource.isCompletedForward());
    const [loading, setLoading] = React.useState();
    React.useEffect(() => {
        setShow(!props.conversation.dataSource.isCompletedForward());
        let sub = props.conversation.dataSource.dumbWatch(() => {
            setShow(!props.conversation.dataSource.isCompletedForward());
        });
        return () => {
            sub();
            setLoading(false);
        };
    }, [props.conversation]);

    const onClick = React.useCallback(async () => {
        setLoading(true);
        await props.conversation.restart('end');
        setLoading(false);
    }, [loading]);

    React.useEffect(() => {
        SAnimated.beginTransaction();
        SAnimated.setPropertyAnimator((name, prop, from, to) => {
            if (Platform.OS === 'ios') {
                SAnimated.spring(name, {
                    property: prop,
                    from: from,
                    to: to,
                });
            } else {
                SAnimated.timing(name, {
                    property: prop,
                    from: from,
                    to: to,
                    easing: 'material'
                });
            }
        });

        animated.translateY = show ? 0 : 68;
        SAnimated.commitTransaction();
    }, [show]);
    //

    return <>
        <SAnimated.View
            name={animated.name}
            style={{ width: 40, height: 40, bottom: Platform.OS === 'android' ? 52 : 92, right: 8, position: 'absolute' }}
        >
            <TouchableWithoutFeedback onPress={onClick} >
                <SafeAreaView>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 40,
                            width: 40,
                            borderRadius: 40,
                            backgroundColor: theme.backgroundSecondary,
                            shadowColor: '#171a1f',
                            shadowOpacity: 0.08,
                            shadowRadius: 24,
                            shadowOffset: { width: 0, height: 8 },
                            elevation: 2,
                            bottom: 8,
                            right: 8,
                        }}
                    >
                        {loading ?
                            <LoaderSpinner /> :
                            <Image source={require('assets/ic-down-24.png')} style={{ width: 24, height: 24, tintColor: theme.foregroundSecondary }} />
                        }

                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </SAnimated.View>
    </>;
};