import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XVertical } from 'openland-x-layout/XVertical';
import { XLink } from 'openland-x/XLink';
import { XButton } from 'openland-x/XButton';
import { XMutation } from 'openland-x/XMutation';
import CheckIcon from '../../icons/ic-check.svg';
import { XOverflow } from '../../../../Incubator/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { withSetReaction } from '../../../../../api/withSetReaction';

const SetReactionButton = withSetReaction((props) => (
    <XMutation mutation={props.setReaction}>
        {props.children}
    </XMutation>
)) as React.ComponentType<{ variables: { messageId: string, reaction: string }, children: any }>;

const Root = Glamorous(XVertical)({
    border: '1px solid #eef0f2',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    '&::after': {
        content: `''`,
        position: 'absolute',
        height: '100%',
        width: 6,
        backgroundColor: '#1790ff',
        left: 0,
        top: 0,
        display: 'block'
    }
});

const Container = Glamorous(XVertical)({
    padding: 16
});

const UserName = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.43,
    letterSpacing: -0.2,
    color: '#121e2b'
});

const OrgName = Glamorous.div({
    opacity: 0.5,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#121e2b'
});

const AboutText = Glamorous.div({
    display: 'inline',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    opacity: 0.9,
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: -0.2,
    color: '#121e2b'
});

const FileButton = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    height: 40,
    paddingLeft: 22,
    borderTop: '1px solid #eef0f2',
    '& span': {
        opacity: 0.45,
        fontSize: 13,
        fontWeight: 500,
        lineHeight: 1.54,
        letterSpacing: -0.4,
        color: '#121e2b'
    },
    '&:hover span': {
        opacity: 1,
        color: '#1790ff'
    }
});

const FileImage = Glamorous.div({
    width: 11,
    height: 14,
    flexShrink: 0,
    backgroundImage: 'url(\'/static/X/file.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
});

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function niceBytes(x: number | undefined) {

    if (x === undefined) {
        return;
    }

    let l = 0;

    while (x >= 1024 && ++l) {
        x = x / 1024;
    }

    return (x.toFixed(x >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
}

interface MessageIntroComponentProps {
    urlAugmentation: {
        url: string,
        title: string | null,
        date: string | null,
        subtitle: string | null,
        description: string | null,
        photo: {
            uuid: string,
            crop: {
                x: number,
                y: number,
                w: number,
                h: number,
            } | null,
        } | null
    };
    file: string | null;
    fileMetadata: {
        name: string,
        mimeType: string | null,
        isImage: boolean,
        imageWidth: number | null,
        imageHeight: number | null,
        imageFormat: string | null,
        size: number
    } | null;
    user: {
        id: string,
        name: string,
        photo: string | null,
        primaryOrganization: {
            id?: string | null,
            name?: string | null,
        } | null
    } | null;
    reactions: {
        user: {
            id: string
        },
        reaction: string
    }[];
    messageId: string;
    meId: string;
}

export class MessageIntroComponent extends React.Component<MessageIntroComponentProps> {

    renderReactions() {
        let { reactions, meId, messageId } = this.props;

        if (reactions.find(r => r.user.id === meId && r.reaction === 'pass')) {
            return <XButton text="You passed" size="r-default" enabled={false} />;
        } else if (reactions.find(r => r.user.id === meId && r.reaction === 'accept')) {
            return <XButton text="Accepted" size="r-default" style="success" icon={<CheckIcon />} />;
        } else {
            return (
                <>
                    <SetReactionButton variables={{ messageId: messageId, reaction: 'accept' }}>
                        <XButton
                            text="Accept intro"
                            style="primary-sky-blue"
                            size="r-default"
                        />
                    </SetReactionButton>
                    <SetReactionButton variables={{ messageId: messageId, reaction: 'pass' }}>
                        <XButton
                            text="Pass"
                            size="r-default"
                        />
                    </SetReactionButton>
                </>
            );
        }
    }

    render() {
        const { user, file, fileMetadata, urlAugmentation, reactions, meId, messageId } = this.props;

        return (
            <XVertical separator={6}>
                <Root separator={0}>
                    <Container separator={6}>
                        {user && (
                            <XHorizontal justifyContent="space-between" alignItems="center">
                                <XHorizontal separator={6} alignItems="center">
                                    <XAvatar
                                        userId={user.id}
                                        userName={user.name}
                                        photoRef={urlAugmentation.photo || undefined}
                                        style="colorus"
                                    />
                                    <XVertical separator={-1}>
                                        <UserName>{user.name}</UserName>
                                        {user.primaryOrganization && (
                                            <OrgName>{user.primaryOrganization.name}</OrgName>
                                        )}
                                    </XVertical>
                                </XHorizontal>
                                <XOverflow
                                    flat={true}
                                    placement="bottom-end"
                                    content={
                                        <>
                                            {reactions.find(r => r.user.id === meId && r.reaction === 'pass') && (
                                                <SetReactionButton variables={{ messageId: messageId, reaction: 'accept' }}>
                                                    <XMenuItem style="primary-sky-blue">Accept intro</XMenuItem>
                                                </SetReactionButton>
                                            )}
                                            <XMenuItem style="primary-sky-blue" path={'/mail/u/' + user.id}>View profile</XMenuItem>
                                            <XMenuItem style="primary-sky-blue" path={'/mail/' + user.id}>Direct chat</XMenuItem>
                                        </>
                                    }
                                />
                            </XHorizontal>
                        )}
                        {urlAugmentation.description && (
                            <AboutText>{urlAugmentation.description}</AboutText>
                        )}
                    </Container>
                    {(file && fileMetadata) && (
                        <FileButton href={'https://ucarecdn.com/' + file + '/' + (fileMetadata.name ? fileMetadata.name!! : '')}>
                            <XHorizontal separator={4} alignItems="center">
                                <FileImage />
                                <span>{fileMetadata.name}({niceBytes(fileMetadata.size)})</span>
                            </XHorizontal>
                        </FileButton>
                    )}
                </Root>
                <XHorizontal separator={6} alignSelf="flex-start">
                    {this.renderReactions()}
                </XHorizontal>
            </XVertical>
        );
    }
}