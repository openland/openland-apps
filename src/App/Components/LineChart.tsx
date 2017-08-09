import * as React from 'react';
import { Line as LineJs } from 'react-chartjs-2';

const DefaultColors = ['#f4bd8e', '#f4a460', '#c1824c', '#746151', '#85a5c0', '#4682b4'];

export interface DataRecordProps {
    title: string;
    value: number;
    color?: string;
}
export interface LineChartProps {
    [key: string]: any;

    kind?: 'percent' | 'raw' | string;
    title: string;
}
export class Item extends React.Component<DataRecordProps, {}> { }
export class LineChart extends React.Component<LineChartProps, {}> {

    render(): JSX.Element | null | false {
        var lb: string[] = [];
        var dt: number[] = [];
        var c: string[] = [];
        var colorIndex = 0;
        React.Children.forEach(this.props.children, function (params: React.ReactChild) {
            let p = (params as React.ReactElement<DataRecordProps>).props;
            lb.push(p.title);
            dt.push(p.value);
            if (p.color != null) {
                c.push(p.color);
            } else {
                c.push(DefaultColors[(colorIndex++) % DefaultColors.length]);
            }
        });
        return (
            <LineJs
                data={{
                    labels: lb, datasets: [{
                        label: this.props.title,
                        data: dt, 
                        // backgroundColor: c, 
                        // hoverBackgroundColor: c
                    }]
                }}
                options={{ legend: { position: 'bottom' } }}
                {...this.props}
            />
        );
    }
}