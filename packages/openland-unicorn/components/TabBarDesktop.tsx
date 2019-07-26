import * as React from 'react';
import { XView } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { css } from 'linaria';
import { TabRouter } from './TabRouter';
import AppearanceIcon from 'openland-icons/s/ic-appearance-24.svg';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

const selectorStyle = css`
    position: absolute;
    top: 70px;
    left: 0px;
    height: 48px;
    width: 3px;
    background-color: #1885F2;
    border-radius: 0px 100px 100px 0px;
    transition: transform 150ms cubic-bezier(0.0, 0.0, 0.2, 1);
    will-change: transform;
`;

const counterStyle = css`
    background-color: #E62E3D;
    position: absolute;
    top: 5px;
    right: 15px;
    height: 16px;
    min-width: 16px;
    align-items: center;
    justify-content: center;
    display: flex;
    color: white;
    font-size: 13px;
    line-height: 16px;
    border-radius: 8px;
`;

export const TabBarDesktop = React.memo((props: {
    selected: number,
    setSelected: (index: number) => void,
    router: TabRouter
}) => {
    const [counters, setCounters] = React.useState(props.router.counters);
    React.useEffect(() => {
        return props.router.onCountersChanged(setCounters);
    }, []);
    return (
        <XView height="100%" width="100%" backgroundColor={ThemeDefault.backgroundTertiary} paddingTop={2}>
            <XView width={64} height={64} alignItems="center" justifyContent="center">
                <img src="/static/img/logo.png" srcSet="/static/img/logo@2x.png" width={36} height={36} />
            </XView>
            {props.router.tabs.map((v, i) => (
                <XView
                    width={64}
                    height={54}
                    alignItems="center"
                    justifyContent="center"
                    hoverBackgroundColor={ThemeDefault.backgroundTertiaryHover}
                    cursor="pointer"
                    onClick={() => props.setSelected(i)}
                >
                    {props.selected !== i && v.icon}
                    {props.selected === i && v.iconActive}
                    {counters[i] > 0 && (<span className={counterStyle}>{counters[i]}</span>)}
                </XView>
            ))}
            <div
                className={selectorStyle}
                style={{ transform: `translateY(${props.selected * 54}px)` }}
            />
            <XWithRole role="super-admin">
                <XView
                    width={64}
                    height={54}
                    alignItems="center"
                    justifyContent="center"
                    hoverBackgroundColor={ThemeDefault.backgroundTertiaryHover}
                    cursor="pointer"
                    path="/ui"
                    position="absolute"
                    bottom={0}
                >
                    <UIcon icon={<AppearanceIcon />} color="#676D7A" />
                </XView>
            </XWithRole>
        </XView>
    );
});