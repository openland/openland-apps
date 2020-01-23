import * as React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZButton } from 'openland-mobile/components/ZButton';
import { SScrollView } from 'react-native-s/SScrollView';
import { SlideType, SlideCoverAlign, ImageRefInput } from 'openland-api/Types';
import { FeedManageSlide } from './FeedManageSlide';
import UUID from 'uuid/v4';
import { SlideInputLocal, SlideInputLocalAttachment } from 'openland-engines/feed/types';

interface FeedManagePostProps {
    initial?: SlideInputLocal[];
    onSent: (slides: SlideInputLocal[], global?: boolean) => void;
    action: string;
}

export const FeedManagePost = React.memo((props: FeedManagePostProps) => {
    const { initial, onSent, action } = props;

    const [slides, setSlides] = React.useState<SlideInputLocal[]>(initial || []);
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

    const handleSent = React.useCallback(async () => {
        onSent(slides);
    }, [slides, global]);

    const addSlide = React.useCallback(() => {
        const key = UUID();

        setSlides(prev => [...prev, { key, type: SlideType.Text, coverLoading: false }]);
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

    const handleChangeAttachment = React.useCallback((key: string | undefined, attachment?: SlideInputLocalAttachment) => {
        setSlides(prev => prev.map(slide => ({
            ...slide,
            attachmentLocal: key === slide.key ? attachment : slide.attachmentLocal
        })));
    }, []);

    const handleCoverLoading = React.useCallback((key: string | undefined, loading: boolean) => {
        setSlides(prev => prev.map(slide => ({
            ...slide,
            coverLoading: key === slide.key ? loading : slide.coverLoading
        })));
    }, []);

    const handleDeleteSlide = React.useCallback((key: string | undefined) => {
        setSlides(prev => prev.filter(slide => key !== slide.key));
    }, []);

    React.useEffect(() => {
        if (!initial) {
            addSlide();
        }
    }, []);

    const canPost = slides.filter(slide => slide.coverLoading).length <= 0;

    return (
        <>
            <SHeaderButton key={'btn-' + canPost} title={action} onPress={handleSent} disabled={!canPost} />
            <KeyboardAvoidingView flexGrow={1} behavior={'padding'}>
                <SScrollView scrollRef={scrollViewRef as React.RefObject<ScrollView>}>
                    {slides.map(slide => (
                        <View key={`slide-${slide.key}`}>
                            <FeedManageSlide
                                slide={slide}
                                onChangeText={v => handleChangeText(slide.key, v)}
                                onChangeCover={c => handleChangeCover(slide.key, c)}
                                onChangeCoverAlign={a => handleChangeCoverAlign(slide.key, a)}
                                onChangeAttachment={a => handleChangeAttachment(slide.key, a)}
                                onCoverLoading={l => handleCoverLoading(slide.key, l)}
                                onDelete={slides.length > 1 ? () => handleDeleteSlide(slide.key) : undefined}
                            />
                        </View>
                    ))}

                    <View style={{ alignItems: 'center', marginTop: 8 }}>
                        <ZButton
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