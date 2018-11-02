import * as React from 'react';
import Glamorous from 'glamorous';
import { preprocessText, Span } from './utils/TextProcessor';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { emojify } from 'react-emojione';
import { XLink } from 'openland-x/XLink';
import WebsiteIcon from '../../icons/website-2.svg';
import { MessageFull_urlAugmentation } from 'openland-api/Types';
import { layoutMediaReverse } from './utils/MediaLayout';
import { XCloudImage } from 'openland-x/XCloudImage';
import DeleteIcon from '../../icons/ic-close.svg';
import { makeInternalLinkRelative, isInternalLink } from './MessageTextComponent';

const Container = Glamorous(XLink)({
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    marginTop: '10px !important',
    border: '1px solid #edeef3',
    background: '#ffffff',
    borderRadius: 10,
    padding: '9px 16px 12px',
    maxWidth: 620,
    color: '#121e2b !important',
    width: '100%',
    '&:hover .delete-button': {
        opacity: 1
    }
});

const DeleteButton = Glamorous(XLink)({
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    background: '#ffffff',
    '& > svg > g > path:last-child': {
        fill: 'rgba(0, 0, 0, 0.3)'
    },
    '&:hover & > svg > g > path:last-child': {
        fill: 'rgba(0, 0, 0, 0.4)'
    }
});

const ContentWrapper = Glamorous.div({
    flex: 1,
    paddingRight: 15,
    width: 'calc(100% - 94px)'
});

const Hostname = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    height: 20,
    '& svg': {
        marginRight: 7,
        width: 12,
        height: 12,
        '& path': {
            opacity: 0.5,
            fill: '#334562'
        }
    },
    '& span': {
        opacity: 0.5,
        fontSize: 12,
        fontWeight: 600,
        lineHeight: '20px',
        letterSpacing: 0,
        color: '#334562'
    }
});

const Favicon = Glamorous.img({
    width: 14,
    height: 14,
    margin: '-1px 5px -1px 0',
    overflow: 'hidden',
    display: 'block',
});

const Title = Glamorous.div({
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: 0,
    color: '#1790ff',
    marginTop: 7,
    overflow: 'hidden',
    height: 20,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:first-child': {
        marginTop: 0
    }
});

const Description = Glamorous.div({
    opacity: 0.9,
    fontSize: 14,
    lineHeight: '21px',
    letterSpacing: 0,
    color: '#121e2b',
    marginTop: 3,
    maxHeight: 42,
    display: 'block',
    overflow: 'hidden',
    '&:first-child': {
        marginTop: 0
    },
    // Webkit line clamp
    '&': {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
});

const ImageWrapper = Glamorous.div({
    margin: '1px -6px -2px 0',
    borderRadius: 5,
    overflow: 'hidden',
    '& img': {
        display: 'block'
    },
});

interface MessageUrlAugmentationComponentProps extends MessageFull_urlAugmentation {
    messageId: string;
    isMe: boolean;
}

export class MessageUrlAugmentationComponent extends React.Component<MessageUrlAugmentationComponentProps> {
    private preprocessed: Span[];
    constructor(props: MessageUrlAugmentationComponentProps) {
        super(props);
        this.preprocessed = props.description ? preprocessText(props.description) : [];
    }
    render() {
        let { hostname, title, photo, imageInfo } = this.props;

        let parts = this.preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <br key={'br-' + i} />;
            } else if (v.type === 'link') {
                return <XLinkExternal className="link" key={'link-' + i} href={v.link!!} content={v.text!!} showIcon={false} />;
            } else {
                return <span key={'text-' + i}>{emojify(v.text!!, { style: { height: 18 } })}</span>;
            }
        });

        let dimensions = undefined;
        if (photo && imageInfo && imageInfo.imageWidth && imageInfo.imageHeight) {
            dimensions = layoutMediaReverse(imageInfo.imageWidth, imageInfo.imageHeight, 94, 94);
        }

        let href: string | undefined = this.props.url;
        let path: string | undefined = undefined;

        if (isInternalLink(href)) {
            path = makeInternalLinkRelative(href);
            href = undefined;
        }

        return (
            <Container href={href} path={path}>
                <ContentWrapper>
                    {hostname && (
                        <Hostname>
                            {this.props.iconRef && <Favicon src={'https://ucarecdn.com/' + this.props.iconRef.uuid + '/'} />}
                            {!this.props.iconRef && <WebsiteIcon />}
                            <span>{hostname}</span>
                        </Hostname>
                    )}
                    {title && <Title>{title}</Title>}
                    {parts && <Description>{parts}</Description>}
                </ContentWrapper>
                {photo && dimensions && (
                    <ImageWrapper>
                        <XCloudImage
                            srcCloud={'https://ucarecdn.com/' + photo.uuid + '/'}
                            resize="fill"
                            width={dimensions.width}
                            height={dimensions.height}
                        />
                    </ImageWrapper>
                )}
                {this.props.isMe && (
                    <DeleteButton query={{ field: 'deleteUrlAugmentation', value: this.props.messageId }} className="delete-button">
                        <DeleteIcon />
                    </DeleteButton>
                )}
            </Container>
        );
    }
}