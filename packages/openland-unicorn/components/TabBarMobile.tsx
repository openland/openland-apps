import * as React from 'react';
import { XView } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { TabRouter } from './TabRouter';

export const TabBarMobile = React.memo((props: {
    selected: number,
    setSelected: (index: number) => void,
    router: TabRouter
}) => {
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
                </XView>
            ))}
        </XView>
    );
});