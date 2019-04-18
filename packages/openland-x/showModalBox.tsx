import * as React from 'react';
import { XModal, showModal } from './showModal';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { randomKey } from 'openland-graphql/utils/randomKey';

// 0px 3px 14px 4px #82777747

const boxStyle = css`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0px 3px 14px 4px #82777747;
`

const overlayStyle = css`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
`;

export function showModalBox(modal: XModal) {
    showModal((ctx) => {
        let key = randomKey();
        ctx.setOnEscPressed(() => {
            ctx.hide();
        })
        let handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if ((e.target as HTMLDivElement).id === key) {
                ctx.hide();
            }
        }

        let contents = modal(ctx);
        return (
            <div className={overlayStyle} onClick={handleContainerClick} id={key}>
                <div className={boxStyle} tabIndex={-1}>
                    {contents}
                </div>
            </div>
        )
    })
}