import * as React from 'react'
import Counter from '../../Indicators/Counter'
export default function () {
    return (
        <div className="ver">
            <div className="hor">
                <Counter name="1" />
                <Counter name="2" />
                <Counter name="3" />
                <Counter name="4" />
                <Counter name="5" />
            </div>
        </div>
    )
}