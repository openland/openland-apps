import * as React from 'react';
import { css, cx } from 'linaria';
import { ScrollTo } from './DataSourceRender';
import { TextCaption } from 'openland-web/utils/TextStyles';

const dividerContainer = css`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    height: 32px;
    position: relative;
    margin: 4px 0;
    width: 100%;

    &::before {
        position: absolute;
        content: '';
        top: 17px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #f2f3f5;
        z-index: -1;
    }
`;

const dividerContent = css`
    color: #676d7a;
    text-align: center;
    padding: 7px 16px;
    background-color: #fff;
`;

export const NewMessageDividerComponent = (props: { dividerKey: string } & ScrollTo) => {
    const ref = React.useRef<any | null>(null);

    // React.useEffect(
    //     () => {
    //         return isChatActive.listen(async active => {
    //             await delay(0);
    //             if (ref.current && props.scrollTo && active) {
    //                 ref.current.scrollIntoView();
    //                 props.scrollTo.key = undefined;
    //             }
    //         });
    //     },
    //     [ref.current, props.scrollTo],
    // );
    return (
        <div key={props.dividerKey} ref={ref} className={dividerContainer}>
            <div className={cx(dividerContent, TextCaption)}>New messages</div>
        </div>
    );
};
