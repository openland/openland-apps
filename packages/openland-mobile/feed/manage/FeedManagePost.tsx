import * as React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { SScrollView } from 'react-native-s/SScrollView';
import { SlideType, SlideCoverAlign, ImageRefInput } from 'openland-api/Types';
import { FeedManageSlide } from './FeedManageSlide';
import { SUPER_ADMIN } from 'openland-mobile/pages/Init';
import { ZListItem } from 'openland-mobile/components/ZListItem';
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

    const handleSent = React.useCallback(async () => {
        onSent(slides, global);
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

    const handleChangeAttachment = React.useCallback((key: string | undefined, attachment?: SlideInputLocalAttachment) => {
        setSlides(prev => prev.map(slide => ({
            ...slide,
            attachmentLocal: key === slide.key ? attachment : slide.attachmentLocal
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

    return (
        <>
            <SHeaderButton title={action} onPress={handleSent} />
            <KeyboardAvoidingView flexGrow={1} behavior={'padding'}>
                <SScrollView scrollRef={scrollViewRef as React.RefObject<ScrollView>}>
                    {!initial && SUPER_ADMIN && (
                        <ZListItem text="For everyone" toggle={global} onToggle={v => setGlobal(v)} />
                    )}

                    {slides.map(slide => (
                        <View key={`slide-${slide.key}`}>
                            <FeedManageSlide
                                slide={slide}
                                onChangeText={v => handleChangeText(slide.key, v)}
                                onChangeCover={c => handleChangeCover(slide.key, c)}
                                onChangeCoverAlign={a => handleChangeCoverAlign(slide.key, a)}
                                onChangeAttachment={a => handleChangeAttachment(slide.key, a)}
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