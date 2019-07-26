import * as React from 'react';
import { XView } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { TabRouter } from './TabRouter';
import { css } from 'linaria';

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

export const TabBarMobile = React.memo((props: {
    selected: number,
    setSelected: (index: number) => void,
    router: TabRouter
}) => {
    const [counters, setCounters] = React.useState(props.router.counters);
    React.useEffect(() => {
        return props.router.onCountersChanged(setCounters);
    }, []);
    return (
        <XView height={52} backgroundColor={ThemeDefault.backgroundPrimary} flexDirection="row">
            {props.router.tabs.map((v, i) => (
                <XView
                    height={52}
                    flexGrow={1}
                    flexBasis={0}
                    minWidth={0}
                    alignItems="center"
                    justifyContent="center"
                    hoverBackgroundColor={ThemeDefault.backgroundPrimaryHover}
                    cursor="pointer"
                    onClick={() => props.setSelected(i)}
                >
                    {props.selected !== i && v.icon}
                    {props.selected === i && v.iconActive}
                    {counters[i] > 0 && (<span className={counterStyle}>{counters[i]}</span>)}
                </XView>
            ))}
        </XView>
    );
});