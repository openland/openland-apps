import * as React from 'react'
import {Icon} from 'antd'
export default function (props: { name: string }) {
    return (
        <div className="counter">
            <span className="counter-title"><Icon type="home"/> {props.name}</span>
            <span className="counter-value">7500</span>
        </div>
    )
}