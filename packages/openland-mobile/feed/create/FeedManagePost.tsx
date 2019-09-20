import * as React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { SScrollView } from 'react-native-s/SScrollView';
import { SlideType, SlideCoverAlign, ImageRefInput } from 'openland-api/Types';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { FeedCreateSlide } from './FeedCreateSlide';
import { SUPER_ADMIN } from 'openland-mobile/pages/Init';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { getMessenger } from 'openland-mobile/utils/messenger';
import Toast from 'openland-mobile/components/Toast';
import UUID from 'uuid/v4';
import { SlideInputLocal } from 'openland-engines/feed/types';

export const FeedManagePost = React.memo(props => {
    const messenger = getMessenger();
    const router = messenger.history.navigationManager;
    const feedEngine = messenger.engine.feed;

    const [slides, setSlides] = React.useState<SlideInputLocal[]>([]);
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
            router.pop();
        } else {
            Toast.failure({ duration: 1000, text: 'Post can\'t be empty' }).show();
        }

        stopLoader();
    }, [slides, global]);

    const addSlide = React.useCallback(() => {
        const key = UUID();

        setSlides(prev => [...prev, { key, type: SlideType.Text }]);
    }, []);

    const handleChangeText = React.useCallback((key: string | undefined, text: string) => {
        setSlides(prev => prev.map(slide => ({
            ...slide,
            text: key === slide.key ? text : slide.text
        })));
    }, []);

    const handleChangeCover = React.useCallback((key: string | undefined, cover?: ImageRefInput) => {
        setSlides(prev => prev.map(slide => ({
            ...slide,
            cover: key === slide.key ? cover : slide.cover
        })));
    }, []);

    const handleChangeCoverAlign = React.useCallback((key: string | undefined, align?: SlideCoverAlign) => {
        setSlides(prev => prev.map(slide => ({
            ...slide,
            coverAlign: key === slide.key ? align : slide.coverAlign
        })));
    }, []);

    const handleDeleteSlide = React.useCallback((key: string | undefined) => {
        setSlides(prev => prev.filter(slide => key !== slide.key));
    }, []);

    React.useEffect(() => {
        addSlide();
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

                    {slides.map(slide => (
                        <View key={`slide-${slide.key}`}>
                            <FeedCreateSlide
                                slide={slide}
                                onChangeText={v => handleChangeText(slide.key, v)}
                                onChangeCover={c => handleChangeCover(slide.key, c)}
                                onChangeCoverAlign={a => handleChangeCoverAlign(slide.key, a)}
                                onDelete={slides.length > 1 ? () => handleDeleteSlide(slide.key) : undefined}
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