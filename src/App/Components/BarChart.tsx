import * as React from 'react';
import { Bar as BarJs } from 'react-chartjs-2';

export interface BarChartData {
    labels: string[];
    datasets: BarChartDataset[];
}

export interface BarChartDataset {
    label: string;
    data: number[];
    color: string;
}

export class BarChart extends React.Component<{ data: BarChartData }> {

    chartRef?: any = null;

    handleRef = (ref: any) => {
        if (ref) {
            this.chartRef = ref;
            console.warn(this.chartRef);
        }
    }

    render() {
        var labels = this.props.data.labels;
        var datasets = this.props.data.datasets.map((p) => {
            return {
                label: p.label,
                data: p.data,
                backgroundColor: p.color,
                borderColor: p.color,
                fill: false,
                lineTension: 0
            };
        });
        var data = { labels: labels, datasets: datasets };

        var chartOptions = {
            scales: {
                yAxes: [{ ticks: { beginAtZero: true } }],
                xAxes: [{
                    categoryPercentage: 0.85,
                    barPercentage: 0.75,
                    gridLines: { display: false }
                }]
            },
            layout : {
                padding: {
                    top: 64
                }
            },
            responsive: true,
            legend: { display: false },
            tooltips: { enabled: false },
            events: [],
            animation: {
                onComplete: function () {
                    var ctx = (this as any).ctx;

                    // ctx.font = Chart.helpers.fontString(defaults.global.defaultFontFamily, 'normal', defaults.global.defaultFontFamily);
                    ctx.fillStyle = 'grey';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    (this as any).data.datasets.forEach((dataset: any) => {
                        for (var i = 0; i < dataset.data.length; i++) {
                            for (var key in dataset._meta) {
                                if (dataset._meta[key]) {
                                    var model = dataset._meta[key].data[i]._model;
                                    ctx.fillText(dataset.data[i], model.x, model.y - 5);
                                }
                            }
                        }
                    });
                }
            }
        };

        return (
            <div className="st-chart">
                <div className="st-chart--in">
                    <BarJs data={data} options={chartOptions} ref={this.handleRef} />
                </div>
                <div className="st-chart--legend">
                    {this.props.data.datasets.map((d) => (
                        <div className="st-chart--item" key={d.label}>
                            <span style={{ borderColor: d.color }} />
                            {d.label}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}