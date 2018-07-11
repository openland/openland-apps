import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchCondition } from './root.page';
import { XMenuItem } from '../../../components/Incubator/XOverflow';
import glamorous from 'glamorous';
import { XText } from 'openland-x/XText';
import { XInput } from 'openland-x/XInput';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { TextDirectory } from 'openland-text/TextDirectory';

const VerticalScrollable = glamorous(XVertical)({
    height: 200,
    width: 200,
    overflowY: 'scroll'
});

class EntriesComponent extends React.Component<{ title: string, options: { value: string, label: string }[], query: string, onPick: (q: SearchCondition) => void }> {
    render() {
        return (
            <XVertical>
                <XText textStyle="h500">{this.props.title}</XText>
                <VerticalScrollable>
                    {this.props.options.filter(e => e.value.split(' ').filter(s => this.props.query.length === 0 || s.toLowerCase().startsWith(this.props.query.toLowerCase())).length > 0).map((e, i) => <XMenuItem onClick={() => this.props.onPick({ type: 'interest', value: e.value, label: e.label })} key={e + '_' + i}>{e.label}</XMenuItem>)}
                </VerticalScrollable>
            </XVertical>
        );
    }
}

export class InterestPicker extends React.Component<{ onPick: (q: SearchCondition) => void }, { query: string, popper: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { query: '', popper: false };
    }
    handleChange = (v: string) => {
        this.setState({ query: v });
    }

    onPick = (q: SearchCondition) => {
        this.props.onPick(q);
        this.setState({ query: '', popper: false });
    }

    onEnter = () => {
        if (this.state.query.length === 0) {
            return;
        }
        this.onPick({ type: 'interest', value: this.state.query, label: this.state.query });
    }

    switch = () => {
        this.setState({ popper: !this.state.popper });
    }

    close = () => {
        this.setState({ popper: false });
    }

    render() {
        let content = (
            <XVertical>
                <XInput value={this.state.query} onChange={this.handleChange} onEnter={this.onEnter} />
                <XHorizontal>
                    <EntriesComponent title={TextDirectory.interestEntryTop} query={this.state.query} options={TextDirectory.interestEntries.top} onPick={this.onPick} />
                </XHorizontal>
            </XVertical>
        );
        return (
            <XPopper
                placement="bottom-start"
                show={this.state.popper}
                content={content}
                onClickOutside={this.close}
            >
                <XButton text={TextDirectory.interestPicker} iconRight="expand_more" onClick={this.switch} />
            </XPopper>
        );
    }
}