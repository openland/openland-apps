export interface Chart {
    labels: string[];
    datasets: ChartData[];
}

export interface ChartData {
    label: string;
    values: number[];
}