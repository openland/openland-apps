import * as React from 'react';
import { css } from 'linaria';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { XLink } from 'openland-x/XLink';
import { XAvatar } from 'openland-x/XAvatar';
import { XDate } from 'openland-x/XDate';
import PhotoIcon from '../components/icons/ic-photo.svg';
import FileIcon from '../components/icons/ic-file-2.svg';
import { XCounter } from 'openland-x/XCounter';

let item = css`
    display: flex;
    height: 72px;
    font-size: 15px;
    font-weight: 500;
    flex-direction: row;
    align-items: center;
    padding-left: 16px;
    padding-right: 0px;
    padding-top: 4px;
    padding-bottom: 4px;
    position: relative;
    &:hover, &:focus {
        background-color: rgba(23, 144, 255, 0.05);
        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
            color: #334562;
        }
    }

    &.is-active {
        background-color: #4596e1;
        &:hover {
            background-color: #4596e1;
            color: #334562;
        }
        & .title, .content {
            color: #fff !important;
            opacity: 1 !important;
        }
        & .date {
            color: rgba(255, 255, 255, 0.8) !important;
        }
        & .header:before {
            display: none;
        }
    }
`;

let content = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0px;
    min-width: 0px;
    align-items: stretch;
    align-self: stretch;
    padding-left: 12px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    position: relative;
`;

let top = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: 0px;
    height: 18px;
    margin-bottom: 4px;
`;

let title = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0px;
    height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: rgb(40,40,40);
    /* fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: neutral(0.8) */
    & > span: {
        white-pace: nowrap;
        overflow: hidden;
        text-Overflow: ellipsis;
    },
`;

let body = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0px;
    min-width: 0px;
`;

let date = css`
    display: flex;
    flex-direction: row;
    align-self: flex-start;
    align-items: flex-end;
    flex-shrink: 0px;
    height: 18px;
    color: rgba(0, 0, 0, 0.3);
    margin-left: 5px;

    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    text-transform: uppercase;
`;

let contentText = css`
    display: flex;
    height: 34px;
    opacity: 0.8;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0px;
    min-width: 0px;

    font-size: 13px;
    font-weight: 400;
    line-height: 17px;

    overflow: hidden;
    /* & span {
        display: block;
        height: '100%',
        overflow: 'hidden',
    }, */

    /* // Webkit line clamp
    '& > span': {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
    '&.with-unread': {
        paddingRight: 32,
    } */
`;

export class DialogView extends React.PureComponent<{ item: DialogDataSourceItem }> {
    render() {
        let conv = this.props.item;
        let isPrivate = this.props.item.type === 'PrivateConversation';
        return (
            <XLink className={item} path={'/mail/' + this.props.item.flexibleId}>
                <XAvatar
                    style={(this.props.item.type === 'SharedConversation'
                        ? 'organization'
                        : this.props.item.type === 'GroupConversation'
                            ? 'group'
                            : this.props.item.type === 'ChannelConversation'
                                ? 'room' :
                                this.props.item.type === 'PrivateConversation' ? 'user' : undefined
                    )}
                    objectName={this.props.item.title}
                    objectId={this.props.item.flexibleId}
                    online={this.props.item.online}
                    cloudImageUuid={this.props.item.photo}
                />
                <div className={content}>
                    <div className={top}>
                        <div className={title}><span>{this.props.item.title}</span></div>
                        {this.props.item.date && <div className={date}><XDate value={this.props.item.date.toString()} format="datetime_short" /></div>}
                    </div>
                    <div className={body}>
                        <div className={contentText}>
                            {conv.typing || (
                                <>
                                    {!!(conv.message) && !conv.fileMeta && (
                                        <span>{conv.isOut ? 'You:' : (isPrivate ? null : conv.sender + ':')} {conv.message}</span>
                                    )}
                                    {conv.fileMeta && conv.fileMeta.isImage && (
                                        <span>{conv.isOut ? 'You:' : (isPrivate ? null : conv.sender + ':')} <PhotoIcon />Image</span>
                                    )}
                                    {conv.fileMeta && !conv.fileMeta.isImage && (
                                        <span>{conv.isOut ? 'You:' : (isPrivate ? null : conv.sender + ':')} <FileIcon className="document" />Document</span>
                                    )}
                                </>
                            )}
                        </div>
                        {conv.unread > 0 && (
                            <div><XCounter big={true} count={conv.unread} /></div>
                        )}
                    </div>
                </div>
            </XLink>
        );
    }
}