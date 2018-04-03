import * as React from 'react';
import Types from 'openland-api';
import { ResponsiveContainer, BarChart, CartesianGrid, Bar, Tooltip, XAxis, YAxis } from 'recharts';
import { canUseDOM } from '../../utils/environment';

let colors = ['#8884d8', '#82ca9d'];

export class XBarChart extends React.Component<{ data: Types.ChartFullFragment, defaultColor?: string, maxY?: number, minY?: number, stacked?: boolean }> {

    render() {
        if (!canUseDOM) {
            return <div/>;
        }
        let data: object[] = this.props.data.labels.map((v, i) => {
            let row = {name: this.props.data.labels[i]};
            this.props.data.datasets.forEach((d, j) => {
                row['item-' + j] = d.values[i];
            });
            return row;
        });

        return (
            <ResponsiveContainer height={400}>
                <BarChart data={data}>
                    <XAxis dataKey={'name'} />
                    <YAxis
                        domain={[this.props.minY !== undefined ? this.props.minY!! : 'auto', this.props.maxY !== undefined ? this.props.maxY!! : 'auto']}/>
                    <CartesianGrid strokeDasharray={'3 3'}/>
                    <Tooltip/>
                    {this.props.data.datasets.map((v, i) => (
                        <Bar key={'item-' + i}
                             dataKey={'item-' + i}
                             fill={(this.props.defaultColor) ? this.props.defaultColor : colors[i]}
                             name={v.label}
                             stackId={this.props.stacked === true ? 'someStackId' : undefined}
                             label={false}
                        />))}
                </BarChart>
            </ResponsiveContainer>
        );
    }
}