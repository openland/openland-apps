import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper } from 'openland-x/XPopper';
import { XTag } from 'openland-x/XTag';
import { SearchCondition } from './root.page';
import { TextDirectoryData } from 'openland-text/TextDirectory';

const ContentWrapper = Glamorous(XPopper.Content)({
    padding: 0
});

const ContentValue = Glamorous.div<{ empty?: boolean }>((props) => ({
    padding: props.empty ? 0 : '8px 16px',
    width: props.empty ? 0 : 240
}));

const TagWrap = Glamorous.div({
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
});

interface EntryProps {
    i?: number;
    entry: SearchCondition;
    sugestion: boolean;
    selected: boolean;
    onPick: (entry: SearchCondition) => void;
    onHover?: (i: number) => void;
}

const EntryComponent = (props: EntryProps) => (
    <TagWrap onMouseEnter={() => props.onHover ? props.onHover(props.i!!) : false}>
        <XTag
            text={props.entry.label + ' ' + (props.sugestion ? '' : props.entry.type === 'organizationType' ? 'category' : props.entry.type === 'interest' ? 'intereset' : props.entry.type === 'location' ? 'location' : '')}
            size="large"
            color="primary"
            onClick={() => props.onPick(props.entry)}
        />
    </TagWrap>
);

interface AutocompleteProps {
    onPick: (q: SearchCondition) => void;
    query: string;
    target: any;
}

interface AutocompletePopperState {
    select: number;
    entries: EntryProps[];
}

export class AutocompletePopper extends React.Component<AutocompleteProps, AutocompletePopperState> {

    constructor(props: AutocompleteProps) {
        super(props);
        this.state = { select: -1, entries: [] };
    }

    componentWillReceiveProps(nextProps: AutocompleteProps) {
        let newentries: EntryProps[] = [];

        //  TODO search in top tags
        let sugestedLocation = [...TextDirectoryData.locationPicker.Cities, ...TextDirectoryData.locationPicker.MetropolitanAreas, ...TextDirectoryData.locationPicker.States, ...TextDirectoryData.locationPicker.MultiStateRegions].filter(e => ([...e.split(' '), e]).filter(s => nextProps.query.length === 0 || s.toLowerCase().startsWith(nextProps.query.toLowerCase())).length > 0)[0];
        let sugestedCategory = [...TextDirectoryData.categoryPicker.categories].filter(e => ([...e.value.split(' '), e.value]).filter(s => nextProps.query.length === 0 || s.toLowerCase().startsWith(nextProps.query.toLowerCase())).length > 0).map(v => ({ ...v, label: v.label.replace('• ', '') }))[0];
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
                this.props.onPick({ type: 'name', value: this.props.query, label: this.props.query });
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
            <ContentValue empty={this.state.entries.length === 0}>
                {this.state.entries.map((e, i) => (
                    <EntryComponent
                        i={i}
                        onHover={ii => this.setState({ select: ii })}
                        key={e.entry.type + e.entry.label + i}
                        selected={i === this.state.select}
                        {...e}
                    />
                ))}
            </ContentValue>
        );
        return (
            <XPopper
                placement="bottom-start"
                show={!!(this.props.query.trim())}
                arrow={null}
                content={content}
                contentContainer={<ContentWrapper />}
            >
                {this.props.target}
            </XPopper>
        );
    }
}