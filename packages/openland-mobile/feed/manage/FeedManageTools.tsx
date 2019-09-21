import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    tools: {
        position: 'absolute',
        left: 0, right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 4,
        height: 56,
        zIndex: 2
    } as ViewStyle,
});

interface FeedManageToolsProps {
    align: 'top' | 'bottom';
    style: 'contrast' | 'default';
    children: any;
}

export const FeedManageTools = React.memo((props: FeedManageToolsProps) => {
    const { align, style, children } = props;
    const styleObject = [styles.tools, {
        top: align === 'top' ? 0 : undefined,
        bottom: align === 'bottom' ? 0 : undefined
    }];

    if (style === 'contrast') {
        if (align === 'top') {
            return (
                <LinearGradient colors={['rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0)']} style={styleObject}>
                    {children}
                </LinearGradient>
            );
        }

        return (
            <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.24)']} style={styleObject}>
                {children}
            </LinearGradient>
        );
    }

    return (
        <View style={styleObject}>
            {children}
        </View>
    );
});