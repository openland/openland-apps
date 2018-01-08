import * as React from 'react';
import { Chart } from '../../api/Chart';
import { BarChart, CartesianGrid, Bar, Tooltip, XAxis, YAxis } from 'recharts';
import { canUseDOM } from '../../utils/environment';

let colors = ['#8884d8', '#82ca9d'];

export class XBarChart extends React.Component<{ data: Chart, maxY?: number, minY?: number, stacked?: boolean }> {

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
            <div>
                <BarChart width={850} height={400} data={data}>
                    <XAxis dataKey={'name'}/>
                    <YAxis
                        domain={[this.props.minY !== undefined ? this.props.minY!! : 'auto', this.props.maxY !== undefined ? this.props.maxY!! : 'auto']}/>
                    <CartesianGrid strokeDasharray={'3 3'}/>
                    <Tooltip/>
                    {this.props.data.datasets.map((v, i) => (
                        <Bar key={'item-' + i}
                             dataKey={'item-' + i}
                             fill={colors[i]}
                             name={v.label}
                             stackId={this.props.stacked === true ? 'someStackId' : undefined}
                             label={true}
                        />))}
                </BarChart>
            </div>
        );
    }
}