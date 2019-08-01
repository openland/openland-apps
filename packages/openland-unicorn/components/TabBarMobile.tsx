import * as React from 'react';
import { XView } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { TabRouter } from './TabRouter';
import { css } from 'linaria';

const counterStyle = css`
    background-color: #E62E3D;
    border: 2px solid #fff;
    position: absolute;
    top: 8px;
    left: 50%;
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