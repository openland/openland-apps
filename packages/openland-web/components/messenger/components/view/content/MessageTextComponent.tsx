import * as React from 'react';
import Glamorous from 'glamorous';
import { preprocessText, Span } from './utils/TextProcessor';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { emojify } from 'react-emojione';

export interface MessageTextComponentProps {
    message: string;
    isService: boolean;
}

const TextWrapper = Glamorous.span<{ isService: boolean, big: boolean }>((props) => ({
    display: 'inline',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    fontSize: props.big ? 36 : 14,
    minHeight: props.big ? 44 : undefined,
    lineHeight: props.big ? '40px' : '22px',
    letterSpacing: props.big ? -0.5 : 0,
    fontWeight: props.big ? 600 : 400,
    color: props.isService ? '#99A2B0' : 'rgba(0, 0, 0, 0.8)',
    maxWidth: '98%',
    '& .link': {
        color: '#1790ff',
        '&:hover': {
            color: '#1790ff',
            textDecoration: 'underline'
        }
    }
}));

let emoji = (text: string, height: number) => emojify(text, { style: { height: height, backgroundImage: 'url(https://cdn.openland.com/shared/web/emojione-3.1.2-64x64.png)' } });

export class MessageTextComponent extends React.PureComponent<MessageTextComponentProps> {
    private preprocessed: Span[];
    big = false;
    insane = false;
    constructor(props: MessageTextComponentProps) {
        super(props);
        this.preprocessed = preprocessText(props.message);

        this.big = this.props.message.length <= 3 && this.props.message.search(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g) !== -1;
        this.big = this.big || (this.props.message.length <= 32 && this.props.message.startsWith(':') && this.props.message.endsWith(':'));
        this.insane = this.props.message.startsWith('🌈') && this.props.message.endsWith('🌈');
        this.big = this.big || this.props.message.startsWith('📣') && this.props.message.endsWith('📣');
    }
    componentWillUpdate(nextProps: MessageTextComponentProps) {
        this.preprocessed = preprocessText(nextProps.message);
    }

    render() {
        // let { message } = this.props;
        let parts = this.preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <br key={'br-' + i} />;
            } else if (v.type === 'link') {
                return <XLinkExternal className="link" key={'link-' + i} href={v.link!!} content={v.text!!} showIcon={false} />;
            } else {
                return (
                    <span
                        style={this.insane ? {
                            background: 'url(https://attachments-staging.keyframes.net/media/cover/zlqfwz/b6eea0e0-a93f-434d-bfd1-3e1de3eac571.gif)',
                            backgroundClip: 'text, border',
                            ...{ WebkitBackgroundClip: 'text' } as any,
                            color: 'transparent'
                        } : {}}
                        key={'text-' + i}
                    >{emoji(this.insane || this.big ? v.text!!.replace(/🌈/g, '').replace(/📣/g, '') : v.text!!, this.big || this.insane ? 44 : 18)}
                    </span>
                );
            }
        });
        // let bigMessageParts: any[] = [];
        // if (message.length > 3) {
        //     emoji(message, 44).map((i: any) => {
        //         if (typeof(i) === 'string') {
        //             bigMessageParts.push(i.slice(1, i.length - 1));
        //         } else {
        //             bigMessageParts.push(i);
        //         }
        //     });
        // }
        return <TextWrapper big={this.big || this.insane} isService={this.props.isService}>{parts}</TextWrapper>;
    }
}