import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import PhotoIcon from 'openland-icons/ic-photo-2.svg';
import Glamorous from 'glamorous';
import FileIcon from 'openland-icons/ic-file-3.svg';
import UploadCare from 'uploadcare-widget';
import IntroIc from 'openland-icons/ic-attach-intro-3.svg';
import ShortcutsIcon from 'openland-icons/ic-attach-shortcuts-3.svg';
import { XLink } from 'openland-x/XLink';
import PostIcon from 'openland-icons/ic-add-post.svg';
import { ShortcutsModal } from '../../components/messenger/view/ShortcutsModal';
import { PostMessageType } from 'openland-api/Types';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical, XMenuItemSeparator } from 'openland-x/XMenuItem';
import { XMenuItem } from 'openland-x/XMenuItem';
import { getConfig } from '../../config';

interface PostButtonProps {
    enabled?: boolean;
    handleHideChat?: (show: boolean, postType: PostMessageType | null) => void;
}

export const AttachmentButton = Glamorous(XLink)<{ disable?: boolean }>(props => ({
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: 'rgba(0, 0, 0, 0.4)',
    opacity: props.disable ? 0.7 : undefined,
    cursor: props.disable ? 'default !important' : 'pointer',
    '&:first-child': {
        marginLeft: 6,
    },
    '@media (max-width: 1230px)': {
        fontSize: 0,
        '& > svg': {
            marginRight: '0!important',
        },
    },
    '&:hover': {
        textDecoration: 'none',
        color: props.disable ? '#a3acb8' : 'rgba(0, 0, 0, 0.5)',
        backgroundColor: props.disable ? 'transparent' : 'rgba(0, 0, 0, 0.03)',
        '& > svg > *': {
            fill: props.disable ? '#c1c7cf' : 'rgba(0, 0, 0, 0.3)',
        },
    },
    '&.shortcuts-button > svg, &.document-button > svg': {
        marginTop: 1,
        marginBottom: -1,
    },
    '& > svg': {
        flexShrink: 0,
        marginRight: 10,
        '& > *': {
            fill: props.disable ? '#c1c7cf' : 'rgba(0, 0, 0, 0.2)',
        },
    },
}));

export class PostButton extends React.PureComponent<PostButtonProps> {
    state = {
        show: false,
    };

    private handleShowMenu = () => {
        this.setState({
            show: !this.state.show,
        });
    };

    private handleCloseMenu = () => {
        this.setState({
            show: false,
        });
    };

    render() {
        const { props } = this;
        let onClickHandler =
            props.enabled === false
                ? undefined
                : props.handleHideChat
                ? props.handleHideChat
                : undefined;

        let enableProps = {
            enabled: props.enabled === false,
            disable: props.enabled === false,
        };

        return (
            <XPopper
                placement="top-start"
                arrow={null}
                showOnHover={false}
                show={this.state.show}
                contentContainer={<XMenuVertical />}
                onClickOutside={this.handleCloseMenu}
                content={
                    <>
                        <XMenuItem
                            style="gray"
                            {...enableProps}
                            onClick={() =>
                                onClickHandler && onClickHandler(true, PostMessageType.BLANK)
                            }
                        >
                            Quick post
                        </XMenuItem>
                        <XMenuItemSeparator />
                        <XMenuItem
                            style="gray"
                            {...enableProps}
                            onClick={() =>
                                onClickHandler &&
                                onClickHandler(true, PostMessageType.JOB_OPPORTUNITY)
                            }
                        >
                            Job opportunity
                        </XMenuItem>
                        <XMenuItem
                            style="gray"
                            {...enableProps}
                            onClick={() =>
                                onClickHandler && onClickHandler(true, PostMessageType.OFFICE_HOURS)
                            }
                        >
                            Office hours
                        </XMenuItem>
                        <XMenuItem
                            style="gray"
                            {...enableProps}
                            onClick={() =>
                                onClickHandler &&
                                onClickHandler(true, PostMessageType.REQUEST_FOR_STARTUPS)
                            }
                        >
                            Request for startups
                        </XMenuItem>
                    </>
                }
            >
                <AttachmentButton
                    {...enableProps}
                    onClick={props.enabled === false ? undefined : this.handleShowMenu}
                    className="document-button"
                >
                    <PostIcon />
                    <span>Post</span>
                </AttachmentButton>
            </XPopper>
        );
    }
}

export const AttachmentButtons = ({
    enabled,
    handleHideChat,
    handleDialogDone,
}: {
    enabled?: boolean;
    handleHideChat?: (show: boolean, postType: any) => void;
    handleDialogDone: (result: UploadCare.File) => void;
}) => {
    const handleAttach = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!,
        });
        dialog.done(handleDialogDone);
    };

    return (
        <XHorizontal separator="none">
            <AttachmentButton
                onClick={!enabled ? undefined : handleAttach}
                enabled={!enabled}
                disable={!enabled}
            >
                <PhotoIcon />
                <span>Photo</span>
            </AttachmentButton>
            <AttachmentButton
                onClick={!enabled ? undefined : handleAttach}
                enabled={!enabled}
                disable={!enabled}
                className="document-button"
            >
                <FileIcon />
                <span>Document</span>
            </AttachmentButton>
            <PostButton enabled={enabled} handleHideChat={handleHideChat} />
            <AttachmentButton
                query={
                    !enabled
                        ? undefined
                        : {
                              field: 'addItro',
                              value: 'true',
                          }
                }
                className="intro-button"
                disable={!enabled}
            >
                <IntroIc />
                <span>Intro</span>
            </AttachmentButton>
            <ShortcutsModal
                target={
                    <AttachmentButton className="shortcuts-button">
                        <ShortcutsIcon />
                        <span>Shortcuts</span>
                    </AttachmentButton>
                }
            />
        </XHorizontal>
    );
};

{
    /* <XHorizontal separator="none">
                                <AttachmentButton
                                    onClick={
                                        this.props.enabled === false ? undefined : this.handleAttach
                                    }
                                    enabled={this.props.enabled === false}
                                    disable={this.props.enabled === false}
                                >
                                    <PhotoIcon />
                                    <span>Photo</span>
                                </AttachmentButton>
                                <AttachmentButton
                                    onClick={
                                        this.props.enabled === false ? undefined : this.handleAttach
                                    }
                                    enabled={this.props.enabled === false}
                                    disable={this.props.enabled === false}
                                    className="document-button"
                                >
                                    <FileIcon />
                                    <span>Document</span>
                                </AttachmentButton>
                                <PostButton
                                    enabled={this.props.enabled}
                                    handleHideChat={this.props.handleHideChat}
                                />
                            </XHorizontal> */
}
