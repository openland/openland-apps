import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper } from 'openland-x/XPopper';
import { XIcon } from 'openland-x/XIcon';
import { XTag } from 'openland-x/XTag';
import { SearchCondition } from './root.page';
import { TextDirectoryData } from 'openland-text/TextDirectory';
import DirecoryIcon from './icons/directory.1.svg';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withOrganizationByPrefix } from '../../../api/withOrganizationByPrefix';
import { makeNavigable } from 'openland-x/Navigable';

const ContentWrapper = Glamorous(XPopper.Content)({
    padding: 0
});

const ContentValue = Glamorous.div({
    paddingTop: 8,
    paddingBottom: 8,
    width: 240
});

const TagWrap = Glamorous.div<{ selected: boolean }>(props => ({
    paddingLeft: 16,
    paddingRight: 16,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: props.selected ? '#f8f8fb' : undefined
}));

const InputWrap = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 4,
    '& > i': {
        fontSize: 21,
        color: 'rgba(51, 69, 98, 0.3)',
        width: 24,
        height: 24,
        overflow: 'hidden',
        marginTop: 6
    },
    '& > input': {
        height: 40,
        paddingLeft: 8,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.43,
        letterSpacing: -0.2,
        color: '#334562'
    }
});

const EntriesWrap = Glamorous.div({
    paddingTop: 9,
    borderTop: '1px solid #f1f2f5',
    marginBottom: 9,
});

const OrgWrap = makeNavigable(Glamorous.div(props => ({
    height: 40,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 4,
    borderTop: '1px solid #f1f2f5',
    cursor: 'pointer',
    '& > svg': {
        width: 15,
        height: 15,
        '> g': {
            fill: '#BEC3CA'
        }
    },
    ':hover': {
        color: '#6b50ff',
        backgroundColor: '#f8f8fb'
    }
})));

const OrgTitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.43,
    letterSpacing: -0.2,
    marginLeft: 10,
    color: '#5c6a81'
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
    <TagWrap onMouseEnter={() => props.onHover ? props.onHover(props.i!!) : false} selected={props.selected}>
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
    value: string;
    onInputChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

interface AutocompletePopperState {
    select: number;
    entries: EntryProps[];
}

const OrgByPrefix = withOrganizationByPrefix((props) => {
    console.warn(props);
    if (!props.data || !props.data.organizationByPrefix) {
        return null;
    }
    return (
        <OrgWrap path={'/o/' + props.data.organizationByPrefix.id}>
            <DirecoryIcon />
            <OrgTitle>{props.data.organizationByPrefix.name}</OrgTitle>
        </OrgWrap>
    );
});

export class AutocompletePopper extends React.Component<AutocompleteProps, AutocompletePopperState> {

    constructor(props: AutocompleteProps) {
        super(props);
        this.state = {
            select: -1,
            entries: []
        };
    }

    componentWillReceiveProps(nextProps: AutocompleteProps) {
        let newentries: EntryProps[] = [];

        //  TODO search in top tags
        let sugestedLocation = [...TextDirectoryData.locationPicker.Cities, ...TextDirectoryData.locationPicker.MetropolitanAreas, ...TextDirectoryData.locationPicker.States, ...TextDirectoryData.locationPicker.MultiStateRegions].filter(e => ([...e.split(' '), e]).filter(s => nextProps.query.length === 0 || s.toLowerCase().startsWith(nextProps.query.toLowerCase())).length > 0)[0];
        let sugestedCategory = [...TextDirectoryData.categoryPicker.categories].filter(e => ([...e.value.split(' '), e.value]).filter(s => nextProps.query.length === 0 || s.toLowerCase().startsWith(nextProps.query.toLowerCase())).length > 0).map(v => ({
            ...v,
            label: v.label.replace('• ', '')
        }))[0];
        let sugestedInterest = [...TextDirectoryData.interestPicker].filter(e => ([...e.value.split(' '), e.value]).filter(s => nextProps.query.length === 0 || s.toLowerCase().startsWith(nextProps.query.toLowerCase())).length > 0)[0];

        if (sugestedLocation) {
            newentries.push({
                selected: false,
                entry: { type: 'location', value: sugestedLocation, label: sugestedLocation },
                sugestion: true,
                onPick: nextProps.onPick
            });
        }
        if (sugestedCategory) {
            newentries.push({
                selected: false,
                entry: { type: 'organizationType', value: sugestedCategory.value, label: sugestedCategory.label },
                sugestion: true,
                onPick: nextProps.onPick
            });
        }
        if (sugestedInterest) {
            newentries.push({
                selected: false,
                entry: { type: 'interest', value: sugestedInterest.value, label: sugestedInterest.label },
                sugestion: true,
                onPick: nextProps.onPick
            });
        }

        this.setState({
            select: -1,
            entries: newentries
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

    handleSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.props.onInputChange(e);
    }

    render() {
        let inputValue = this.props.value;

        let content = (
            <ContentValue>
                <InputWrap>
                    <XIcon icon="search" />
                    <input value={inputValue} onChange={this.handleSearchChange} />
                </InputWrap>
                {this.state.entries && this.state.entries.length > 0 && (
                    <EntriesWrap>
                        {
                            this.state.entries.map((e, i) => (
                                <EntryComponent
                                    i={i}
                                    onHover={ii => this.setState({ select: ii })}
                                    key={e.entry.type + e.entry.label + i}
                                    {...e}
                                    selected={i === this.state.select}
                                />
                            ))
                        }
                    </EntriesWrap>
                )}

                <XWithRole role="software-developer">
                    <OrgByPrefix variables={{ query: this.props.query ? this.props.query.toLowerCase() : '' }} />
                </XWithRole>
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