import * as React from 'react';
import {
    DataSourceItem,
    DataSource,
    DataSourceWatcher,
} from 'openland-y-utils/DataSource';

export interface DataSourceRenderProps<T extends DataSourceItem> {
    dataSource: DataSource<T>;
    render: (props: { items: T[]; completed: boolean }) => any;
    onChange?: (items: T[]) => void;
}

interface DataSourceRenderState<T extends DataSourceItem> {
    items: T[];
    completed: boolean;
}

export class DataSourceRender<T extends DataSourceItem>
    extends React.Component<DataSourceRenderProps<T>, DataSourceRenderState<T>>
    implements DataSourceWatcher<T> {

    constructor(props: DataSourceRenderProps<T>) {
        super(props);
        this.state = { items: [], completed: false };
    }

    componentDidMount() {
        this.props.dataSource.watch(this);
    }

    shouldComponentUpdate(nextProps: DataSourceRenderProps<T>, nextState: DataSourceRenderState<T>) {
        return this.state.items !== nextState.items || this.state.completed !== nextState.completed;
    }

    onChange = () => {
        if (this.props.onChange) {
            this.props.onChange(this.state.items);
        }
    };

    onDataSourceInited(data: T[], completed: boolean) {
        this.setState({ completed: completed, items: [...data] });
        this.onChange();
    }
    onDataSourceItemAdded(item: T, index: number) {
        let items = [...this.state.items];
        items.splice(index, 0, item);
        this.setState({ items });
        this.onChange();
    }
    onDataSourceItemUpdated(item: T, index: number) {
        let items = [...this.state.items];
        items[index] = item;
        this.setState({ items });
        this.onChange();
    }
    onDataSourceItemRemoved(item: T, index: number) {
        let items = [...this.state.items];
        items.splice(index, 1);
        this.setState({ items });
        this.onChange();
    }
    onDataSourceItemMoved(item: T, fromIndex: number, toIndex: number) {
        let items = [...this.state.items];
        items.splice(fromIndex, 1);
        items.splice(toIndex, 0, item);
        this.setState({ items });
        this.onChange();
    }
    onDataSourceLoadedMore(data: T[], completed: boolean) {
        this.setState({ items: [...this.state.items, ...data], completed });
        this.onChange();
    }
    onDataSourceCompleted() {
        this.setState({ completed: true });
    }

    render() {
        return (
            <this.props.render
                completed={this.state.completed}
                items={this.state.items}
            />
        );
    }
}
