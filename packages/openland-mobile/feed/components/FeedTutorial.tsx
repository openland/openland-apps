import * as React from 'react';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { View, StyleSheet, ViewStyle, Text, TextStyle, Image, ImageStyle, AsyncStorage, Platform } from 'react-native';
import { ZModalController } from 'openland-mobile/components/ZModal';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SDevice } from 'react-native-s/SDevice';

const TUTORIAL: ({ icon: NodeRequire, title: string, subtitle: string })[] = [{
    icon: require('assets/feed/ic-feed-tutorial-switch-300.png'),
    title: 'Switch',
    subtitle: 'Tap to left or right side to switch cards'
}, {
    icon: require('assets/feed/ic-feed-tutorial-comment-300.png'),
    title: 'Comment',
    subtitle: 'Tap in the center to view comments'
}];

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        alignSelf: 'center',
        resizeMode: 'contain',
    } as ImageStyle,
    title: {
        ...TextStyles.Title1,
        textAlign: 'center',
        marginTop: 8,
        marginHorizontal: 24,
    } as TextStyle,
    subtitle: {
        ...TextStyles.Body,
        textAlign: 'center',
        marginTop: 8,
        marginHorizontal: 24,
        marginBottom: 24,
    } as TextStyle,
    buttons: {
        paddingTop: 16,
        paddingHorizontal: 16
    } as ViewStyle
});

const FeedTutorial = React.memo((props: { ctx: ZModalController }) => {
    const { ctx } = props;
    const [step, setStep] = React.useState(0);

    const handleNext = React.useCallback(() => {
        setStep(current => current + 1);
    }, []);

    const handleClose = React.useCallback(() => {
        ctx.hide();
    }, []);

    const isFinal = step === TUTORIAL.length - 1;
    const paddingBottom = Platform.OS === 'ios' ? (SDevice.safeArea.bottom || 16) : SDevice.safeArea.bottom + 16;

    return (
        <>
            <Image source={TUTORIAL[step].icon} style={styles.image} />
            <Text style={styles.title} allowFontScaling={false}>
                {TUTORIAL[step].title}
            </Text>
            <Text style={styles.subtitle} allowFontScaling={false}>
                {TUTORIAL[step].subtitle}
            </Text>
            <View style={styles.buttons} paddingBottom={paddingBottom}>
                <ZRoundedButton
                    size="large"
                    title={isFinal ? 'Got it' : 'Next'}
                    onPress={isFinal ? handleClose : handleNext}
                />
            </View>
        </>
    );
});

export const showFeedTutorialIfNeeded = async () => {
    const tutorialShown = await AsyncStorage.getItem('openland-feed-tutorial');

    if (!tutorialShown) {
        await AsyncStorage.setItem('openland-feed-tutorial', new Date().getTime().toString());

        let builder = new ActionSheetBuilder();

        builder.view(ctx => <FeedTutorial ctx={ctx} />);

        builder.cancelable(false);
        builder.show();
    }
};