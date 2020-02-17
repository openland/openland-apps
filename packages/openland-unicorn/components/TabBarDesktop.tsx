import * as React from 'react';
import { XView, XViewRouter } from 'react-mental';
import { css, cx } from 'linaria';
import { TabRouter } from './TabRouter';
import AppearanceIcon from 'openland-icons/s/ic-appearance-24.svg';
import SuperIcon from 'openland-icons/s/ic-settings-24.svg';
import Logo from './Logo';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

const selectorStyle = css`
    position: absolute;
    top: 70px;
    left: 0px;
    height: 48px;
    width: 3px;
    background-color: #1885f2;
    border-radius: 0px 100px 100px 0px;
    transition: transform 150ms cubic-bezier(0, 0, 0.2, 1);
    will-change: transform;
`;

export const counterStyle = css`
    background-color: #e62e3d;
    position: absolute;
    top: 8px;
    border: 2px solid #f2f3f5;
    right: 15px;
    height: 20px;
    min-width: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
    color: white;
    font-size: 10px;
    line-height: 16px;
    text-align: center;
    font-weight: 600;
    border-radius: 20px;
    padding-left: 2px;
    padding-right: 2px;
`;

const counterDozenStyle = css`
    right: 12px;
`;

const counterHundredStyle = css`
    right: 10px;
`;

interface TabBarButtonProps {
    selected: boolean;
    onClick: () => void;
    icon: JSX.Element;
    iconActive: JSX.Element;
    counters: number;
    caption: string;
}

const TabBarButton = React.memo((props: TabBarButtonProps) => {
    const counterClassName = cx(
        counterStyle,
        props.counters >= 10 && counterDozenStyle,
        props.counters >= 100 && counterHundredStyle,
    );

    return (
        <XView
            width={64}
            height={54}
            alignItems="center"
            justifyContent="center"
            hoverBackgroundColor="var(--backgroundTertiaryHover)"
            cursor="pointer"
            onClick={props.onClick}
        >
            {!props.selected && props.icon}
            {props.selected && props.iconActive}
            {props.counters > 0 && <span className={counterClassName}>{props.counters}</span>}
        </XView>
    );
});

interface TabBarDesktopProps {
    selected: number;
    setSelected: (index: number) => void;
    router: TabRouter;
    xRouter: XViewRouter;
}

export const TabBarDesktop = React.memo((props: TabBarDesktopProps) => {
    const [counters, setCounters] = React.useState(props.router.counters);

    React.useEffect(() => {
        return props.router.onCountersChanged(setCounters);
    }, []);
    return (
        <XView
            height="100%"
            width="100%"
            backgroundColor="var(--backgroundTertiary)"
            paddingTop={2}
        >
            <XView
                width={64}
                height={64}
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={() => {
                    // set the active tab to /mail

                    if (props.router.stacks[1]) {
                        props.router.stacks[1].reset();
                        props.setSelected(1);
                    }

                    setTimeout(() => {
                        props.xRouter.navigate('/mail');
                    }, 10);
                }}
            >
                <Logo />
            </XView>
            {props.router.tabs.map((v, i) => (
                <TabBarButton
                    onClick={() => props.setSelected(i)}
                    selected={props.selected === i}
                    icon={v.icon}
                    iconActive={v.iconActive}
                    counters={counters[i]}
                    caption={v.caption}
                    key={'tab_index' + i}
                />
            ))}
            <div
                className={selectorStyle}
                style={{ transform: `translateY(${props.selected * 54}px)` }}
            />
            <XWithRole role="super-admin">
                <XView width={64} position="absolute" bottom={0}>
                    <XView
                        height={54}
                        width={64}
                        alignItems="center"
                        justifyContent="center"
                        hoverBackgroundColor="var(--backgroundTertiaryHover)"
                        cursor="pointer"
                        path="/ui"
                    >
                        <UIcon icon={<AppearanceIcon />} color="#676D7A" />
                    </XView>
                    <XView
                        height={54}
                        width={64}
                        alignItems="center"
                        justifyContent="center"
                        hoverBackgroundColor="var(--backgroundTertiaryHover)"
                        cursor="pointer"
                        path="/super"
                    >
                        <UIcon icon={<SuperIcon />} color="#676D7A" />
                    </XView>
                </XView>
            </XWithRole>
        </XView>
    );
});
