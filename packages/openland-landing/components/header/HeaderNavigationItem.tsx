import * as React from 'react';
import { XView } from 'react-mental';

interface HeaderNavigationItemProps {
    path: string;
    content: string;
}

export const HeaderNavigationItem = (props: HeaderNavigationItemProps) => (
    <XView
        as="a"
        linkSelectable={true}
        path={props.path}
        marginRight={32}
        color="#536086"
        hoverColor="#1f3449"
        fontSize={16}
        lineHeight="20px"
        fontWeight="600"
        paddingVertical={10}
        selectedColor="#1f3449"
        position="relative"
        hoverTextDecoration="none"
    >
        {props.content}
        <XView
            height={2}
            position="absolute"
            left={0}
            right={0}
            bottom={2}
            selectedBackgroundColor="#1790ff"
        />
    </XView>
);
