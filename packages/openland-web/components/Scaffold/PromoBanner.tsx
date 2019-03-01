import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';
import IosIcon from 'openland-icons/ic-ios-white.svg';
import AndroidIcon from 'openland-icons/ic-android-white.svg';
import CloseIcon from 'openland-icons/ic-close-banner.svg';

const ActiveButton = Glamorous(XButton)({
    backgroundColor: '#1585ed',
});

export const PromoBanner = (props: { onClise: () => void }) => (
    <XView
        height={50}
        width="100%"
        flexShrink={0}
        backgroundColor="#1790ff"
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
    >
        <XView fontSize={16} fontWeight="600" color="#fff" whiteSpace="nowrap" marginRight={16}>
            Install Openland mobile app to get messages on the go!
        </XView>
        <XView cursor="pointer" alignItems="center" flexDirection="row" marginRight={10}>
            <ActiveButton
                text="Get iOS app"
                style="primary"
                size="small"
                icon={<IosIcon />}
                href="https://oplnd.com/ios"
            />
        </XView>
        <XView cursor="pointer" alignItems="center" flexDirection="row">
            <ActiveButton
                text="Get Android app"
                style="primary"
                size="small"
                icon={<AndroidIcon />}
                href="https://oplnd.com/android"
            />
        </XView>
        <XView
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
            padding={8}
            width={32}
            height={32}
            borderRadius={50}
            hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
            position="absolute"
            top={9}
            right={9}
            onClick={props.onClise}
        >
            <CloseIcon />
        </XView>
    </XView>
);
