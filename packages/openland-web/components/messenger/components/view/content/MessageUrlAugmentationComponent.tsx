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
    maxWidth: 550,
    color: '#121e2b!important'
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
        fontWeight: 500,
        lineHeight: '20px',
        letterSpacing: 0,
        color: '#334562'
    }
});

const Favicon = Glamorous.img({
    width: 14,
    height: 14,
    borderRadius: 3,
    margin: '-1px 5px -1px 0',
    overflow: 'hidden'
});

const Title = Glamorous.div({
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#1790ff',
    marginTop: 7,
    '&:first-child': {
        marginTop: 0
    }
});

const Description = Glamorous.div({
    opacity: 0.9,
    fontSize: 14,
    lineHeight: '21px',
    letterSpacing: -0.3,
    color: '#121e2b',
    marginTop: 3,
    '&:first-child': {
        marginTop: 0
    }
});

const ImageWrapper = Glamorous.div((props) => ({
    marginTop: 13,
    borderRadius: 5,
    overflow: 'hidden',
    display: 'inline-block',
    '& img': {
        display: 'block'
    },
    '& img.from-foreign-server': {
        width: '100%',
        maxWidth: 360
    }
}));

let resolveImageUrl = (url: string | null): string | undefined => {
    if (url) {
        if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) {
            return url;
        } else {
            // if (hostname && url.startsWith('/'))
            //     return '//' + hostname + url

            return undefined;
        }
    } else {
        return undefined;
    }
};

interface MessageUrlAugmentationState {
    favicon: string | undefined;
    image: string | undefined;
}

export class MessageUrlAugmentationComponent extends React.Component<MessageFull_urlAugmentation, MessageUrlAugmentationState> {
    private preprocessed: Span[];
    constructor(props: MessageFull_urlAugmentation) {
        super(props);
        this.preprocessed = props.description ? preprocessText(props.description) : [];
        this.state = {
            favicon: this.props.hostname ? ('//' + this.props.hostname + '/favicon.ico') : undefined,
            image: resolveImageUrl(this.props.imageURL)
        };
    }
    handleFaviconError = () => {
        this.setState({
            favicon: undefined
        });
    }
    handleImageError = () => {
        this.setState({
            image: undefined
        });
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
        if (this.props.imageInfo && this.props.imageInfo.imageWidth && this.props.imageInfo.imageHeight) {
            dimensions = layoutMedia(this.props.imageInfo.imageWidth, this.props.imageInfo.imageHeight, 360, 360);
        }
        return (
            <Container href={this.props.url}>
                {this.props.hostname && (
                    <Hostname>
                        {this.state.favicon && <Favicon src={this.state.favicon} onError={this.handleFaviconError} />}
                        {!this.state.favicon && <WebsiteIcon />}
                        <span>{this.props.hostname}</span>
                    </Hostname>
                )}
                {this.props.title && <Title>{this.props.title}</Title>}
                {parts && <Description>{parts}</Description>}
                {this.props.photo && dimensions && (
                    <ImageWrapper>
                        <XCloudImage
                            srcCloud={'https://ucarecdn.com/' + this.props.photo.uuid + '/'}
                            resize={'fill'}
                            width={dimensions.width}
                            height={dimensions.height}
                        />
                    </ImageWrapper>
                )}
                {!this.props.photo && this.state.image && (
                    <ImageWrapper>
                        <img src={this.state.image} className="from-foreign-server" />
                    </ImageWrapper>
                )}
            </Container>
        );
    }
}