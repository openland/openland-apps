import * as React from 'react';
import Glamorous from 'glamorous';
import { preprocessText, Span } from './utils/TextProcessor';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { emojify } from 'react-emojione';
import { XLink } from 'openland-x/XLink';
import WebsiteIcon from '../../icons/website-2.svg';

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
    '& svg': {
        marginRight: 5,
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

const Image = Glamorous.img({
    display: 'block',
    maxWidth: 360,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 13,
    '&:first-child': {
        marginTop: 0
    }
});

export class MessageUrlAugmentationComponent extends React.Component<{
    type: string | null,
    url: string,
    title: string | null,
    date: string | null,
    subtitle: string | null,
    hostname: string | null,
    imageURL: string | null,
    description: string | null,
    photo: {
        uuid: string,
        crop: {
            x: number,
            y: number,
            w: number,
            h: number,
        } | null,
    } | null,
}> {
    private preprocessed: Span[];
    constructor(props: any) {
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
        return (
            <Container href={this.props.url}>
                {this.props.hostname && (
                    <Hostname>
                        <WebsiteIcon />
                        <span>{this.props.hostname}</span>
                    </Hostname>
                )}
                {this.props.title && <Title>{this.props.title}</Title>}
                {parts && <Description>{parts}</Description>}
                {this.props.imageURL && <Image src={this.props.imageURL} />}
            </Container>
        );
    }
}