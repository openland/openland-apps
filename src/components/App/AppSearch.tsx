import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor'
import { withSearch } from '../../api';
import { XCard } from '../X/XCard';
import { XIcon } from '../X/XIcon';

const loading = glamor.keyframes({
    '0%': { transform: `rotate(0deg) scaleX(-1)` },
    '100%': { transform: `rotate(360deg) scaleX(-1)` }
})
import { XArea } from '../X/XArea';

let LoadingIcon = Glamorous(XIcon)<{ loading?: boolean }>((props) => ({
    display: props.loading ? 'block' : 'none',
    position: 'absolute',
    top: 'calc(50% - 10px)',
    right: 10,
    width: '20px',
    fontSize: '20px',
    color: '#6b7c93',
    animation: `${loading} 1s linear infinite`,
}))

const Container = Glamorous.div<{ noResult?: boolean }>(props => ({
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0 0 0 1px rgba(49,49,93,.03), 0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08)',
    borderRadius: 4,
    height: '32px',
    backgroundColor: '#ffffff',
    width: '340px',
    position: 'relative',
    lineHeight: '32px',
    zIndex: 1,
    '&::after': {
        content: props.noResult ? 'No results' : undefined,
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '32px',
        color: '#8898aa',
    }
}))

const SearchInput = Glamorous.input({
    border: 'none',
    paddingLeft: '8px',
    paddingRight: '8px',
    height: '100%',
    width: '80%',
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
    right: 0,
})

let HighlightedWrapper = Glamorous.span({
    '> em': {
        color: '#3297d3',
        fontWeight: 600,
        fontStyle: 'normal'
    }
})

const Highlighted = (props: { text?: string, field: string, highlight: { key: string, match: string }[] }) => {
    let existing = props.highlight.find((k) => k.key === props.field);
    if (existing) {
        return <HighlightedWrapper dangerouslySetInnerHTML={{ __html: existing.match }} />
    } else {
        if (props.text) {
            return <>{props.text}</>;
        } else {
            return null;
        }
    }
}

// const ResultHeader = Glamorous.div({
//     display: 'flex',
//     flexDirection: 'row',
//     color: '#3297d3',
//     fontSize: 12,
//     fontWeight: 700
// })

const ResultTilte = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
})

const ResultTilteMain = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    fontSize: 13,
    flexGrow: 1
})

const ResultTilteHint = Glamorous.div({
    fontSize: 13,
    opacity: 0.7
})

const ResultBody = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    fontSize: 13
});

const ResultBodyMain = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    opacity: 0.7,
    marginRight: '8px',
    width: 100
})

//

let SearchResults = withSearch((props) => {
    if (props.data && props.data.search && props.data.search.parcels.edges.length > 0) {
        return (
            <ResultsContainer shadow="medium">
                <XCard.List>
                    {props.data.search.parcels.edges.map((v) => (
                        <XCard.ListItem key={v.node.id} path={'/app/parcels/' + v.node.id}>
                            {/* <ResultHeader>PARCEL</ResultHeader> */}
                            <ResultTilte>
                                <ResultTilteMain>Parcel #<Highlighted text={v.node.title} field={'title'} highlight={v.highlight} /></ResultTilteMain>
                                <ResultTilteHint>{v.node.extrasArea && <XArea area={v.node.extrasArea} />}</ResultTilteHint>
                            </ResultTilte>
                            {!v.highlight.find((k) => k.key === 'address') && (
                                <ResultBody>
                                    <ResultBodyMain>Neighborhood</ResultBodyMain>
                                    {v.node.extrasNeighborhood}
                                </ResultBody>
                            )}
                            {v.highlight.find((k) => k.key === 'address') && (
                                <ResultBody>
                                    <ResultBodyMain>Address</ResultBodyMain>
                                    <Highlighted field={'address'} highlight={v.highlight} />
                                </ResultBody>
                            )}
                        </XCard.ListItem>
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
                <LoadingIcon icon="cached" />
                {this.state.value.trim().length > 0 && this.state.focused &&
                    <SearchResults query={this.state.value} />
                }
            </Container>
        )
    }
}