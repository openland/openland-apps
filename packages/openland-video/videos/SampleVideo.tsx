import * as React from 'react';
import { XView } from 'react-mental';
import { Slide } from './components/Slide';
import { useClampedTime } from './components/useClampedTime';

const BaseSlide = (props: { index: number, children?: any, background?: string, color?: string }) => {
    return (
        <Slide
            start={props.index * 5}
            duration={5}
        >
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
                color={props.color || 'black'}
            >
                {props.children}
            </XView>
        </Slide>
    );
};

const Background = React.memo(() => {
    // const entering = useClampedTime(0, 0.3);
    const main = useClampedTime(5 - 0.3, 5);
    const leaving = useClampedTime(5 * 5 - 0.3, 5 * 5);

    return (
        <>
            <img
                src={'https://ucarecdn.com/12f683de-3d25-45db-ae0d-e450a3d78ae7/'}
                style={{
                    position: 'absolute',
                    top: 0, bottom: 0, left: 0, right: 0,
                    width: 375, height: 375,
                    objectFit: 'cover'
                }}
            />
            <img
                src={'https://ucarecdn.com/6ca08ef7-c5a1-425a-bc40-7b554a6d8b46/'}
                style={{
                    position: 'absolute',
                    top: 0, bottom: 0, left: 0, right: 0,
                    width: 375, height: 375,
                    objectFit: 'cover',
                    opacity: main
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: -40, left: -40, right: 0,
                    width: 170, height: 170,
                    opacity: main,
                    background: 'linear-gradient(214.05deg, #EDEDED 29.35%, #E2E2E2 93.66%)',
                    borderRadius: 85
                }}
            />
            <img
                src={'https://ucarecdn.com/4703d1b4-ebe7-4567-a588-c85513c96619/'}
                style={{
                    position: 'absolute',
                    top: 0, bottom: 0, left: 0, right: 0,
                    width: 375, height: 375,
                    objectFit: 'cover',
                    opacity: leaving
                }}
            />
        </>
    );
});

export const SampleVideoDuration = 6 * 5 * 1000;

export const SampleVideo = React.memo(() => {
    return (
        <XView width="100%" height="100%">
            <Background />
            <BaseSlide
                index={0}
                color="white"
            >
                Become friends <br />
                with more founders
            </BaseSlide>
            <BaseSlide index={1}>
                To raise a round <br />
                you need 100+ intros
            </BaseSlide>
            <BaseSlide index={2}>
                Most people will <br />
                only make 1-2 intros
            </BaseSlide>
            <BaseSlide index={3}>
                To win, you need <br />
                50+ successful <br />
                founders helping you
            </BaseSlide>
            <BaseSlide index={4}>
                If your founder <br />
                network is small, <br />
                time to make new <br />
                friends!
            </BaseSlide>
            <BaseSlide
                index={5}
                color="white"
            >
                <img
                    src="https://ucarecdn.com/5595be37-0f00-4f44-afe7-5dfdc4bd2968/"
                    style={{
                        borderRadius: 20
                    }}
                />
                Place where founders <br />
                become friends
            </BaseSlide>
        </XView >
    );
});