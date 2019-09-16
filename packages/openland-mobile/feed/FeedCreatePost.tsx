import * as React from 'react';
import { View, StyleSheet, TextInput, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { useForm } from 'openland-form/useForm';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { FeedItemShadow } from './FeedItemShadow';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { useField } from 'openland-form/useField';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { SScrollView } from 'react-native-s/SScrollView';

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

const MAX_LENGTH_TEXT = 50;

const FeedCreatePostComponent = () => {
    const theme = React.useContext(ThemeContext);
    const [cards, setCards] = React.useState([{ type: 'text' }]);

    const form = useForm();
    const textField = useField('text', '', form);

    const handlePost = () =>
        form.doAction(() => {
            console.log('post');
        });

    const handleAddCard = () => {
        setCards([...cards, { type: 'text' }]);
    };

    const width = Math.min(Dimensions.get('screen').width, 414);
    const containerWidth = width - 32;
    const containerHeight = containerWidth * (4 / 3);
    
    const renderPost = () => {
        return (
            <View style={styles.box}>
                <FeedItemShadow width={width} height={containerHeight + 16 + 32} />

                <View style={[styles.container, { width: containerWidth, height: containerHeight, backgroundColor: theme.backgroundSecondary }]}>
                    <View style={[styles.meta, { backgroundColor: theme.backgroundSecondary }]}>
                        <View style={[styles.templateAvatar, { backgroundColor: theme.backgroundTertiary }]} />
                        <View style={[styles.templateName, { backgroundColor: theme.backgroundTertiary }]} />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            maxLength={MAX_LENGTH_TEXT}
                            onChangeText={textField.input.onChange}
                            value={textField.input.value}
                            multiline
                            style={styles.input}
                            placeholder={'Enter text'} 
                            placeholderTextColor={theme.foregroundTertiary}
                            {...{ scrollEnabled: false }}
                        />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <>
            <SHeader title="New post" />
            <SHeaderButton title="Post" onPress={handlePost} />
            <SScrollView>
                {cards.map(renderPost)}
                
                <View style={{ alignItems: 'center', marginTop: 8 }}>
                    <ZRoundedButton 
                        title="Add card"
                        style="secondary" 
                        onPress={handleAddCard}
                    />
                </View>
            </SScrollView>
        </>
    );
};

export const FeedCreatePost = withApp(FeedCreatePostComponent, { navigationAppearance: 'small' });
