import * as React from 'react';
import { XView } from 'react-mental';
import { ThemeLightBlue } from 'openland-y-utils/themes';

export const UListItem = React.memo((props: { text: string, onClick?: () => void }) => {
    return (
        <XView
            height={48}
            paddingHorizontal={16}
            alignItems="center"
            flexDirection="row"
            hoverBackgroundColor={ThemeLightBlue.backgroundPrimaryHover}
            selectedBackgroundColor={ThemeLightBlue.backgroundPrimaryHover}
            cursor="pointer"
            onClick={props.onClick}
        >
            <XView lineHeight="24px" fontSize={15}>
                {props.text}
            </XView>
        </XView>
    );
});