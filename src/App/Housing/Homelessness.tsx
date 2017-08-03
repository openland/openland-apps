import * as React from 'react';
import Counter from '../Components/Counter';
export default function () {
    return (
        <div className="ver">
            <div className="hor">
                <Counter name="1" value="123"/>
                <Counter name="2" value="123"/>
                <Counter name="3" value="123"/>
                <Counter name="4" value="123"/>
                <Counter name="5" value="123"/>
            </div>
        </div>
    );
}