import * as React from 'react';
import { View, Platform } from 'react-native';
import { ZText } from './ZText';
import { ZListHeader } from './ZListHeader';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export interface ZListGroupProps {
    useSpacer?: boolean;
    header?: string | null;
    headerMarginTop?: number;
    counter?: number | null;
    footer?: {
        text: string;
        onPress: (link: string) => void;
        onLongPress?: (link: string) => void;
    } | string;
    actionRight?: {
        title: string,
        onPress: () => void
    };
    alignItems?: 'center';
    children?: any;
}

export const ZListGroup = React.memo<ZListGroupProps>((props) => {
    const { header, headerMarginTop, counter, footer, actionRight, alignItems, useSpacer, children } = props;
    const theme = React.useContext(ThemeContext);
    const components: any[] = [];

    React.Children.forEach(children, (c) => {
        if (c !== null && c !== undefined) {
            components.push(c);
        }
    });

    if (components.length === 0) {
        return null;
    }

    return (
        <View style={{ paddingBottom: useSpacer ? 8 : undefined }}>
            {useSpacer && <View style={{ backgroundColor: theme.backgroundTertiary, height: 16, marginBottom: 4 }} />}
            {header !== null && header !== undefined &&
                <ZListHeader text={header} counter={counter} marginTop={useSpacer ? 0 : headerMarginTop} action={actionRight} />
            }
            {header === null && <View style={{ height: 16 }} />}
            <View style={{ alignItems }}>
                {components}
            </View>
            {footer !== undefined && (
                <ZText
                    linkify={true}
                    text={typeof footer === 'string' ? footer : footer.text}
                    onPress={typeof footer === 'string' ? undefined : footer.onPress}
                    onLongPress={typeof footer === 'string' ? undefined : footer.onLongPress}
                    style={{
                        color: Platform.OS === 'android' ? '#939393' : '#8e8e93',
                        fontSize: 13,
                        lineHeight: 17,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingBottom: 16,
                        paddingTop: 6
                    }}
                />
            )}
        </View>
    );
});