import * as React from 'react';
import { View, StyleSheet, TextInput, Dimensions, ViewStyle, TextStyle, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { FeedItemShadow } from '../FeedItemShadow';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { SlideInput } from 'openland-api/Types';

const MAX_LENGTH_TEXT = 50;

const styles = StyleSheet.create({
    box: {
        paddingTop: 16,
        paddingBottom: 32,
        marginBottom: -16,
        alignItems: 'center'
    } as ViewStyle,
    container: {
        borderRadius: RadiusStyles.Large,
        overflow: 'hidden',
    } as ViewStyle,
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
    } as ViewStyle,
    input: {
        fontSize: 24,
        lineHeight: 36,
        minHeight: 56,
    } as TextStyle,
    templateAvatar: {
        width: 24,
        height: 24,
        borderRadius: 24
    } as ViewStyle,
    templateName: {
        width: 120,
        height: 8,
        marginLeft: 8,
        borderRadius: 80
    } as ViewStyle,
    inputContainer: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        flexGrow: 1,
        paddingBottom: 32
    } as ViewStyle
});

interface FeedCreateSlideProps {
    slide: SlideInput;
    index: number;
    onChangeText: (index: number, text: string) => void;
}

export const FeedCreateSlide = (props: FeedCreateSlideProps) => {
    const theme = React.useContext(ThemeContext);
    const textInputRef = React.useRef<TextInput>(null);

    const handlePressSlide = React.useCallback(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, []);

    const width = Math.min(Dimensions.get('screen').width, 414);
    const containerWidth = width - 32;
    const containerHeight = containerWidth * (4 / 3);

    return (
        <TouchableWithoutFeedback onPress={handlePressSlide}>
            <View style={styles.box}>
                <FeedItemShadow width={width} height={containerHeight + 16 + 32} />

                <View style={[styles.container, { width: containerWidth, height: containerHeight, backgroundColor: theme.backgroundSecondary }]}>
                    <View style={[styles.meta, { backgroundColor: theme.backgroundSecondary }]}>
                        <View style={[styles.templateAvatar, { backgroundColor: theme.backgroundTertiary }]} />
                        <View style={[styles.templateName, { backgroundColor: theme.backgroundTertiary }]} />
                    </View>

                    <View style={styles.inputContainer}>
                        {typeof props.slide.text === 'string' && (
                            <TextInput
                                ref={textInputRef}
                                maxLength={MAX_LENGTH_TEXT}
                                onChangeText={(text) => props.onChangeText(props.index, text)}
                                value={props.slide.text}
                                multiline={true}
                                style={styles.input}
                                placeholder={'Enter text'}
                                placeholderTextColor={theme.foregroundTertiary}
                                {...{ scrollEnabled: false }}
                            />
                        )}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};