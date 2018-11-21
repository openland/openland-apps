import * as React from 'react';
import { css } from 'linaria';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { XLink } from 'openland-x/XLink';
import { XAvatar } from 'openland-x/XAvatar';
import { XDate } from 'openland-x/XDate';
import PhotoIcon from '../components/icons/ic-photo.svg';
import FileIcon from '../components/icons/ic-file-2.svg';
import { XCounter } from 'openland-x/XCounter';

let content = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0 12px 0 16px;
    position: relative;
    min-width: 0px;
`;

let top = css`
    display: flex;
    flex-direction: row;
    height: 18px;
    margin-bottom: 3px;
    min-width: 0px;
`;

let title = css`
    display: flex;
    flex-grow: 1;
    height: 18px;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    color: rgb(0, 0, 0, 0.8);
    min-width: 0px;

    & > span {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    },
`;

let date = css`
    display: flex;
    height: 18px;
    color: rgba(0, 0, 0, 0.3);
    margin-left: 5px;
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
    text-transform: uppercase;
    white-space: nowrap;
`;

let body = css`
    display: flex;
    flex-direction: row;
    min-width: 0px;
`;

let contentText = css`
    display: flex;
    height: 34px;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0px;
    min-width: 0px;
    font-size: 13px;
    font-weight: 400;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.5);
    overflow: hidden;

    & > span {
        display: block;
        height: 100%;
        overflow: hidden;
    }

    // Webkit line clamp
    & > span {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    & svg {
        display: inline-block;
        vertical-align: top;
        margin: 1px 5px -1px 1px;

        &.document {
            margin-top: 0;
            margin-bottom: 0;
        }
    },
`;

let counter = css`
    padding-left: 10px;
`;

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
    min-width: 0px;

    &:hover, &:focus {
        background-color: rgba(0, 0, 0, 0.05);
    }

    &.is-active {
        background-color: #4596e1;

        &:hover {
            background-color: #4596e1;
        }

        .${title} {
            color: #ffffff;
        }

        .${contentText} {
            color: #ffffff;
        }

        .${date} {
            color: rgba(255, 255, 255, 0.8);
        }
    }
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
                            <div className={counter}><XCounter big={true} count={conv.unread} /></div>
                        )}
                    </div>
                </div>
            </XLink>
        );
    }
}