import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XIcon } from 'openland-x/XIcon';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import Glamorous from 'glamorous';
import { SearchCondition } from './root.page';
import { TextDirectory, TextDirectoryData } from 'openland-text/TextDirectory';
import { XText } from 'openland-x/XText';

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

export const EntryItem = Glamorous.div<{ selected: boolean, hover?: boolean }>((props) => ({
    height: 40,
    flexShrink: 0,
    paddingLeft: '18px',
    paddingRight: '18px',
    fontSize: '15px',
    lineHeight: '40px',
    color: props.selected ? '#6b50ff' : '#334562',
    backgroundColor: props.selected ? '#f8f8fb' : undefined,
    fontWeight: 500,
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    ':hover': {
        ...(props.hover ? {
            color: '#6b50ff',
            backgroundColor: '#f8f8fb'
        } : {})
    }
}));

const filterOptions = (options: string[], q: string) => {
    return options.filter(e => ([...e.split(' '), e]).filter(s => q.length === 0 || s.toLowerCase().startsWith(q.toLowerCase())).length > 0);
};

class EntriesComponent extends React.Component<{ title: string, options: string[], scrollToTarget?: boolean, selected?: number, query?: string, onPick: (q: SearchCondition) => void, onHover?: (i: number) => void }> {
    containerRef?: any;
    targetRef?: any;
    captureContainerRef = (ref: any) => {
        this.containerRef = ref;
    }
    captureTargetRef = (ref: any) => {
        this.targetRef = ref;
    }

    componentDidUpdate() {
        if (this.props.selected !== undefined && this.targetRef && this.containerRef && this.props.scrollToTarget) {

            let container = ReactDOM.findDOMNode(this.containerRef);
            let target = ReactDOM.findDOMNode(this.targetRef);
            if (target && container) {
                let c = container as Element;
                let t = target as Element;
                let targetY = c.scrollTop + t.getBoundingClientRect().top - c.getBoundingClientRect().top;
                console.warn(t.getBoundingClientRect().top, c.getBoundingClientRect().top, t.getBoundingClientRect().bottom, c.getBoundingClientRect().bottom);
                if (t.getBoundingClientRect().top < c.getBoundingClientRect().top) {
                    c.scrollTo(0, targetY);
                } else if (t.getBoundingClientRect().bottom > c.getBoundingClientRect().bottom) {
                    c.scrollTo(0, targetY - c.getBoundingClientRect().height + t.getBoundingClientRect().height);
                }

            }
        }
    }

    render() {
        return (
            <EntryWrapper separator="none">
                <EntryTitle>{this.props.title}</EntryTitle>
                <EntryScrollable innerRef={this.captureContainerRef} separator="none">
                    {filterOptions(this.props.options, this.props.query || '').map((e, i) => <div key={e} onMouseEnter={() => this.props.onHover ? this.props.onHover(i) : false}><EntryItem hover={!this.props.onHover} innerRef={i === this.props.selected ? this.captureTargetRef : undefined} selected={i === this.props.selected} onClick={() => this.props.onPick({ type: 'location', value: e, label: e })} key={e + '_' + i}>{e}</EntryItem></div>)}
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

interface MultoplePickerProps {
    options: { label: string, values: string[] }[];
    query?: string;
    onPick: (location: string) => void;
}
class MultiplePicker extends React.Component<MultoplePickerProps, {
    selected: number[];
    empty: boolean,
    filteredOptions: { label: string, values: string[] }[],
    scrollToSelected?: boolean
}> {

    constructor(props: MultoplePickerProps) {
        super(props);
        let fOptions = [];
        for (let o of props.options) {
            if (filterOptions(o.values, props.query || '').length > 0) {
                fOptions.push({ label: o.label, values: filterOptions(o.values, props.query || '') });
            }
        }

        this.state = { selected: [0, 0], empty: false, filteredOptions: fOptions };
    }

    componentWillReceiveProps(props: MultoplePickerProps) {
        let fOptions = [];
        let count = 0;
        for (let o of props.options) {
            if (filterOptions(o.values, props.query || '').length > 0) {
                count += filterOptions(o.values, props.query || '').length;
                fOptions.push({ label: o.label, values: filterOptions(o.values, props.query || '') });
            }
        }

        this.setState({ selected: [0, 0], empty: count === 0, filteredOptions: fOptions });
    }

    keydownHandler = (e: any) => {

        let dx = 0;
        let dy = 0;
        if (e.code === 'ArrowUp') {
            dy = -1;
        }
        if (e.code === 'ArrowDown') {
            dy = 1;
        }
        if (e.code === 'ArrowLeft') {
            dx = -1;
        }
        if (e.code === 'ArrowRight') {
            dx = 1;
        }

        if (e.code === 'Enter') {
            e.preventDefault();
            if (!this.state.empty) {
                this.props.onPick(this.state.filteredOptions[this.state.selected[0]].values[this.state.selected[1]]);
            } else {
                this.props.onPick(this.props.query || '');
            }
        }

        let x = this.state.selected[0] + dx;
        let y = this.state.selected[1] + dy;

        x = Math.min(this.state.filteredOptions.length - 1, Math.max(0, x));
        y = Math.min(this.state.filteredOptions[x] ? this.state.filteredOptions[x].values.length - 1 : 0, Math.max(0, y));

        if (dx !== 0) {
            y = 0;
        }

        this.setState({ selected: [x, y], scrollToSelected: true });

    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler);
    }
    render() {
        return (
            <>
                {this.state.empty && <XText>{'Press Enter to add "' + this.props.query + '" location'}</XText>}
                {!this.state.empty && (
                    <XVertical>
                        <PickerTitle>Top locations</PickerTitle>
                        <PickerEntries separator="none">
                            {this.props.options.filter(o => filterOptions(o.values, this.props.query || '').length > 0).map((o, i) => (
                                <EntriesComponent scrollToTarget={this.state.scrollToSelected} onHover={index => this.setState({ selected: [i, index], scrollToSelected: false })} key={o.label + '_' + i} selected={i === this.state.selected[0] ? this.state.selected[1] : undefined} title={o.label} query={this.props.query} options={o.values} onPick={sq => this.props.onPick(sq.label)} />
                            ))}
                        </PickerEntries>
                    </XVertical>
                )}
            </>
        );
    }
}

export class LocationControlledPicker extends React.Component<{ query?: string, onPick: (location: string) => void }> {
    options = [
        { label: TextDirectory.locationCities, values: Cities },
        { label: TextDirectory.locationMetropolitanAreas, values: MetropolitanAreas },
        { label: TextDirectory.locationStates, values: States },
        { label: TextDirectory.locationMultiStateRegions, values: MultiStateRegions },
    ];
    render() {
        return (<MultiplePicker options={this.options} onPick={this.props.onPick} query={this.props.query} />);
    }
}
