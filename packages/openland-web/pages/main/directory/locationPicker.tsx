import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XIcon } from 'openland-x/XIcon';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import Glamorous from 'glamorous';
import { SearchCondition } from './root.page';
import { XMenuItem } from '../../../components/Incubator/XOverflow';
import { TextDirectory, TextDirectoryData } from 'openland-text/TextDirectory';

const EntryScrollable = Glamorous(XVertical)({
    width: 232,
    maxHeight: 243,
    overflowY: 'scroll',
    paddingBottom: 7,
});

const EntryTitle = Glamorous.div({
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: 0.1,
    color: '#334562',
    padding: '18px 18px 11px',
});

const EntryWrapper = Glamorous(XVertical)({
    borderRight: '1px solid rgba(220, 222, 228, 0.5)',

    '&:last-child': {
        borderRight: 'none',
    },
});

const EntryItem = Glamorous(XMenuItem)({
    color: 'rgba(51, 69, 98, 0.8)',
});

const filterOptions = (options: string[], q: string) => {
    return options.filter(e => ([...e.split(' '), e]).filter(s => q.length === 0 || s.toLowerCase().startsWith(q.toLowerCase())).length > 0);
};

class EntriesComponent extends React.Component<{ title: string, options: string[], query?: string, onPick: (q: SearchCondition) => void }> {
    render() {
        return (
            <EntryWrapper separator="none">
                <EntryTitle>{this.props.title}</EntryTitle>
                <EntryScrollable separator="none">
                    {filterOptions(this.props.options, this.props.query || '').map((e, i) => <EntryItem onClick={() => this.props.onPick({ type: 'location', value: e, label: e })} key={e + '_' + i}>{e}</EntryItem>)}
                </EntryScrollable>
            </EntryWrapper>
        );
    }
}

export const MultiStateRegions = TextDirectoryData.locationPicker.MultiStateRegions;
export const States = TextDirectoryData.locationPicker.States;
export const MetropolitanAreas = TextDirectoryData.locationPicker.MetropolitanAreas;
export const Cities = TextDirectoryData.locationPicker.Cities;

const PickerButton = Glamorous(XButton)<{ activated?: boolean }>((props) => ({
    backgroundColor: (props.activated) ? 'white' : 'none',
    borderColor: (props.activated) ? 'rgba(220, 222, 228, 0.5)' : 'none',
}));

const PickerWrapper = Glamorous(XVertical)({
    margin: -10
});

const PickerSearch = Glamorous.div({
    padding: '18px 18px 0',
    position: 'relative'
});

const PickerSearchIcon = Glamorous(XIcon)({
    position: 'absolute',
    top: 18,
    right: 27,
    fontSize: 20,
    lineHeight: '40px'
});

const PickerTitle = Glamorous.div({
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: 0.1,
    color: '#334562',
    padding: '7px 18px 3px'
});

const PickerEntries = Glamorous(XHorizontal)({
    borderTop: '1px solid rgba(220, 222, 228, 0.5)'
});

export class LocationPopperPicker extends React.Component<{ onPick: (q: SearchCondition) => void }, { query: string, popper: boolean }> {
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
        this.onPick({ type: 'location', value: this.state.query, label: this.state.query });
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
                    <XInput placeholder={TextDirectory.locationSearchPlaceholder} value={this.state.query} onChange={this.handleChange} onEnter={this.onEnter} />
                    <PickerSearchIcon icon="search" />
                </PickerSearch>
                <PickerTitle>Top locations</PickerTitle>
                <PickerEntries separator="none">
                    <EntriesComponent title={TextDirectory.locationCities} query={this.state.query} options={Cities} onPick={this.onPick} />
                    <EntriesComponent title={TextDirectory.locationMetropolitanAreas} query={this.state.query} options={MetropolitanAreas} onPick={this.onPick} />
                    <EntriesComponent title={TextDirectory.locationStates} query={this.state.query} options={States} onPick={this.onPick} />
                    <EntriesComponent title={TextDirectory.locationMultiStateRegions} query={this.state.query} options={MultiStateRegions} onPick={this.onPick} />
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
                <PickerButton iconOpacity={0.4} activated={this.state.popper} text={TextDirectory.locationPicker} style="flat" iconRight="expand_more" onClick={this.switch} />
            </XPopper>
        );
    }
}

export class LocationControlledPicker extends React.Component<{ query?: string, onPick: (location: string) => void }> {
    // keydownHandler = (e: any) => {

    //     if (e.code === 'Enter' ) {
    //         e.preventDefault();
    //         // prevent duplicates
    //         if ((this.state.lastValue || []).map(v => v.value).filter(v => v === this.state.inputVal).length === 0) {
    //             this.props.onChange([...(this.state.lastValue || []), { label: this.state.inputVal, value: this.state.inputVal }]);
    //         } else {
    //             this.setState({ inputVal: '' });
    //         }
    //     }
    // }

    // componentDidMount() {
    //     document.addEventListener('keydown', this.keydownHandler);
    // }

    // componentWillUnmount() {
    //     document.removeEventListener('keydown', this.keydownHandler);
    // }
    render() {
        let empty = filterOptions([...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions], this.props.query || '').length === 0;
        return (
            <>
                {empty && 'Press Enter to add "' + this.props.query + '" location'}
                {!empty && (
                    <XVertical>
                        <PickerTitle>Top locations</PickerTitle>
                        <PickerEntries separator="none">
                            <EntriesComponent title={TextDirectory.locationCities} query={this.props.query} options={Cities} onPick={sq => this.props.onPick(sq.label)} />
                            <EntriesComponent title={TextDirectory.locationMetropolitanAreas} query={this.props.query} options={MetropolitanAreas} onPick={sq => this.props.onPick(sq.label)} />
                            <EntriesComponent title={TextDirectory.locationStates} query={this.props.query} options={States} onPick={sq => this.props.onPick(sq.label)} />
                            <EntriesComponent title={TextDirectory.locationMultiStateRegions} query={this.props.query} options={MultiStateRegions} onPick={sq => this.props.onPick(sq.label)} />
                        </PickerEntries>
                    </XVertical>
                )}
            </>
        );
    }
}