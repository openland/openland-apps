import * as React from 'react';
import { View, StyleSheet, TextInput, Dimensions, ViewStyle, TextStyle, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { FeedItemShadow } from '../FeedItemShadow';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { SlideInput } from 'openland-api/Types';
import { ZIconButton } from 'openland-mobile/components/ZIconButton';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';

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
        padding: 4,
        height: 56
    } as ViewStyle,
    input: {
        fontSize: 24,
        lineHeight: 36,
        minHeight: 56,
    } as TextStyle,
    author: {
        height: 48,
        flexGrow: 1,
        paddingLeft: 12,
        flexDirection: 'row',
        alignItems: 'center'
    } as ViewStyle,
    authorAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12
    } as ViewStyle,
    authorName: {
        width: 120,
        height: 8,
        marginLeft: 8,
        borderRadius: 4
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
    onDelete?: (index: number) => void;
}

export const FeedCreateSlide = (props: FeedCreateSlideProps) => {
    const { slide, index, onChangeText, onDelete } = props;
    const theme = React.useContext(ThemeContext);
    const textInputRef = React.useRef<TextInput>(null);

    const handlePressSlide = React.useCallback(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, []);

    const handleDeleteSlide = React.useCallback(() => {
        if (onDelete) {
            if (slide.text && slide.text.length > 0) {
                AlertBlanket.builder()
                    .title('Delete slide')
                    .message('Delete this slide? This cannot be undone.')
                    .button('Cancel', 'cancel')
                    .action('Delete', 'destructive', () => {
                        onDelete(index);
                    }).show();
            } else {
                onDelete(index);
            }
        }
    }, [onDelete, slide.text, index]);

    const width = Math.min(Dimensions.get('screen').width, 414);
    const containerWidth = width - 32;
    const containerHeight = containerWidth * (4 / 3);

    return (
        <TouchableWithoutFeedback onPress={handlePressSlide}>
            <View style={styles.box}>
                <FeedItemShadow width={width} height={containerHeight + 16 + 32} />

                <View style={[styles.container, { width: containerWidth, height: containerHeight, backgroundColor: theme.backgroundSecondary }]}>
                    <View style={[styles.meta, { backgroundColor: theme.backgroundSecondary }]}>
                        <View style={styles.author}>
                            <View style={[styles.authorAvatar, { backgroundColor: theme.backgroundTertiary }]} />
                            <View style={[styles.authorName, { backgroundColor: theme.backgroundTertiary }]} />
                        </View>

                        {!!onDelete && <ZIconButton src={require('assets/ic-delete-24.png')} onPress={handleDeleteSlide} />}
                    </View>

                    <View style={styles.inputContainer}>
                        {typeof slide.text === 'string' && (
                            <TextInput
                                ref={textInputRef}
                                maxLength={MAX_LENGTH_TEXT}
                                onChangeText={(text) => onChangeText(index, text)}
                                value={slide.text}
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