import * as React from 'react'
import Counter from '../../Indicators/Counter'
import { Row, Col } from 'antd'
import { Doughnut } from 'react-chartjs-2';
export default function () {
    return (
        <div className="ver">
            <Row type="flex">
                <Col span={4}><Counter name="Avaliable Units" value="123" /></Col>
                <Col span={4}><Counter name="Avaliable Units" value="123" /></Col>
                <Col span={4}><Counter name="Avaliable Units" value="123" /></Col>
                <Col span={4}><Counter name="Avaliable Units" value="123" /></Col>
                <Col span={4}><Counter name="Avaliable Units" value="123" /></Col>
                <Col span={4}><Counter name="Avaliable Units" value="123" /></Col>
            </Row>
            <div className="card-row">
                <div className="card-4">
                    <Doughnut height={200} width={300} data={
                        {
                            labels: [
                                'Red',
                                'Green',
                                'Yellow'
                            ],
                            datasets: [{
                                data: [300, 50, 100],
                                backgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56'
                                ],
                                hoverBackgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56'
                                ]
                            }]
                        }
                    } options = {{
                        legend: {position: 'right'}
                    }} />
                </div>
            </div>
        </div>
    )
}