import * as React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { SScrollView } from 'react-native-s/SScrollView';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SlideInput, SlideType, SlideCoverAlign, ImageRefInput } from 'openland-api/Types';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { FeedCreateSlide } from './FeedCreateSlide';
import { SUPER_ADMIN } from 'openland-mobile/pages/Init';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { getMessenger } from 'openland-mobile/utils/messenger';
import Toast from 'openland-mobile/components/Toast';

const FeedCreatePostComponent = React.memo((props: PageProps) => {
    const feedEngine = getMessenger().engine.feed;

    const [slides, setSlides] = React.useState<SlideInput[]>([{ type: SlideType.Text }]);
    const scrollViewRef = React.useRef<ScrollView>(null);
    const prevSlidesLength = React.useRef<number>(0);
    const [global, setGlobal] = React.useState(false);

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
        startLoader();

        if (await feedEngine.createPost(slides, global)) {
            props.router.back();
        } else {
            Toast.failure({ duration: 1000, text: 'Post can\'t be empty' }).show();
        }

        stopLoader();
    }, [slides, global]);

    const addSlide = React.useCallback(() => {
        setSlides(prev => [...prev, { type: SlideType.Text }]);
    }, []);

    const handleChangeText = React.useCallback((index: number, text: string) => {
        setSlides(prev => prev.map((slide, key) => ({
            ...slide,
            text: key === index ? text : slide.text
        })));
    }, []);

    const handleChangeCover = React.useCallback((index: number, cover?: ImageRefInput) => {
        setSlides(prev => prev.map((slide, key) => ({
            ...slide,
            cover: key === index ? cover : slide.cover
        })));
    }, []);

    const handleChangeCoverAlign = React.useCallback((index: number, align?: SlideCoverAlign) => {
        setSlides(prev => prev.map((slide, key) => ({
            ...slide,
            coverAlign: key === index ? align : slide.coverAlign
        })));
    }, []);

    const handleDeleteSlide = React.useCallback((index: number) => {
        setSlides(prev => prev.filter((slide, key) => key !== index));
    }, []);

    return (
        <>
            <SHeader title="New post" />
            <SHeaderButton title="Post" onPress={handlePost} />
            <KeyboardAvoidingView flexGrow={1} behavior={'padding'}>
                <SScrollView scrollRef={scrollViewRef as React.RefObject<ScrollView>}>
                    {SUPER_ADMIN && (
                        <ZListItem text="Global Post [SUPER_ADMIN]" toggle={global} onToggle={v => setGlobal(v)} />
                    )}

                    {slides.map((slide, index) => (
                        <View key={index}>
                            <FeedCreateSlide
                                index={index}
                                slide={slide}
                                onChangeText={v => handleChangeText(index, v)}
                                onChangeCover={c => handleChangeCover(index, c)}
                                onChangeCoverAlign={a => handleChangeCoverAlign(index, a)}
                                onDelete={slides.length > 1 ? () => handleDeleteSlide(index) : undefined}
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