import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XVertical } from 'openland-x-layout/XVertical';
import { XLink } from 'openland-x/XLink';

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
        photo: {
            uuid: string,
            crop: {
                x: number,
                y: number,
                w: number,
                h: number,
            } | null
        } | null,
        primaryOrganization: {
            id?: string | null,
            name?: string | null,
        } | null
    } | any;
}

export class MessageIntroComponent extends React.Component<MessageIntroComponentProps> {
    render() {
        const { user, file, fileMetadata, urlAugmentation } = this.props;
        return (
            <Root separator={0}>
                <Container separator={6}>
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
        );
    }
}