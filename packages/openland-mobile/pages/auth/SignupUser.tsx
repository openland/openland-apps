import * as React from 'react';
import { Platform, Text, View, Keyboard, Animated, ScrollView, Dimensions } from 'react-native';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { next } from './signup';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import Alert from 'openland-mobile/components/AlertBlanket';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { FloatKeyboardArea } from './FloatKeyboardArea';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { textStyles } from './EmailAuth';

const SignupUserContent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const scrollRef = React.useRef<ScrollView>(null);
    const prefill = getClient().useProfilePrefill().prefill;
    const form = useForm();
    const photoField = useField('photoRef', null, form);
    const firstNameField = useField('firstName', (prefill && prefill.firstName) || '', form);
    const lastNameField = useField('lastName', (prefill && prefill.lastName) || '', form);

    const [avatarScale] = React.useState(new Animated.Value(1));
    const [avatarSize] = React.useState(new Animated.Value(96));

    const keyboardWillShow = (e: any) => {
        if (scrollRef.current && Dimensions.get('window').height < 800) {
            scrollRef.current.scrollToEnd({ animated: true });
        }
        Animated.parallel([
            Animated.timing(avatarSize, {
                duration: e.duration,
                toValue: 48,
            }),
            Animated.timing(avatarScale, {
                duration: e.duration,
                toValue: 0.5,
            }),
        ]).start();
    };

    const keyboardWillHide = (e: any) => {
        Animated.parallel([
            Animated.timing(avatarSize, {
                duration: e.duration,
                toValue: 96,
            }),
            Animated.timing(avatarScale, {
                duration: e.duration,
                toValue: 1,
            }),
        ]).start();
    };

    React.useEffect(() => {
        const isIos = Platform.OS === 'ios';
        if (isIos) {
            Keyboard.addListener('keyboardWillShow', keyboardWillShow);
            Keyboard.addListener('keyboardWillHide', keyboardWillHide);
        }
        return () => isIos ? Keyboard.removeAllListeners() : undefined;
    });

    const handleSave = () => {
        if (firstNameField.value === '') {
            Alert.builder()
                .title('Please enter your name')
                .button('GOT IT!')
                .show();
            return;
        }

        form.doAction(async () => {
            await getClient().mutateProfileCreate({
                input: {
                    firstName: firstNameField.value,
                    lastName: lastNameField.value,
                },
            });
            await getClient().refetchAccount();
            await next(props.router);
        });
    };

    return (
        <FloatKeyboardArea
            floatContent={<ZRoundedButton title="Next" size="large" onPress={handleSave} />}
            ref={scrollRef}
        >
            <Text
                style={[textStyles.title, { color: theme.foregroundPrimary }]}
                allowFontScaling={false}
            >
                What’s your name?
            </Text>
            <Text
                style={[textStyles.hint, { color: theme.foregroundSecondary }]}
                allowFontScaling={false}
            >
                Help others recognize you
            </Text>
            <Animated.View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{ scale: avatarScale }],
                    height: avatarSize,
                }}
            >
                <ZAvatarPicker
                    field={photoField}
                    initialUrl={(prefill && prefill.picture) || undefined}
                    size="xx-large"
                />
            </Animated.View>
            <View marginTop={16} marginBottom={100}>
                <ZInput field={firstNameField} placeholder="First name" />
                <ZInput
                    field={lastNameField}
                    placeholder="Last name"
                    description="Please, provide your name. This information is part of your public profile."
                />
            </View>
        </FloatKeyboardArea>
    );
});

class SignupUserComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <ZTrack event="signup_profile_view">
                <SignupUserContent {...this.props} />
            </ZTrack>
        );
    }
}

export const SignupUser = withApp(SignupUserComponent, {
    navigationAppearance: Platform.OS === 'ios' ? 'small' : undefined,
});
