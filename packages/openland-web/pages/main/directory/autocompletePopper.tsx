import * as React from 'react';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchCondition } from './root.page';
import { TextDirectoryData } from 'openland-text/TextDirectory';
import { XMenuItem } from '../../../components/Incubator/XOverflow';

class EntryComponent extends React.Component<{ entry: SearchCondition, sugestion: boolean, onClick: () => void }> {
    render() {
        return (
            <XMenuItem onClick={this.props.onClick}>{this.props.entry.label + ' ' + (this.props.sugestion ? '' : this.props.entry.type === 'organizationType' ? 'category' : this.props.entry.type === 'interest' ? 'intereset' : this.props.entry.type === 'location' ? 'location' : '')}</XMenuItem>
        );
    }
}

export class AutocompletePopper extends React.Component<{
    onPick: (q: SearchCondition) => void,
    query: string,
    target: any,
}> {

    onPick = (q: SearchCondition) => {
        this.props.onPick(q);
        this.setState({ query: '', popper: false });
    }

    render() {
        let sugestedLocation = [...TextDirectoryData.locationPicker.Cities, ...TextDirectoryData.locationPicker.MetropolitanAreas, ...TextDirectoryData.locationPicker.States, ...TextDirectoryData.locationPicker.MultiStateRegions].filter(e => ([...e.split(' '), e]).filter(s => this.props.query.length === 0 || s.toLowerCase().startsWith(this.props.query.toLowerCase())).length > 0)[0];
        let sugestedCategory = [...TextDirectoryData.categoryPicker.categories].filter(e => ([...e.value.split(' '), e.value]).filter(s => this.props.query.length === 0 || s.toLowerCase().startsWith(this.props.query.toLowerCase())).length > 0)[0];
        let sugestedInterest = [...TextDirectoryData.interestPicker].filter(e => ([...e.value.split(' '), e.value]).filter(s => this.props.query.length === 0 || s.toLowerCase().startsWith(this.props.query.toLowerCase())).length > 0)[0];

        let content = (
            <XVertical>
                {sugestedLocation && <EntryComponent entry={{ type: 'location', value: sugestedLocation, label: sugestedLocation }} sugestion={true} onClick={() => this.props.onPick({ type: 'location', value: sugestedLocation, label: sugestedLocation })} key={sugestedLocation + '_s_l'} />}
                {sugestedCategory && <EntryComponent entry={{ type: 'organizationType', value: sugestedCategory.value, label: sugestedCategory.value }} sugestion={true} onClick={() => this.props.onPick({ type: 'organizationType', value: sugestedCategory.value, label: sugestedCategory.value })} key={sugestedCategory.value + '_s_c'} />}
                {sugestedInterest && <EntryComponent entry={{ type: 'interest', value: sugestedInterest.value, label: sugestedInterest.value }} sugestion={true} onClick={() => this.props.onPick({ type: 'interest', value: sugestedInterest.value, label: sugestedInterest.value })} key={sugestedInterest.value + '_s_i'} />}
                <EntryComponent entry={{ type: 'location', value: this.props.query, label: this.props.query }} sugestion={false} onClick={() => this.props.onPick({ type: 'location', value: this.props.query, label: this.props.query })} key={this.props.query + '_l'} />
                <EntryComponent entry={{ type: 'organizationType', value: this.props.query, label: this.props.query }} sugestion={false} onClick={() => this.props.onPick({ type: 'organizationType', value: this.props.query, label: this.props.query })} key={this.props.query + '_c'} />
                <EntryComponent entry={{ type: 'interest', value: this.props.query, label: this.props.query }} sugestion={false} onClick={() => this.props.onPick({ type: 'interest', value: this.props.query, label: this.props.query })} key={this.props.query + '_i'} />
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