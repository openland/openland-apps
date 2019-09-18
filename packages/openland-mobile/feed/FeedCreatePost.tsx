import * as React from 'react';
import { View, StyleSheet, TextInput, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { FeedItemShadow } from './FeedItemShadow';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { SScrollView } from 'react-native-s/SScrollView';
import { XMemo } from 'openland-y-utils/XMemo';
import { FeedEngine } from 'openland-engines/feed/FeedEngine';
import { SRouter } from 'react-native-s/SRouter';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SlideInput, SlideType } from 'openland-api/Types';
import Toast from 'openland-mobile/components/Toast';

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
const Loader = Toast.loader();

const FeedCreatePostComponent = (props: { engine: FeedEngine; router: SRouter; }) => {
    const client = getClient();
    const theme = React.useContext(ThemeContext);
    const [slides, setSlides] = React.useState<SlideInput[]>([]);

    const handlePost = async () => {
        Loader.show();
        await client.mutateFeedCreatePost({ input: slides });
        Loader.hide();
        
        props.router.back();
    };

    const addSlide = (text: string = '') => {
        setSlides([...slides, { type: SlideType.Text, text }]);        
    };

    const handleChangeTextSlide = React.useCallback((key: number, text: string) => {
        const updatedSlides = slides.map((slide, index) => {
            if (index !== key) {
                return slide;
            }

            return { ...slide, text };
        });

        setSlides(updatedSlides);
    }, [slides]);

    React.useEffect(() => {
        addSlide();
    }, []);

    const width = Math.min(Dimensions.get('screen').width, 414);
    const containerWidth = width - 32;
    const containerHeight = containerWidth * (4 / 3);
    
    return (
        <>
            <SHeader title="New post" />
            <SHeaderButton title="Post" onPress={handlePost} />
            <SScrollView>
                {slides.map((slide, key) => (
                    <View style={styles.box} key={`post-slide-${key}`}>
                        <FeedItemShadow width={width} height={containerHeight + 16 + 32} />
        
                        <View style={[styles.container, { width: containerWidth, height: containerHeight, backgroundColor: theme.backgroundSecondary }]}>
                            <View style={[styles.meta, { backgroundColor: theme.backgroundSecondary }]}>
                                <View style={[styles.templateAvatar, { backgroundColor: theme.backgroundTertiary }]} />
                                <View style={[styles.templateName, { backgroundColor: theme.backgroundTertiary }]} />
                            </View>
        
                            <View style={styles.inputContainer}>
                                {typeof slide.text === 'string' && (
                                    <TextInput 
                                        maxLength={MAX_LENGTH_TEXT}
                                        onChangeText={(text) => handleChangeTextSlide(key, text)}
                                        value={slide.text}
                                        multiline
                                        style={styles.input}
                                        placeholder={'Enter text'} 
                                        placeholderTextColor={theme.foregroundTertiary}
                                        {...{ scrollEnabled: false }}
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                ))}
                
                <View style={{ alignItems: 'center', marginTop: 8 }}>
                    <ZRoundedButton 
                        title="Add card"
                        style="secondary" 
                        onPress={() => addSlide()}
                    />
                </View>
            </SScrollView>
        </>
    );
};

const FeedWrapper = XMemo<PageProps>((props) => {
    const engine = getMessenger().engine.feed;

    return <FeedCreatePostComponent engine={engine} router={props.router} />;
});

export const FeedCreatePost = withApp(FeedWrapper, { navigationAppearance: 'small' });
