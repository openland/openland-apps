import * as React from 'react';
import { XView } from 'react-mental';
import { Slide } from './components/Slide';

const BaseSlide = (props: { index: number, children?: any }) => {
    return (
        <Slide
            start={props.index}
            duration={1}
        >
            <img
                src="https://ucarecdn.com/6ca08ef7-c5a1-425a-bc40-7b554a6d8b46/Backwhite.png"
                style={{
                    position: 'absolute',
                    top: 0, bottom: 0, left: 0, right: 0,
                    width: 375, height: 375,
                    objectFit: 'cover'
                }}
            />
            <XView
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                fontSize={29}
                lineHeight="38px"
                paddingHorizontal={32}
                paddingTop={16}
                paddingBottom={32}
                flexDirection="column"
                justifyContent="flex-end"
            >
                {props.children}
            </XView>
        </Slide>
    );
};

export const SampleVideoDuration = 5;

export const SampleVideo = React.memo(() => {
    return (
        <XView width="100%" height="100%" backgroundColor="red">
            <BaseSlide index={0}>
                To raise a round <br />
                you need 100+ intros
            </BaseSlide>
            <BaseSlide index={1}>
                Most people will <br />
                only make 1-2 intros
            </BaseSlide>
            <BaseSlide index={2}>
                To win, you need <br />
                50+ successful <br />
                founders helping you
            </BaseSlide>
            <BaseSlide index={3}>
                If your founder <br />
                network is small, <br />
                time to make new <br />
                friends!
            </BaseSlide>
            <BaseSlide index={4}>
                Place where founders <br />
                become friends
            </BaseSlide>
        </XView >
    );
});