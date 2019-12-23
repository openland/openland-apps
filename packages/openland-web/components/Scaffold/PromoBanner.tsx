import * as React from 'react';
import { css } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XView } from 'react-mental';
import CloseIcon from 'openland-icons/ic-close-banner.svg';
import { detectOS } from 'openland-x-utils/detectOS';

const titleClassName = css`
    font-weight: 500;
`;

export const PromoBanner = (props: { onClise: () => void }) => {
    const os = detectOS();
    return (
        <XView
            height={50}
            width="100%"
            flexShrink={0}
            backgroundImage="linear-gradient(92deg, #28a2dc, #3394ed)"
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
        >
            <XView fontSize={15} color="#fff" whiteSpace="nowrap" marginRight={42}>
                <span className={titleClassName}>Install Openland apps</span>
            </XView>
            {os === 'Mac' && (
                <XView cursor="pointer" alignItems="center" flexDirection="row" marginRight={24}>
                    <UButton text="Mac" style="primary" size="small" href="https://oplnd.com/mac" />
                </XView>
            )}
            {os === 'Windows' && (
                <XView cursor="pointer" alignItems="center" flexDirection="row" marginRight={24}>
                    <UButton
                        text="Windows"
                        style="primary"
                        size="small"
                        href="https://oplnd.com/windows"
                    />
                </XView>
            )}
            {os === 'Linux' && (
                <XView cursor="pointer" alignItems="center" flexDirection="row" marginRight={24}>
                    <UButton
                        text="Linux"
                        style="primary"
                        size="small"
                        href="https://oplnd.com/linux"
                    />
                </XView>
            )}
            <XView cursor="pointer" alignItems="center" flexDirection="row" marginRight={24}>
                <UButton text="iOS" style="primary" size="small" href="https://oplnd.com/ios" />
            </XView>
            <XView cursor="pointer" alignItems="center" flexDirection="row">
                <UButton
                    text="Android"
                    style="primary"
                    size="small"
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
};
