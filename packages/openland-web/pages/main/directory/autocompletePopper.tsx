import * as React from 'react';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchCondition } from './root.page';
// import { TextDirectoryData } from 'openland-text/TextDirectory';
// import { XMenuItem } from '../../../components/Incubator/XOverflow';

interface EntryProps {
    entry: SearchCondition;
    sugestion: boolean;
    selected: boolean;
    onPick: (entry: SearchCondition) => void;
}
// class EntryComponent extends React.Component<EntryProps> {
//     render() {
//         return (
//             <XMenuItem onClick={() => this.props.onPick(this.props.entry)}>{this.props.entry.label + ' ' + (this.props.sugestion ? '' : this.props.entry.type === 'organizationType' ? 'category' : this.props.entry.type === 'interest' ? 'intereset' : this.props.entry.type === 'location' ? 'location' : '')}</XMenuItem>
//         );
//     }
// }

interface AutocompleteProps {
    onPick: (q: SearchCondition) => void;
    query: string;
    target: any;
}
export class AutocompletePopper extends React.Component<AutocompleteProps, {
    select: number | null,
    entries: EntryProps[],
}> {

    constructor(props: AutocompleteProps) {
        super(props);
        this.state = { select: null, entries: [] };
    }

    // componentWillReceiveProps(nextProps: AutocompleteProps) {
    //     let entries: EntryProps[] = [];
    //     let sugestedLocation = [...TextDirectoryData.locationPicker.Cities, ...TextDirectoryData.locationPicker.MetropolitanAreas, ...TextDirectoryData.locationPicker.States, ...TextDirectoryData.locationPicker.MultiStateRegions].filter(e => ([...e.split(' '), e]).filter(s => this.props.query.length === 0 || s.toLowerCase().startsWith(this.props.query.toLowerCase())).length > 0)[0];
    //     let sugestedCategory = [...TextDirectoryData.categoryPicker.categories].filter(e => ([...e.value.split(' '), e.value]).filter(s => this.props.query.length === 0 || s.toLowerCase().startsWith(this.props.query.toLowerCase())).length > 0)[0];
    //     let sugestedInterest = [...TextDirectoryData.interestPicker].filter(e => ([...e.value.split(' '), e.value]).filter(s => this.props.query.length === 0 || s.toLowerCase().startsWith(this.props.query.toLowerCase())).length > 0)[0];

    //     if (sugestedLocation) {

    //     }

    //     entries.push({ selected: false, entry: { type: 'location', value: this.props.query, label: this.props.query }, sugestion: true, onPick: this.props.onPick });
    //     entries.push({ selected: false, entry: { type: 'organizationType', value: this.props.query, label: this.props.query }, sugestion: true, onPick: this.props.onPick });
    //     entries.push({ selected: false, entry: { type: 'interest', value: this.props.query, label: this.props.query }, sugestion: true, onPick: this.props.onPick });

    //     this.setState({
    //         select: null,
    //         entries: entries,
    //     });
    // }

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler);
    }

    keydownHandler = (e: any) => {
        console.warn(e);

        // let select = this.state.select || 0;
        if (e.key === 'ArrowUp') {

            //     select = Math/
            // }
            // if (e.key === 'ArrowDown') {

        }
    }

    render() {

        let content = (
            <XVertical>
                {/* {this.state.sugestedLocation && <EntryComponent entry={{ type: 'location', value: this.state.sugestedLocation, label: this.state.sugestedLocation }} sugestion={true} onClick={() => this.props.onPick({ type: 'location', value: this.state.sugestedLocation!!, label: this.state.sugestedLocation!! })} key={this.state.sugestedLocation + '_s_l'} />}
                {sugestedCategory && <EntryComponent entry={{ type: 'organizationType', value: sugestedCategory.value, label: sugestedCategory.value }} sugestion={true} onClick={() => this.props.onPick({ type: 'organizationType', value: sugestedCategory.value, label: sugestedCategory.value })} key={sugestedCategory.value + '_s_c'} />}
                {sugestedInterest && <EntryComponent entry={{ type: 'interest', value: sugestedInterest.value, label: sugestedInterest.value }} sugestion={true} onClick={() => this.props.onPick({ type: 'interest', value: sugestedInterest.value, label: sugestedInterest.value })} key={sugestedInterest.value + '_s_i'} />}
                <EntryComponent entry={{ type: 'location', value: this.props.query, label: this.props.query }} sugestion={false} onClick={() => this.props.onPick({ type: 'location', value: this.props.query, label: this.props.query })} key={this.props.query + '_l'} />
                <EntryComponent entry={{ type: 'organizationType', value: this.props.query, label: this.props.query }} sugestion={false} onClick={() => this.props.onPick({ type: 'organizationType', value: this.props.query, label: this.props.query })} key={this.props.query + '_c'} />
                <EntryComponent entry={{ type: 'interest', value: this.props.query, label: this.props.query }} sugestion={false} onClick={() => this.props.onPick({ type: 'interest', value: this.props.query, label: this.props.query })} key={this.props.query + '_i'} /> */}
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