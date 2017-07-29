import * as React from 'react'
import Counter from '../../Indicators/Counter'

export default function () {
    return (
        <div className="ver">
            <div className="hor">
                <Counter name="housing" />
                <Counter name="housing" />
                <Counter name="housing" />
                <Counter name="housing" />
                <Counter name="housing" />
            </div>
        </div>
    )
}