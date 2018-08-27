import * as React from 'react';
import Glamorous from 'glamorous';
import { XScrollView } from 'openland-x/XScrollView';
import { XInput } from 'openland-x/XInput';
import { XTag } from 'openland-x/XTag';
import { XIcon } from 'openland-x/XIcon';

interface SearchCondition {
    type: 'name' | 'location' | 'organizationType' | 'interest';
    value: string | string[];
    label: string;
}

interface PickerProps {
    options: { label: string, value: string }[];
    query?: string;
    onPick: (q: { label: string, value: string }) => void;
    title?: string;
    noResultsText: string;
}

interface PickerState {
    empty: boolean;
    filteredOptions: { label: string, value: string }[];
}

const filterOptions = (options: { label: string, value: string }[], q: string) => {
    return options.filter(e => ([...e.label.split(' '), e.label]).filter(s => q.length === 0 || s.toLowerCase().startsWith(q.toLowerCase())).length > 0);
};

const HelpText = Glamorous.div({
    padding: '20px 24px',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.27,
    letterSpacing: -0.1,
    color: '#334562',
});

const TagsWrapper = Glamorous.div({
    padding: '10px 8px 12px 16px',
    display: 'flex',
    flexWrap: 'wrap'
});

const TagBox = Glamorous.div({
    marginRight: 8
});

class Picker extends React.Component<PickerProps, PickerState> {
    constructor(props: PickerProps) {
        super(props);
        let fOptions: { label: string, value: string }[] = [];
        if (filterOptions(props.options, props.query || '').length > 0) {
            fOptions = filterOptions(props.options, props.query || '');
        }

        this.state = {
            empty: false,
            filteredOptions: fOptions
        };
    }

    componentWillReceiveProps(props: PickerProps) {
        let fOptions: { label: string, value: string }[] = [];
        let count = 0;
        if (filterOptions(props.options, props.query || '').length > 0) {
            count += filterOptions(props.options, props.query || '').length;
            fOptions = filterOptions(props.options, props.query || '');
        }

        this.setState({ empty: count === 0, filteredOptions: fOptions });
    }

    keydownHandler = (e: any) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            if (!this.state.empty) {
                this.props.onPick(this.state.filteredOptions[0]);
            } else {
                this.props.onPick({ label: this.props.query || '', value: this.props.query || '' });
            }
        }
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
                {this.state.empty && <HelpText>{this.props.noResultsText.replace('{0}', this.props.query || '')}</HelpText>}
                {!this.state.empty && (
                    <TagsWrapper>
                        {filterOptions(this.props.options, this.props.query || '').map((e, i) => (
                            <TagBox key={e.value}>
                                <XTag
                                    text={e.label}
                                    rounded={true}
                                    color="default"
                                    size="large"
                                    onClick={() => this.props.onPick({ value: e.value, label: e.label })}
                                />
                            </TagBox>
                        ))}
                    </TagsWrapper>
                )}
            </>
        );
    }
}

const SearchSelectBox = Glamorous.div({
    background: '#ffffff',
    borderRadius: 10,
    border: '1px solid rgba(0, 0, 0, 0.08)',
    marginBottom: 8,

    '&:last-child': {
        marginBottom: 0
    }
});

const SearchSelectHead = Glamorous.div({
    cursor: 'pointer',
    padding: '9px 9px 10px 16px',
    display: 'flex',
    '& span': {
        flex: 1
    },
    '& i': {
        fontSize: 20,
        color: '#c1c7cf'
    }
});

const SearchSelectInputWrapper = Glamorous.div({
    '& i': {
        color: '#c1c7cf!important'
    }
});

const SearchSelectBody = Glamorous(XScrollView)({
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
    maxHeight: 200
});

const SearchSelectInput = Glamorous(XInput)({
    background: 'none!important',
    border: 'none!important',
    boxShadow: 'none!important'
});

interface SearchSelectProps {
    title: string;
    conditionType: 'name' | 'location' | 'organizationType' | 'interest';
    onPick: (q: SearchCondition) => void;
    options: { label: string, value: string }[];
    shown: boolean;
    onShow: () => void;
    noResultsText: string;
}

export class SearchSelect extends React.Component<SearchSelectProps, { query: string }> {
    constructor(props: any) {
        super(props);

        this.state = {
            query: '',
        };
    }

    handleChange = (v: string) => {
        this.setState({ query: v });
    }

    onPick = (q: { label: string, value: string }) => {
        this.props.onPick({
            type: this.props.conditionType,
            value: q.value,
            label: q.label
        });
        this.setState({ query: '' });
    }

    render() {
        return (
            <SearchSelectBox>
                {!this.props.shown && (
                    <SearchSelectHead
                        onClick={this.props.onShow}
                    >
                        <span>{this.props.title}</span>
                        <XIcon icon="expand_more" />
                    </SearchSelectHead>
                )}
                {this.props.shown && (
                    <>
                        <SearchSelectInputWrapper>
                            <SearchSelectInput
                                icon="search"
                                placeholder={this.props.title}
                                value={this.state.query}
                                onChange={this.handleChange}
                                autofocus={true}
                            />
                        </SearchSelectInputWrapper>
                        <SearchSelectBody>
                            <Picker
                                options={this.props.options}
                                onPick={this.onPick}
                                query={this.state.query}
                                noResultsText={this.props.noResultsText}
                            />
                        </SearchSelectBody>
                    </>
                )}
            </SearchSelectBox>
        );
    }
}