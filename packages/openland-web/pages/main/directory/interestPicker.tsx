import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchCondition } from './root.page';
import { XMenuItem } from '../../../components/Incubator/XOverflow';
import Glamorous from 'glamorous';
import { XInput } from 'openland-x/XInput';
import { XIcon } from 'openland-x/XIcon';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

const CATALOG = [
    { label: 'Selling', value: 'Selling' },
    { label: 'Buying', value: 'Buying' },
    { label: 'Joint ventures', value: 'Joint ventures' },
    { label: 'Leasing', value: 'Leasing' },
    { label: 'Option-to-buy', value: 'Option-to-buy' },
];

const EntryScrollable = Glamorous(XVertical)({
    width: 260,
    maxHeight: 243,
    overflowY: 'scroll',
    margin: 0,
    paddingBottom: 10
});

const EntryTitle = Glamorous.div({
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: 0.1,
    color: '#334562',
    padding: '19px 18px 9px',
    margin: 0
});

const EntryWrapper = Glamorous(XVertical)({
    borderRight: '1px solid rgba(220, 222, 228, 0.5)',
    margin: 0,

    '&:last-child': {
        borderRight: 'none'
    }
});

const EntryItem = Glamorous(XMenuItem)({
    margin: '0!important',
    color: 'rgba(51, 69, 98, 0.8)'
});

class EntriesComponent extends React.Component<{ title: string, options: { value: string, label: string }[], query: string, onPick: (q: SearchCondition) => void }> {
    render() {
        return (
            <EntryWrapper>
                <EntryTitle>{this.props.title}</EntryTitle>
                <EntryScrollable>
                    {this.props.options.filter(e => e.value.split(' ').filter(s => this.props.query.length === 0 || s.toLowerCase().startsWith(this.props.query.toLowerCase())).length > 0).map((e, i) => <EntryItem onClick={() => this.props.onPick({ type: 'interest', value: e.value, label: e.label })} key={e + '_' + i}>{e.label}</EntryItem>)}
                </EntryScrollable>
            </EntryWrapper>
        );
    }
}

const PickerButton = Glamorous(XButton)<{ activated?: boolean }>((props) => ({
    backgroundColor: (props.activated) ? 'white' : 'none',
    borderColor: (props.activated) ? 'rgba(220, 222, 228, 0.5)' : 'none',
}));

const PickerWrapper = Glamorous(XVertical)({
    margin: -10
});

const PickerSearch = Glamorous.div({
    padding: '18px 18px 0',
    position: 'relative',
    margin: 0
});

const PickerSearchIcon = Glamorous(XIcon)({
    position: 'absolute',
    top: 18,
    right: 27,
    fontSize: 20,
    lineHeight: '40px'
});

const PickerEntries = Glamorous(XHorizontal)({
    margin: 0
});

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
            <PickerWrapper>
                <PickerSearch>
                    <XInput placeholder="Enter an interest" value={this.state.query} onChange={this.handleChange} onEnter={this.onEnter} />
                    <PickerSearchIcon icon="search" />
                </PickerSearch>
                <PickerEntries>
                    <EntriesComponent title="Top interests" query={this.state.query} options={CATALOG} onPick={this.onPick} />
                </PickerEntries>
            </PickerWrapper>
        );
        return (
            <XPopper
                placement="bottom-start"
                show={this.state.popper}
                content={content}
                onClickOutside={this.close}
                arrow={null}
            >
                <PickerButton activated={this.state.popper} text="Interests" style="flat" iconRight="expand_more" onClick={this.switch} />
            </XPopper>
        );
    }
}