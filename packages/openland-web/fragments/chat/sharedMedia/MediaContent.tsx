import * as React from 'react';
import { css } from 'linaria';
import { SharedItemFile } from './SharedMediaFragment';

const MediaItemClass = css`
display: flex;
width: 25%;    
position: relative;
@media (max-width: 750px) {
    width: calc(100% / 3);    
}

&:before {
    content: '';
    display: block;
    padding-top: 100%;
}
`;
const MediaItemContentClass = css`
position: absolute;
top:1px;
left: 1px;

display: block;
width: calc(100% - 2px);
`;
export const MediaContent = (props: { item: SharedItemFile }) => {
return (
    <div className={MediaItemClass}>
        <img src={`https://ucarecdn.com/${props.item.attach.fileId}/-/format/auto/-/scale_crop/138x138/smart/`} className={MediaItemContentClass} />
    </div>
);
};