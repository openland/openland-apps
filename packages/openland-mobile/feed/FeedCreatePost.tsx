import * as React from 'react';
import { View, StyleSheet, TextInput, Dimensions, ViewStyle, TextStyle, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
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
import { backoff } from 'openland-y-utils/timer';
import UUID from 'uuid/v4';

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

interface SlideComponentProps {
    slide: SlideInput;
    index: number;
    onChangeText: (index: number, text: string) => void;
}

const SlideComponent = (props: SlideComponentProps) => {
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
        </TouchableWithoutFeedback>
    );
};

const FeedCreatePostComponent = (props: { engine: FeedEngine; router: SRouter; }) => {
    const client = getClient();
    
    const [slides, setSlides] = React.useState<SlideInput[]>([]);
    const scrollViewRef = React.useRef<ScrollView>(null);
    const prevSlidesLength = React.useRef<number>(0);

    React.useEffect(() => {
        if (slides.length > prevSlidesLength.current) {
            if (scrollViewRef.current) {
                (scrollViewRef.current as any).getNode().scrollToEnd({ animated: true });
            }
        }
    }, [slides]);

    React.useEffect(() => {
        prevSlidesLength.current = slides.length;
    });

    const handlePost = React.useCallback(async () => {
        const input: SlideInput[] = [];
        for (let slide of slides) {
            if (typeof slide.text === 'string')  {
                slide.text = slide.text.trim();

                if (slide.text === '') {
                    continue;
                }
            }

            input.push(slide);
        }

        if (input.length < 1) {
            return;
        }

        Loader.show();
        
        try {
            const repeatKey = UUID();

            await backoff(async () => await client.mutateFeedCreatePost({ input, repeatKey }));
        } finally {
            Loader.hide();
            props.router.back();
        }
    }, [slides]);

    const addSlide = (text: string = '') => {
        setSlides([...slides, { type: SlideType.Text, text }]); 
    };

    const handleChangeTextSlide = React.useCallback((index: number, text: string) => {
        const updatedSlides = slides.map((slide, key) => {
            if (key !== index) {
                return slide;
            }
            
            return { ...slide, text };
        });

        setSlides(updatedSlides);
    }, [slides]);

    React.useEffect(() => {
        addSlide();
    }, []);

    return (
        <>
            <SHeader title="New post" />
            <SHeaderButton title="Post" onPress={handlePost} />
            <KeyboardAvoidingView flexGrow={1} behavior={'padding'}>
                <SScrollView scrollRef={scrollViewRef as React.RefObject<ScrollView>}>
                    {slides.map((slide, index) => (
                        <View key={index}>
                            <SlideComponent 
                                index={index} 
                                slide={slide} 
                                onChangeText={handleChangeTextSlide}
                            />
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
            </KeyboardAvoidingView>
        </>
    );
};

const FeedWrapper = XMemo<PageProps>((props) => {
    const engine = getMessenger().engine.feed;

    return <FeedCreatePostComponent engine={engine} router={props.router} />;
});

export const FeedCreatePost = withApp(FeedWrapper, { navigationAppearance: 'small' });
