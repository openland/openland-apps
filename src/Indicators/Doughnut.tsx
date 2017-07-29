import * as React from 'react'
import { Doughnut as DoughnutJs } from 'react-chartjs-2';

export interface DataRecordProps {
    title: string
    value: number
    color?: string
}
const DefaultColors = ['#FF6384', '#36A2EB', '#FFCE56']

export class Item extends React.Component<DataRecordProps, {}>{}
export class Doughnut extends React.Component<{}, {}> {

    constructor() {
        super();
    }

    render(): JSX.Element | null | false {
        var lb:string[] = []
        var dt:number[] = []
        var c:string[] = []
        var colorIndex = 0
        React.Children.forEach(this.props.children, function (params: any) {
            let p = params.props as DataRecordProps
            lb.push(p.title)
            dt.push(p.value)
            if (p.color != null){
                c.push(p.color)
            } else {
                c.push(DefaultColors[colorIndex++])
            }
        })
        return (
            <DoughnutJs data={{labels: lb,datasets: [{data: dt,backgroundColor: c,hoverBackgroundColor: c}]}} options={{legend: { position: 'right' }}} />
        );
    }
}