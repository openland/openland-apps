import * as React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { SScrollView } from 'react-native-s/SScrollView';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SlideInput, SlideType } from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import UUID from 'uuid/v4';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { FeedCreateSlide } from './FeedCreateSlide';

const FeedCreatePostComponent = React.memo((props: PageProps) => {
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
            if (typeof slide.text === 'string') {
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

        startLoader();

        const repeatKey = UUID();

        await backoff(async () => await client.mutateFeedCreatePost({ input, repeatKey }));

        stopLoader();
        props.router.back();
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
                            <FeedCreateSlide
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
});

export const FeedCreatePost = withApp(FeedCreatePostComponent, { navigationAppearance: 'small' });
