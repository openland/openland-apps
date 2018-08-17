import * as React from 'react';
import { preprocessText, Span } from './utils/TextProcessor';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import Glamorous from 'glamorous';
import { emojify } from 'react-emojione';

export interface MessageTextComponentProps {
    message: string;
    isService: boolean;
}

const TextWrapper = Glamorous.span<{ isService: boolean }>((props) => ({
    display: 'inline',
    whiteSpace: 'pre-wrap',
    opacity: props.isService ? 0.3 : 1,
    fontSize: 14,
    lineHeight: 1.71,
    letterSpacing: -0.2,
    color: '#1f3449',
    '& .link': {
        color: '#1790ff',
        '&:hover': {
            color: '#1790ff',
            textDecoration: 'underline'
        }
    }
}));

export class MessageTextComponent extends React.PureComponent<MessageTextComponentProps> {
    private preprocessed: Span[];
    constructor(props: MessageTextComponentProps) {
        super(props);
        this.preprocessed = preprocessText(props.message);
    }
    componentWillUpdate(nextProps: MessageTextComponentProps) {
        this.preprocessed = preprocessText(nextProps.message);
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
        return <TextWrapper isService={this.props.isService}>{parts}</TextWrapper>;
    }
}