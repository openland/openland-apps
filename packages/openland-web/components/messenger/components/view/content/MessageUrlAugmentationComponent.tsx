import * as React from 'react';
import Glamorous from 'glamorous';
import { preprocessText, Span } from './utils/TextProcessor';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { emojify } from 'react-emojione';
import { XLink } from 'openland-x/XLink';
import WebsiteIcon from '../../icons/website-2.svg';
import { MessageFull_urlAugmentation } from 'openland-api/Types';
import { buildBaseImageUrl } from 'openland-xp/impl/PImage';

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

const ImageWrapper = Glamorous.div<{ imageWidth?: number, imageHeight?: number }>((props) => ({
    marginTop: 13,
    position: 'relative',
    borderRadius: 5,
    overflow: 'hidden',
    maxWidth: (props.imageWidth && (props.imageWidth < 360)) ? props.imageWidth : 360,
    '&:first-child': {
        marginTop: 0
    },
    '&:before': (props.imageWidth && props.imageHeight) ? {
            display: 'block',
            content: ' ',
            paddingTop: ((props.imageHeight / props.imageWidth) * 100) + '%'
        } : { },
    '& img': (props.imageWidth && props.imageHeight) ? {
            position: 'absolute',
            top: 0, right: 0, bottom: 0, left: 0,
            display: 'block',
            width: '100%',
            height: '100%'
        } : {
            display: 'block',
            width: '100%',
        }
}));

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
            favicon: undefined,
            image: undefined
        };
    }
    componentWillMount = () => {
        this.setState({
            favicon: this.props.hostname ? ('//' + this.props.hostname + '/favicon.ico') : undefined,
            image: buildBaseImageUrl(this.props.photo || undefined)
        });
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
                {this.state.image && (
                    <ImageWrapper
                        imageWidth={this.props.imageInfo ? this.props.imageInfo.imageWidth || undefined : undefined}
                        imageHeight={this.props.imageInfo ? this.props.imageInfo.imageHeight || undefined : undefined}
                    >
                        <img
                            src={this.state.image}
                            onError={this.handleImageError}
                        />
                    </ImageWrapper>
                )}
            </Container>
        );
    }
}