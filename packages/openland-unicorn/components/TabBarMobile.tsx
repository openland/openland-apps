import * as React from 'react';
import { XView } from 'react-mental';
import { TabRouter } from './TabRouter';
import { css } from 'linaria';

const counterStyle = css`
    background-color: #F23051;
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
    line-height: 12px;
    text-align: center;
    font-weight: 700;
    border-radius: 20px;
    padding-left: 4px;
    padding-right: 4px;
    letter-spacing: 0.25px;
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
        <XView height={52} backgroundColor="var(--backgroundPrimary)" flexDirection="row">
            {props.router.tabs.map((v, i) => (
                <XView
                    height={52}
                    flexGrow={1}
                    flexBasis={0}
                    minWidth={0}
                    alignItems="center"
                    justifyContent="center"
                    hoverBackgroundColor="var(--backgroundPrimaryHover)"
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