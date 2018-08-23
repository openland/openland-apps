import * as React from 'react';
import Glamorous from 'glamorous';
import { XScrollView } from 'openland-x/XScrollView';
import { XInput } from 'openland-x/XInput';
import { XTag } from 'openland-x/XTag';

interface SearchCondition {
    type: 'name' | 'location' | 'organizationType' | 'interest';
    value: string | string[];
    label: string;
}

interface SearchSelectProps {
    title: string;
    conditionType: 'name' | 'location' | 'organizationType' | 'interest';
    onPick: (q: SearchCondition) => void;
    options: { label: string, value: string }[];
    initialShown?: boolean;
}

interface PickerProps {
    options: { label: string, value: string }[];
    query?: string;
    onPick: (q: { label: string, value: string }) => void;
    title?: string;
}

interface PickerState {
    empty: boolean;
    filteredOptions: { label: string, value: string }[];
}

const filterOptions = (options: { label: string, value: string }[], q: string) => {
    return options.filter(e => ([...e.label.split(' '), e.label]).filter(s => q.length === 0 || s.toLowerCase().startsWith(q.toLowerCase())).length > 0);
};

const HelpText = Glamorous.div({
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.27,
    letterSpacing: -0.1,
    color: '#334562',
    marginBottom: '24px !important',
    marginTop: 10
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

    render() {
        return (
            <>
                {this.state.empty && <HelpText>{'Press Enter to add "' + this.props.query + '" location'}</HelpText>}
                {!this.state.empty && (
                    <TagsWrapper>
                        {filterOptions(this.props.options, this.props.query || '').map((e, i) => (
                            <TagBox>
                                <XTag
                                    key={e.value}
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
    cursor: 'pointer'
});

const SearchSelectInputWrapper = Glamorous.div({
    
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

export class SearchSelect extends React.Component<SearchSelectProps, { query: string, shown: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            query: '',
            shown: this.props.initialShown || false
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

    onEnter = () => {
        if (this.state.query.length === 0) {
            return;
        }
        this.onPick({ label: this.state.query, value: this.state.query });
    }

    render() {
        return (
            <SearchSelectBox>
                {!this.state.shown && (
                    <SearchSelectHead
                        onClick={() => this.setState({ shown: true })}
                    >
                        {this.props.title}
                    </SearchSelectHead>
                )}
                {this.state.shown && (
                    <>
                        <SearchSelectInputWrapper>
                            <SearchSelectInput
                                icon="search"
                                placeholder={this.props.title}
                                value={this.state.query}
                                onChange={this.handleChange}
                                onEnter={this.onEnter}
                            />
                        </SearchSelectInputWrapper>
                        <SearchSelectBody>
                            <Picker
                                options={this.props.options}
                                onPick={this.onPick}
                                query={this.state.query}
                            />
                        </SearchSelectBody>
                    </>
                )}
            </SearchSelectBox>
        );
    }
}