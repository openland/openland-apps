import * as React from 'react';
import { View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

interface EditPageHeaderProps {
    icon: NodeRequire;
    tint: string;
    title: string;
    description: string;
}

export const EditPageHeader = React.memo((props: EditPageHeaderProps) => {
    const theme = React.useContext(ThemeContext);

    return (
        <LinearGradient colors={[theme.gradient0to100Start, theme.gradient0to100End]}>
            <View
                alignItems="center"
                justifyContent="center"
                paddingTop={16}
                paddingBottom={32}
            >
                <View
                    width={80}
                    height={80}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={80}
                    backgroundColor={props.tint}
                >
                    <Image
                        source={props.icon}
                        style={{
                            width: 48,
                            height: 48,
                            tintColor: theme.foregroundContrast,
                        }}
                    />
                </View>
                <Text
                    style={{
                        ...TextStyles.Title2,
                        color: theme.foregroundPrimary,
                        textAlign: 'center',
                        marginTop: 16,
                    }}
                    allowFontScaling={false}
                >
                    {props.title}
                </Text>
                <Text
                    style={{
                        ...TextStyles.Body,
                        color: theme.foregroundTertiary,
                        textAlign: 'center',
                        maxWidth: 300,
                        marginTop: 4,
                    }}
                    allowFontScaling={false}
                >
                    {props.description}
                </Text>
            </View>
        </LinearGradient>
    );
});