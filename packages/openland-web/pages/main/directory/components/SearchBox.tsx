import React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import SearchIcon from '../icons/ic-search-small.svg';

const SearchWrapper = Glamorous.div({
    borderBottom: '1px solid #ececec',
});

const SearchInner = Glamorous(XHorizontal)({
    height: 60,

    '& > div:focus-within': {
        '& .search-icon > g > path:last-child': {
            fill: 'rgba(23, 144, 255, 0.5)'
        }
    },
    '& .search-icon': {
        marginLeft: '2px!important',

        '& > g > path:last-child': {
            fill: 'rgba(0, 0, 0, 0.25)'
        },
    }
});

const SearchInput = Glamorous(XInput)({
    height: 59,
    marginTop: -2,
    border: 'none',
    fontSize: 16,
    fontWeight: 500,
    '&:focus-within': {
        boxShadow: 'none',
        border: 'none'
    },

    '& > input, & > .input-placeholder': {
        paddingLeft: 14
    }
});

interface SearchBoxProps {
    value: string;
    placeholder?: string;
    onChange: (e: any) => void;
}

export class SearchBox extends React.Component<SearchBoxProps> {

    onChange = (value: string) => {
        this.props.onChange(value);
    }

    onClear = () => {
        this.props.onChange('');
    }

    render () {
        return (
            <SearchWrapper>
                <XContentWrapper>
                    <SearchInner justifyContent="space-between" alignItems="center" flexShrink={0}>
                        <XHorizontal separator={0} alignItems="center" flexGrow={1}>
                            <SearchIcon className="search-icon" />
                            <SearchInput
                                value={this.props.value}
                                onChange={this.onChange}
                                flexGrow={1}
                                placeholder={this.props.placeholder}
                                autofocus={true}
                            />
                        </XHorizontal>
                        {this.props.value.length > 0 && (
                            <XButton
                                text="Clear"
                                onClick={this.onClear}
                            />
                        )}
                        <XButton
                            text="Search"
                            style="primary"
                            enabled={this.props.value.length > 0}
                        />
                    </SearchInner>
                </XContentWrapper>
            </SearchWrapper>
        );
    }
}