import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewProps } from 'react-mental';
import { TextTitle3 } from 'openland-web/utils/TextStyles';

export interface TabItem {
    title: string;
    counter?: number;
    selected: boolean;
}
export const useTabs = (config: (string | [string, (number | null)?])[], initial?: string): [TabItem[], string, (key: string) => void] => {
    const conf = config.map(c => Array.isArray(c) ? c : [c, undefined]) as [string, number?][];
    const [selected, setSelected] = React.useState<string>(initial || conf[0][0]);
    const items = conf.map((item, index) => ({ title: item[0], counter: item[1], selected: !selected ? index === 0 : item[0] === selected }));
    return [items, selected, setSelected];
};

const TabClass = css`
    display: flex;
    flex-direction: row;
    padding: 16px 8px;
    color: var(--foregroundSecondary);
    :hover{
        color: var(--foregroundPrimary);
    }
    cursor: pointer;
    user-select: none;    
`;

const TabSelectedClass = css`
    color: var(--foregroundPrimary);
`;

const Tab = React.memo((props: TabItem & { setSelected: (tabKey: String) => void, innerRef: React.RefObject<HTMLDivElement> }) => {
    const onClick = React.useCallback(() => props.setSelected(props.title), []);
    return (
        <div onClick={onClick} className={cx(TextTitle3, TabClass, props.selected && TabSelectedClass)} ref={props.innerRef}>
            {props.title} <XView marginLeft={4} color="var(--foregroundTertiary)">{props.counter}</XView>
        </div>
    );
});

const TabLineClass = css`
    position: absolute;
    border-radius: 0px 0px 100px 100px;
    height: 2px;
    width: 48px;
    top: 0;
    left: 8px;
    background: var(--foregroundPrimary);
    will-change: transform, width;
    transition: width 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99), transform 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99);

`;
export const Tabs = React.memo((props: { tabs: TabItem[], setSelected: (tabKey: String) => void } & XViewProps) => {
    let { tabs, setSelected, ...style } = props;
    const refs = React.useMemo<React.RefObject<HTMLDivElement>[]>(() => props.tabs.map(_ => React.createRef()), [props.tabs.length]);
    const lineRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (lineRef.current) {
            let index = props.tabs.findIndex(t => t.selected);
            let currentTabRef = refs[index];
            if (index === -1) {
                lineRef.current.style.display = 'none';
            } else {
                lineRef.current.style.transform = `translateX(${refs.reduce((offset, next, i) => offset + ((i < index && next.current) ? next.current!.clientWidth : 0), 0)}px)`;
                if (currentTabRef.current) {
                    lineRef.current.style.width = `${currentTabRef.current.offsetWidth - 16}px`;

                }
            }
        }
    }, [props.selected, props.tabs]);
    return (
        <XView flexDirection="row" height={56} {...style}>
            <div ref={lineRef} className={TabLineClass} />
            {tabs.map((t, i) => <Tab key={t.title} innerRef={refs[i]} {...t} setSelected={setSelected} />)}
        </XView>
    );
});