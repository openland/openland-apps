import * as React from 'react';
import { Icon } from 'antd';
export default function (props: { name: string, value: string }) {
    return (
        <div className="card-1">
            <div className="counter">
                <span className="counter-title"><Icon type="home" /> {props.name}</span>
                <span className="counter-value">{props.value}</span>
            </div>
        </div>
    );
}