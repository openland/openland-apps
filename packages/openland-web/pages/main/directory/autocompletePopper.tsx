import * as React from 'react';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchCondition } from './root.page';
// import { XText } from 'openland-x/XText';

// class EntryComponent extends React.Component<{ entry: SearchCondition, sugestion: boolean}> {
//     render() {
//         return (
//            <XText>{this.props.entry.label + ' ' + (this.props.entry.type === 'location' ? '' : this.props.entry.type === 'organizationType' ? 'category' : 'intereset')}</XText>
//         );
//     }
// }

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
        let content = (
            <XVertical>
                    {/* {[...TextDirectory.locationPicker].filter(e => ([...e.split(' '), e]).filter(s => this.props.query.length === 0 || s.toLowerCase().startsWith(this.props.query.toLowerCase())).length > 0).map((e, i) => <EntryItem onClick={() => this.props.onPick({ type: 'location', value: e, label: e })} key={e + '_' + i}>{e}</EntryItem>)} */}
                
            </XVertical>
        );
        return (
            <XPopper
                placement="bottom-start"
                show={!!(this.props.query)}
                content={content}
                arrow={null}
            >
                {this.props.target}
            </XPopper>
        );
    }
}