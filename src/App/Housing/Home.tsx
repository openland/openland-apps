import * as React from 'react';
import { Row, Col, Button } from 'antd';
import { Doughnut, Item } from '../../Indicators/Doughnut';
import Counter from '../../Indicators/Counter';
import Like from '../../Components/Like';

function section(title: string) {
    return (
        <div className="nav">
            <Button type="primary">{title}</Button>
        </div>
    );
}

export default function () {
    return (
        <div className="ver">
            <div className="housing-bg">
                <div className="title">
                    <span>San Francisco Housing Performance Portal</span>
                    <span className="subtitle">
                        Track, analyze and make decisions about
                        San Francisco housing performance</span>
                    <Like id="MTIz" />
                </div>
                <div className="navigation">
                    <Row type="flex">
                        <Col span={4}>{section('Zoning')}</Col>
                        <Col span={4}>{section('Pipeline')}</Col>
                        <Col span={4}>{section('Permits')}</Col>
                        <Col span={4}>{section('Finance')}</Col>
                        <Col span={4}>{section('Policy')}</Col>
                        <Col span={4}>{section('Homeless')}</Col>
                    </Row>
                </div>
            </div>
            <h1>Zoning <a href="#">read more...</a></h1>
            <div className="card-row">
                <div className="card-4">
                    <Doughnut>
                        <Item title="Hispanic" value={120} />
                        <Item title="Russian" value={120} />
                        <Item title="Black" value={120} />
                    </Doughnut>
                </div>
                <div className="card-2">
                    <Counter name="Counter1" value="123" />
                </div>
                <div className="card-2">
                    <Counter name="Counter1" value="123" />
                </div>
                <div className="card-2">
                    <Counter name="Counter1" value="123" />
                </div>
            </div>
            <h1>Pipeline <a href="#">read more...</a></h1>
            <div className="card-row">
                <div className="card-4">
                    <Doughnut>
                        <Item title="Hispanic" value={120} />
                        <Item title="Russian" value={120} />
                        <Item title="Black" value={120} />
                    </Doughnut>
                </div>
                <div className="card-2">
                    <Counter name="Counter1" value="123" />
                </div>
                <div className="card-2">
                    <Counter name="Counter1" value="123" />
                </div>
                <div className="card-2">
                    <Counter name="Counter1" value="123" />
                </div>
            </div>
        </div>
    );
}