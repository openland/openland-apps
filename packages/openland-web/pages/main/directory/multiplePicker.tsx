
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import Glamorous from 'glamorous';
import { SearchCondition } from './root.page';

const EntryScrollable = Glamorous(XVertical)({
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    paddingBottom: 7,
});

const EntryTitle = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    height: 40,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: -0.2,
    color: '#334562',
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 8
});

const EntryWrapper = Glamorous(XVertical)({
    borderRight: '1px solid rgba(220, 222, 228, 0.5)',
    '&:last-child': {
        borderRight: 'none',
    },
});

export const EntryItem = Glamorous.div<{ selected: boolean, hover?: boolean }>((props) => ({
    display: 'flex',
    alignItems: 'center',
    height: 40,
    flexShrink: 0,
    paddingLeft: 24,
    paddingRight: 24,
    opacity: 0.8,
    fontSize: 15,
    lineHeight: 1.33,
    fontWeight: 500,
    color: props.selected ? '#6b50ff' : '#334562',
    letterSpacing: -0.2,
    backgroundColor: props.selected ? '#f8f8fb' : undefined,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    ':hover': {
        ...(props.hover ? {
            color: '#6b50ff',
            backgroundColor: '#f8f8fb'
        } : {})
    }
}));

const filterOptions = (options: string[], q: string) => {
    return options.filter(e => ([...e.split(' '), e]).filter(s => q.length === 0 || s.toLowerCase().startsWith(q.toLowerCase())).length > 0);
};

interface EntriesComponentProps {
    title: string;
    options: string[];
    scrollToTarget?: boolean;
    selected?: number;
    query?: string;
    onPick: (q: SearchCondition) => void;
    onHover?: (i: number) => void;
}

class EntriesComponent extends React.Component<EntriesComponentProps> {
    containerRef?: any;
    targetRef?: any;
    captureContainerRef = (ref: any) => {
        this.containerRef = ref;
    }
    captureTargetRef = (ref: any) => {
        this.targetRef = ref;
    }

    componentDidUpdate() {
        if (this.props.selected !== undefined && this.targetRef && this.containerRef && this.props.scrollToTarget) {

            let container = ReactDOM.findDOMNode(this.containerRef);
            let target = ReactDOM.findDOMNode(this.targetRef);
            if (target && container) {
                let c = container as Element;
                let t = target as Element;
                let targetY = c.scrollTop + t.getBoundingClientRect().top - c.getBoundingClientRect().top;
                if (t.getBoundingClientRect().top < c.getBoundingClientRect().top) {
                    c.scrollTo(0, targetY);
                } else if (t.getBoundingClientRect().bottom > c.getBoundingClientRect().bottom) {
                    c.scrollTo(0, targetY - c.getBoundingClientRect().height + t.getBoundingClientRect().height);
                }

            }
        }
    }

    render() {
        return (
            <EntryWrapper separator="none" flexGrow={1}>
                <EntryTitle>{this.props.title}</EntryTitle>
                <EntryScrollable
                    innerRef={this.captureContainerRef}
                    separator="none"
                    width="100%"
                    maxHeight={243}
                    flexGrow={1}
                >
                    {filterOptions(this.props.options, this.props.query || '').map((e, i) => (
                        <div
                            key={e}
                            onMouseEnter={() => this.props.onHover ? this.props.onHover(i) : false}
                        >
                            <EntryItem
                                hover={!this.props.onHover}
                                innerRef={i === this.props.selected ? this.captureTargetRef : undefined}
                                selected={i === this.props.selected}
                                onClick={() => this.props.onPick({ type: 'location', value: e, label: e })}
                                key={e + '_' + i}
                            >
                                {e}
                            </EntryItem>
                        </div>
                    ))}
                </EntryScrollable>
            </EntryWrapper>
        );
    }
}

const PickerTitle = Glamorous.div({
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: 0.1,
    color: '#334562',
    paddingLeft: 24,
    paddingRight: 24
});

const PickerEntries = Glamorous(XHorizontal)({
    borderTop: '1px solid rgba(220, 222, 228, 0.5)'
});

const HelpText = Glamorous.div({
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.27,
    letterSpacing: -0.1,
    color: '#334562',
    marginBottom: '24px !important'
});

interface MultoplePickerProps {
    options: { label: string, values: string[] }[];
    query?: string;
    onPick: (location: string) => void;
    title?: string;
}

interface MultiplePickerState {
    selected: number[];
    empty: boolean;
    filteredOptions: { label: string, values: string[] }[];
    scrollToSelected?: boolean;
}

export class MultiplePicker extends React.Component<MultoplePickerProps, MultiplePickerState> {

    constructor(props: MultoplePickerProps) {
        super(props);
        let fOptions = [];
        for (let o of props.options) {
            if (filterOptions(o.values, props.query || '').length > 0) {
                fOptions.push({ label: o.label, values: filterOptions(o.values, props.query || '') });
            }
        }

        this.state = {
            selected: [0, 0],
            empty: false,
            filteredOptions: fOptions
        };
    }

    componentWillReceiveProps(props: MultoplePickerProps) {
        let fOptions = [];
        let count = 0;
        for (let o of props.options) {
            if (filterOptions(o.values, props.query || '').length > 0) {
                count += filterOptions(o.values, props.query || '').length;
                fOptions.push({ label: o.label, values: filterOptions(o.values, props.query || '') });
            }
        }

        this.setState({ selected: [0, 0], empty: count === 0, filteredOptions: fOptions });
    }

    keydownHandler = (e: any) => {

        let dx = 0;
        let dy = 0;
        if (e.code === 'ArrowUp') {
            dy = -1;
        }
        if (e.code === 'ArrowDown') {
            dy = 1;
        }
        if (e.code === 'ArrowLeft') {
            dx = -1;
        }
        if (e.code === 'ArrowRight') {
            dx = 1;
        }

        if (e.code === 'Enter') {
            e.preventDefault();
            if (!this.state.empty) {
                this.props.onPick(this.state.filteredOptions[this.state.selected[0]].values[this.state.selected[1]]);
            } else {
                this.props.onPick(this.props.query || '');
            }
        }

        let x = this.state.selected[0] + dx;
        let y = this.state.selected[1] + dy;

        x = Math.min(this.state.filteredOptions.length - 1, Math.max(0, x));
        y = Math.min(this.state.filteredOptions[x] ? this.state.filteredOptions[x].values.length - 1 : 0, Math.max(0, y));

        if (dx !== 0) {
            y = 0;
        }

        this.setState({ selected: [x, y], scrollToSelected: true });

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
                {this.state.empty && <HelpText>{'Press Enter to add "' + this.props.query + '" location'}</HelpText>}
                {!this.state.empty && (
                    <XVertical separator={9} width="100%">
                        {this.props.title && <PickerTitle>{this.props.title}</PickerTitle>}
                        {this.props.options.length === 1 && (
                            <EntriesComponent
                                scrollToTarget={this.state.scrollToSelected}
                                onHover={index => this.setState({ selected: [0, index], scrollToSelected: false })}
                                key={this.props.options[0].label + '_' + 0}
                                selected={0 === this.state.selected[0] ? this.state.selected[1] : undefined}
                                title={this.props.options[0].label}
                                query={this.props.query}
                                options={this.props.options[0].values}
                                onPick={sq => this.props.onPick(sq.label)}
                            />
                        )}
                        {this.props.options.length > 1 && (

                            <PickerEntries separator="none">
                                {this.props.options.filter(o => filterOptions(o.values, this.props.query || '').length > 0).map((o, i) => (
                                    <EntriesComponent
                                        scrollToTarget={this.state.scrollToSelected}
                                        onHover={index => this.setState({ selected: [i, index], scrollToSelected: false })}
                                        key={o.label + '_' + i}
                                        selected={i === this.state.selected[0] ? this.state.selected[1] : undefined}
                                        title={o.label}
                                        query={this.props.query}
                                        options={o.values}
                                        onPick={sq => this.props.onPick(sq.label)}
                                    />
                                ))}
                            </PickerEntries>
                        )}

                    </XVertical>
                )}
            </>
        );
    }
}
