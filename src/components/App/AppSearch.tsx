import * as React from 'react';
import Glamorous from 'glamorous';
import { withSearch } from '../../api';
import { XCard } from '../X/XCard';
import { XLink } from '../X/XLink';

const Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0 0 0 1px rgba(49,49,93,.03), 0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08)',
    borderRadius: 4,
    height: '32px',
    backgroundColor: '#ffffff',
    width: '340px',
    position: 'relative',
    lineHeight: '32px',
    zIndex: 1
})

const SearchInput = Glamorous.input({
    border: 'none',
    paddingLeft: '8px',
    paddingRight: '8px',
    height: '100%',
    width: '100%',
    fontWeight: 400,
    fontSize: '14px',
    backgroundColor: 'transparent',
    '::placeholder': {
        color: 'rgb(135, 113, 253)'
    },
    '&:focus': {
        '::placeholder': { color: 'rgba(135, 113, 253, 0.7)' }
    }
})

const ResultsContainer = Glamorous(XCard)({
    position: 'absolute',
    top: '34px',
    left: 0,
    right: 0
})

let SearchResults = withSearch((props) => {
    if (props.data && props.data.search && props.data.search.parcels.edges.length > 0) {
        return (
            <ResultsContainer shadow="medium">
                <XCard.List>
                    {props.data.search.parcels.edges.map((v) => (
                        <XCard.ListItem path={'/app/parcels/' + v.node.id}>Parcel #{v.node.title}</XCard.ListItem>
                    ))}
                </XCard.List>
            </ResultsContainer>
        );
    } else {
        return null;
    }
});

export class AppSearch extends React.Component<{}, { value: string, focused: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = { value: '', focused: false };
    }

    onChange = (e: any) => {
        this.setState({ value: e.target.value })
    }

    onFocus = () => {
        this.setState({ focused: true });
    }
    onBlur = () => {
        this.setState({ focused: false });
    }

    render() {
        return (
            <Container>
                <SearchInput
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder={'Search...'}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />

                {this.state.focused && <SearchResults query={this.state.value} />}
            </Container>
        )
    }
}