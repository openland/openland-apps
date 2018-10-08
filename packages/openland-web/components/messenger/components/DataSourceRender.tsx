import * as React from 'react';
import { DataSourceItem, DataSource, DataSourceWatcher } from 'openland-y-utils/DataSource';

export class DataSourceRender<T extends DataSourceItem> extends React.PureComponent<{ dataSource: DataSource<T>, render: (props: { items: T[], completed: boolean }) => any, onChange?: (items: T[]) => void }, { items: T[], completed: boolean }> implements DataSourceWatcher<T> {
    constructor(props: { dataSource: DataSource<T>, render: (props: { items: T[], completed: boolean }) => any, onChange?: (items: T[]) => void }) {
        super(props);
        this.state = { items: [], completed: false };
    }

    onChange = () => {
        if (this.props.onChange) {
            this.props.onChange(this.state.items);
        }
    }

    componentDidMount() {
        this.props.dataSource.watch(this);
    }

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
        return <this.props.render completed={this.state.completed} items={this.state.items} />;
    }
}
