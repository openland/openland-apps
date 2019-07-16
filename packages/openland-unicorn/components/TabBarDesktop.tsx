import * as React from 'react';
import { XView } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { css } from 'linaria';
import { TabRouter } from './TabRouter';

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

export const TabBarDesktop = React.memo((props: {
    selected: number,
    setSelected: (index: number) => void,
    router: TabRouter
}) => {
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
                </XView>
            ))}
            <div
                className={selectorStyle}
                style={{ transform: `translateY(${props.selected * 54}px)` }}
            />
        </XView>
    );
});