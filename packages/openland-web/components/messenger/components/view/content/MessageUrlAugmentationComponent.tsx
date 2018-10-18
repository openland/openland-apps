import * as React from 'react';
import Glamorous from 'glamorous';
import { preprocessText, Span } from './utils/TextProcessor';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { emojify } from 'react-emojione';
import { XLink } from 'openland-x/XLink';
import WebsiteIcon from '../../icons/website-2.svg';
import { MessageFull_urlAugmentation } from 'openland-api/Types';
import { layoutMedia } from './utils/MediaLayout';
import { XCloudImage } from 'openland-x/XCloudImage';

const Container = Glamorous(XLink)({
    marginTop: 10,
    border: '1px solid #edeef3',
    background: '#ffffff',
    borderRadius: 10,
    padding: '9px 16px 12px',
    maxWidth: 620,
    color: '#121e2b!important',
    width: '100%',
});

const Wrapper = Glamorous.div<{ squareImage?: boolean }>(
    (props) => props.squareImage ? {
        display: 'flex',
        flexDirection: 'row',

        '& .content-wrapper': {
            flex: 1,
            paddingRight: 15,
            width: 'calc(100% - 94px)'
        },

        '& .image-wrapper': {
            marginTop: 1,
            marginRight: -6,
            marginBottom: -2,
            display: 'flex',
            alignItems: 'center',
        }
    } : {}
);

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
    marginTop: 13,
    fontSize: 0,
    lineHeight: 0,
});

const ImageBox = Glamorous.div({
    borderRadius: 5,
    overflow: 'hidden',
    display: 'inline-block',
    '& img': {
        display: 'block'
    },
});

export class MessageUrlAugmentationComponent extends React.Component<MessageFull_urlAugmentation> {
    private preprocessed: Span[];
    constructor(props: MessageFull_urlAugmentation) {
        super(props);
        this.preprocessed = props.description ? preprocessText(props.description) : [];
    }
    render() {
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
        let isSquareImage = false;
        if (this.props.photo && this.props.imageInfo && this.props.imageInfo.imageWidth && this.props.imageInfo.imageHeight) {
            let ratio = this.props.imageInfo.imageHeight / this.props.imageInfo.imageWidth;

            isSquareImage = (ratio >= 0.9 && ratio <= 1.1);

            if (isSquareImage) {
                dimensions = layoutMedia(this.props.imageInfo.imageWidth, this.props.imageInfo.imageHeight, 94, 94);
            } else {
                dimensions = layoutMedia(this.props.imageInfo.imageWidth, this.props.imageInfo.imageHeight, 360, 200);
            }
        }

        return (
            <Container href={this.props.url}>
                <Wrapper squareImage={isSquareImage}>
                    <div className="content-wrapper">
                        {this.props.hostname && (
                            <Hostname>
                                {this.props.iconRef && <Favicon src={'https://ucarecdn.com/' + this.props.iconRef.uuid + '/'} />}
                                {!this.props.iconRef && <WebsiteIcon />}
                                <span>{this.props.hostname}</span>
                            </Hostname>
                        )}
                        {this.props.title && <Title>{this.props.title}</Title>}
                        {parts && <Description>{parts}</Description>}
                    </div>
                    {this.props.photo && dimensions && (
                        <ImageWrapper className="image-wrapper">
                            <ImageBox>
                                <XCloudImage
                                    srcCloud={'https://ucarecdn.com/' + this.props.photo.uuid + '/'}
                                    resize={'fill'}
                                    width={dimensions.width}
                                    height={dimensions.height}
                                />
                            </ImageBox>
                        </ImageWrapper>
                    )}
                </Wrapper>
            </Container>
        );
    }
}