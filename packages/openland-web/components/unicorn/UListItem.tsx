import * as React from 'react';
import { XView, XViewSelectedContext } from 'react-mental';
import { ThemeLightBlue } from 'openland-y-utils/themes';
import { css } from 'linaria';

const selectedStyle = css`
 * path {
    stroke: white; 
 }
`;

const SelectableSVG = React.memo((props: { children?: any }) => {
    let selected = React.useContext(XViewSelectedContext);
    if (selected) {
        return (<div className={selectedStyle}>{props.children}</div>);
    }
    return (<div>{props.children}</div>);
});

export const UListItem = React.memo((props: {
    text: string,
    icon?: any,
    onClick?: () => void,
    path?: string
}) => {
    return (
        <XView
            height={48}
            paddingHorizontal={16}
            alignItems="center"
            flexDirection="row"
            hoverBackgroundColor={ThemeLightBlue.backgroundPrimaryHover}
            selectedBackgroundColor={ThemeLightBlue.accentPrimary}
            selectedHoverBackgroundColor={ThemeLightBlue.accentPrimaryHover}
            selectedColor="#fff"
            cursor="pointer"
            onClick={props.onClick}
            path={props.path}
            linkSelectable={true}
        >
            {props.icon && <XView marginRight={19} width={24} height={24}><SelectableSVG>{props.icon}</SelectableSVG></XView>}
            <XView lineHeight="24px" fontSize={15}>
                {props.text}
            </XView>
        </XView>
    );
});