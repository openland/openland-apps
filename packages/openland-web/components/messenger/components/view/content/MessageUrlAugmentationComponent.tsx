import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XVertical } from 'openland-x-layout/XVertical';
import { XText } from 'openland-x/XText';
import { XDate } from 'openland-x-format/XDate';
import { preprocessText, Span } from './utils/TextProcessor';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { emojify } from 'react-emojione';

const Container = Glamorous(XHorizontal)({
    border: '1px solid #eef0f2',
    borderRadius: 10,
    padding: 16
});

export class MessageUrlAugmentationComponent extends React.Component<{
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
            <Container separator={6}>
                <XAvatar photoRef={this.props.photo || undefined} style="organization" size="small" />
                <XVertical separator={2}>
                    <XHorizontal separator={0}>
                        <XText fontWeight={500} fontSize="14px" lineHeight="16px" color="#5c6a81">{this.props.title}</XText>
                        {this.props.date && <XText fontWeight={500} fontSize="14px" lineHeight="16px" color="#99a2b0">• <XDate value={(new Date(this.props.date).getTime().toString())} format="date" /></XText>}
                    </XHorizontal>
                    <XText fontWeight={500} fontSize="14px" lineHeight="16px" color="#334562">{this.props.subtitle}</XText>
                    <XText fontWeight={400} fontSize="14px" lineHeight="16px" color="#5c6a81">{parts}</XText>
                </XVertical>
            </Container >
        );
    }
}