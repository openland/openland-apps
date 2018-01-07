import * as React from 'react';
import { Chart } from '../../api/Chart';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

export class XBarChart extends React.Component<{ data: Chart }> {

    render() {
        let data: object[] = this.props.data.labels.map((v, i) => {
            let row = {name: this.props.data.labels[i]};
            this.props.data.datasets.forEach((d, j) => {
                row['item-' + j] = d.values[i];
            });
            return row;
        });

        return (
            <div>
                <LineChart width={600} height={300} data={data}>
                    <XAxis dataKey={'name'}/>
                    <YAxis domain={[0, 3600]}/>
                    <CartesianGrid strokeDasharray={'3 3'}/>
                    <Tooltip/>
                    {this.props.data.datasets.map((v, i) => (<Line key={'item-' + i} dataKey={'item-' + i}/>))}
                </LineChart>
            </div>
        );
    }
}