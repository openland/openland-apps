import * as React from 'react';
import { View, Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { TypeStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export const TypographyComponent = (props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const variants: JSX.Element[] = [];

    Object.keys(TypeStyles).forEach((style) => {
        const variant = TypeStyles[style];

        variants.push(
            <View marginVertical={10} marginHorizontal={16}>
                <Text style={[variant, { color: theme.foregroundPrimary }]} allowFontScaling={false}>{style}: {variant.fontSize}/{variant.lineHeight} ∙ {variant.fontWeight}</Text>
            </View>
        );
    });

    return (
        <SScrollView>
            {variants}
        </SScrollView>
    );
};

export const Typography = withApp(TypographyComponent, { navigationAppearance: 'small-hidden' });