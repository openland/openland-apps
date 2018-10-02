
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';

const EntryScrollable = Glamorous(XVertical)({
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    paddingBottom: 7,
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
    height: 62,
    flexShrink: 0,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15,
    lineHeight: 1.33,
    fontWeight: 500,
    letterSpacing: -0.2,
    backgroundColor: props.selected ? '#f9fafb' : undefined,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    ':hover': {
        ...(props.hover ? {
            backgroundColor: '#f9fafb'
        } : {})
    }
}));

const UserName = Glamorous.div({
    opacity: 0.9,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.14,
    letterSpacing: -0.2,
    color: '#121e2b'
});

const UserOrg = Glamorous.div({
    opacity: 0.4,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.14,
    letterSpacing: -0.2,
    color: '#121e2b'
});

const filterOptions = (options: { type: string | null, label: string, value: string, photo: string | null, org: string | null }[], q: string) => {
    return options.filter(e => ([...e.label.split(' '), e.label]).filter(s => q.length === 0 || s.toLowerCase().startsWith(q.toLowerCase())).length > 0);
};

interface EntriesComponentProps {
    options: { type: string | null, label: string, value: string, photo: string | null, org: string | null }[];
    scrollToTarget?: boolean;
    selected?: number;
    query?: string;
    onPick: (q: { type: string | null, label: string, value: string }) => void;
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
                <EntryScrollable
                    innerRef={this.captureContainerRef}
                    separator="none"
                    width="100%"
                    maxHeight={243}
                    flexGrow={1}
                >
                    {filterOptions(this.props.options, this.props.query || '').map((e, i) => (
                        <div
                            key={e.value}
                            onMouseEnter={() => this.props.onHover ? this.props.onHover(i) : false}
                        >
                            <EntryItem
                                hover={!this.props.onHover}
                                innerRef={i === this.props.selected ? this.captureTargetRef : undefined}
                                selected={i === this.props.selected}
                                onClick={() => this.props.onPick({ type: e.type, value: e.value, label: e.label })}
                                key={e + '_' + i}
                            >
                                <XHorizontal separator={6} alignItems="center">
                                    <XAvatar
                                        userId={e.value}
                                        userName={e.label}
                                        style={e.type ? (e.type === 'Organization' ? 'organization' : 'colorus') : 'colorus'}
                                        src={e.photo || ''}
                                        size="small"
                                    />
                                    <XVertical separator={3}>
                                        <UserName>{e.label}</UserName>
                                        {e.org && <UserOrg>{e.org}</UserOrg>}
                                    </XVertical>
                                </XHorizontal>
                            </EntryItem>
                        </div>
                    ))}
                </EntryScrollable>
            </EntryWrapper>
        );
    }
}

const PickerEntries = Glamorous(XHorizontal)({
    borderTop: '1px solid rgba(220, 222, 228, 0.5)'
});

interface MultoplePickerProps {
    options: { label?: string, values: { type: string | null, label: string, value: string, photo: string | null, org: string | null }[] }[];
    query?: string;
    onPick: (location: { type: string | null, label: string, value: string }) => void;
    title?: string;
}

interface MultiplePickerState {
    selected: number[];
    empty: boolean;
    notFound: boolean;
    filteredOptions: { label?: string, values: { type: string | null, label: string, value: string, photo: string | null, org: string | null }[] }[];
    scrollToSelected?: boolean;
    query?: string;
}

export class UserPicker extends React.Component<MultoplePickerProps, MultiplePickerState> {
    timer: any;

    constructor(props: MultoplePickerProps) {
        super(props);
        let fOptions = [];
        let count = 0;
        for (let o of props.options) {
            if (filterOptions(o.values, props.query || '').length > 0) {
                count += filterOptions(o.values, props.query || '').length;
                fOptions.push({ label: o.label, values: filterOptions(o.values, props.query || '') });
            }
        }

        this.state = {
            selected: [0, 0],
            empty: count === 0,
            notFound: count === 0,
            filteredOptions: fOptions
        };
    }

    componentWillReceiveProps(props: MultoplePickerProps) {
        clearInterval(this.timer);
        let fOptions = [];
        let count = 0;
        for (let o of props.options) {
            if (filterOptions(o.values, props.query || '').length > 0) {
                count += filterOptions(o.values, props.query || '').length;
                fOptions.push({ label: o.label, values: filterOptions(o.values, props.query || '') });
            }
        }

        this.setState({
            notFound: false
        });

        this.timer = setTimeout(() => {
            this.setState({
                notFound: count === 0
            });

        },                      1000);

        this.setState({ 
            selected: [0, 0], 
            empty: count === 0,
            filteredOptions: fOptions, 
            query: props.query 
        });
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

        if (e.code === 'Enter' || e.code === 'Tab') {
            e.preventDefault();
            if (!this.state.empty) {
                this.props.onPick(this.state.filteredOptions[this.state.selected[0]].values[this.state.selected[1]]);
            } else {
                this.props.onPick({ type: null, label: this.props.query || '', value: this.props.query || '' });
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
        clearInterval(this.timer);
    }
    render() {
        return (
            <>
                {this.state.empty && (
                    <XHorizontal alignItems="center" justifyContent="center" width={120}>
                        <XButton alignSelf="center" style="flat" text="not found :(" loading={!this.state.notFound} />
                    </XHorizontal>
                )}
                {!this.state.empty && (
                    <XVertical separator={9} width="100%">
                        {this.props.options.length === 1 && (
                            <EntriesComponent
                                scrollToTarget={this.state.scrollToSelected}
                                onHover={index => this.setState({ selected: [0, index], scrollToSelected: false })}
                                key={this.props.options[0].label + '_' + 0}
                                selected={0 === this.state.selected[0] ? this.state.selected[1] : undefined}
                                query={this.props.query}
                                options={this.props.options[0].values}
                                onPick={sq => this.props.onPick({ type: sq.type, label: sq.label, value: sq.value })}
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
                                        query={this.props.query}
                                        options={o.values}
                                        onPick={sq => this.props.onPick(sq)}
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
