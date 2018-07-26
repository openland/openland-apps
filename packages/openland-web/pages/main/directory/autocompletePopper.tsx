import * as React from 'react';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchCondition } from './root.page';
import { TextDirectoryData } from 'openland-text/TextDirectory';
import { EntryItem } from './multiplePicker';

interface EntryProps {
    i?: number;
    entry: SearchCondition;
    sugestion: boolean;
    selected: boolean;
    onPick: (entry: SearchCondition) => void;
    onHover?: (i: number) => void;
}
class EntryComponent extends React.Component<EntryProps> {
    render() {
        return (
            <div onMouseEnter={() => this.props.onHover ? this.props.onHover(this.props.i!!) : false}>
                <EntryItem selected={this.props.selected} onClick={() => this.props.onPick(this.props.entry)}>{this.props.entry.label + ' ' + (this.props.sugestion ? '' : this.props.entry.type === 'organizationType' ? 'category' : this.props.entry.type === 'interest' ? 'intereset' : this.props.entry.type === 'location' ? 'location' : '')}</EntryItem>
            </div>
        );
    }
}

interface AutocompleteProps {
    onPick: (q: SearchCondition) => void;
    query: string;
    target: any;
}
export class AutocompletePopper extends React.Component<AutocompleteProps, {
    select: number,
    entries: EntryProps[],
}> {

    constructor(props: AutocompleteProps) {
        super(props);
        this.state = { select: -1, entries: [] };
    }

    componentWillReceiveProps(nextProps: AutocompleteProps) {
        let newentries: EntryProps[] = [];

        //  TODO search in top tags
        let sugestedLocation = [...TextDirectoryData.locationPicker.Cities, ...TextDirectoryData.locationPicker.MetropolitanAreas, ...TextDirectoryData.locationPicker.States, ...TextDirectoryData.locationPicker.MultiStateRegions].filter(e => ([...e.split(' '), e]).filter(s => nextProps.query.length === 0 || s.toLowerCase().startsWith(nextProps.query.toLowerCase())).length > 0)[0];
        let sugestedCategory = [...TextDirectoryData.categoryPicker.categories].filter(e => ([...e.value.split(' '), e.value]).filter(s => nextProps.query.length === 0 || s.toLowerCase().startsWith(nextProps.query.toLowerCase())).length > 0).map(v => ({...v, label: v.label.replace('• ', '')}))[0];
        let sugestedInterest = [...TextDirectoryData.interestPicker].filter(e => ([...e.value.split(' '), e.value]).filter(s => nextProps.query.length === 0 || s.toLowerCase().startsWith(nextProps.query.toLowerCase())).length > 0)[0];

        if (sugestedLocation) {
            newentries.push({ selected: false, entry: { type: 'location', value: sugestedLocation, label: sugestedLocation }, sugestion: true, onPick: nextProps.onPick });
        }
        if (sugestedCategory) {
            newentries.push({ selected: false, entry: { type: 'organizationType', value: sugestedCategory.value, label: sugestedCategory.label }, sugestion: true, onPick: nextProps.onPick });
        }
        if (sugestedInterest) {
            newentries.push({ selected: false, entry: { type: 'interest', value: sugestedInterest.value, label: sugestedInterest.label }, sugestion: true, onPick: nextProps.onPick });
        }

        this.setState({
            select: -1,
            entries: newentries,
        });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler);
    }

    keydownHandler = (e: any) => {
        let dy = 0;
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            dy = -1;
        }
        if (e.code === 'ArrowDown') {
            e.preventDefault();
            dy = 1;
        }

        if (e.code === 'Enter') {
            e.preventDefault();
            if (this.state.select === -1) {
                this.props.onPick({type: 'name', value: this.props.query, label: this.props.query});
            } else {
                this.props.onPick(this.state.entries[this.state.select].entry);
            }
        }

        let y = this.state.select + dy;

        y = Math.min(this.state.entries.length - 1, Math.max(-1, y));

        this.setState({ select: y });
    }

    render() {

        let content = (
            <XVertical>
                {this.state.entries.map((e, i) => <EntryComponent i={i} onHover={ii => this.setState({select: ii})} key={e.entry.type + e.entry.label + i} {...e} selected={i === this.state.select} />)}
            </XVertical>
        );
        return (
            <XPopper
                placement="bottom-start"
                show={!!(this.props.query.trim())}
                content={content}
                arrow={null}
            >
                {this.props.target}
            </XPopper>
        );
    }
}