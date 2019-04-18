import * as React from 'react';
import { XModal, showModal } from './showModal';
import { XView } from 'react-mental';
import { css } from 'linaria';

// 0px 3px 14px 4px #82777747

const boxStyle = css`
    background-color: white;
    border-radius: 16px;
    box-shadow: 0px 3px 14px 4px #82777747;
`

export function showModalBox(modal: XModal) {
    showModal((ctx) => {
        let contents = modal(ctx);
        return (
            <XView alignItems="center" justifyContent="center" width="100%" height="100%">
                <div className={boxStyle}>
                    {contents}
                </div>
            </XView >
        )
    })
}