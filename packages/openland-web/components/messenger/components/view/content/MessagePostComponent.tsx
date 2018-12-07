import * as React from 'react';
import Glamorous from 'glamorous';
import {
    MessageFull_alphaAttachments,
    MessageFull_alphaButtons
} from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XLink } from 'openland-x/XLink';
import { MessageTextComponent } from './MessageTextComponent';
import { niceBytes } from '../../view/content/MessageFileComponent';

const Wrapper = Glamorous(XVertical)({
    paddingTop: 4,
    paddingBottom: 4
});

const Root = Glamorous(XVertical)({
    border: '1px solid #ececec',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative'
});

const Container = Glamorous(XVertical)({
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
});

const PostTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.8)'
});

const FilesWrapper = Glamorous(XVertical)({
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderTop: '1px solid #ececec'
});

const FileItem = Glamorous(XLink)({
    opacity: 0.5,
    fontSize: 13,
    lineHeight: 1.54,
    color: '#000',
    '&:hover': {
        '& .icon': {
            opacity: 0.5
        },
        opacity: 1,
        color: '#1790ff'
    }
});

const FileImage = Glamorous.div({
    width: 11,
    height: 14,
    flexShrink: 0,
    backgroundImage: "url('/static/X/file.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
});

const CoverWrapper = Glamorous.div({
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    width: 134,
    height: 134,
    '& > img': {
        display: 'block'
    }
});

interface MessagePostComponentProps {
    message: string;
    alphaTitle: string;
    alphaButtons: (MessageFull_alphaButtons[] | null)[];
    alphaAttachments: MessageFull_alphaAttachments[];
    edited: boolean;
}

export const MessagePostComponent = (props: MessagePostComponentProps) => {
    let cover: MessageFull_alphaAttachments[] | MessageFull_alphaAttachments | null = null;
    let moreFiles: MessageFull_alphaAttachments[] | null = null;

    if (props.alphaAttachments.length > 0) {
        cover = props.alphaAttachments.filter(i => i.fileMetadata && i.fileMetadata.isImage);
        if (cover[0]) {
            cover = cover[0]
        }
        if ((cover as MessageFull_alphaAttachments).fileId) {
            moreFiles = props.alphaAttachments.filter(i => i.fileId !== (cover as MessageFull_alphaAttachments).fileId);
        }
    }

    // console.log(props)

    return (
        <Wrapper flexGrow={1}>
            <Root>
                <Container>
                    <XHorizontal justifyContent="space-between" separator={9}>
                        <XVertical separator={3} flexGrow={1}>
                            <PostTitle>{props.alphaTitle}</PostTitle>
                            <MessageTextComponent
                                message={props.message}
                                mentions={null}
                                isEdited={false}
                                isService={false}
                            />
                        </XVertical>
                        {cover && (cover as MessageFull_alphaAttachments).fileId && (
                            <CoverWrapper>
                                <XCloudImage
                                    srcCloud={'https://ucarecdn.com/' + (cover as MessageFull_alphaAttachments).fileId + '/'}
                                    resize={'fill'}
                                    width={134}
                                    height={134}
                                />
                            </CoverWrapper>
                        )}
                    </XHorizontal>
                </Container>
                {moreFiles && moreFiles.length > 0 && (
                    <FilesWrapper separator={3}>
                        {moreFiles.map(i => i.fileMetadata && (
                            <FileItem key={'file' + i.fileId} href={'https://ucarecdn.com/' + i.fileId + '/' + (i.fileMetadata.name ? i.fileMetadata.name!! : '')}>
                                <XHorizontal separator={4} alignItems="center">
                                    <FileImage className="icon" />
                                    <XHorizontal alignItems="center" separator={2}>
                                        <div>{i.fileMetadata.name} • {niceBytes(Number(i.fileMetadata.size))}</div>
                                    </XHorizontal>
                                </XHorizontal>
                            </FileItem>
                        ))}
                    </FilesWrapper>
                )}
            </Root>
        </Wrapper>
    );
};
