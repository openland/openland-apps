import * as React from 'react';
import { HeaderLarge } from '../XComponents/HeaderLarge';
import { HeaderLargeTitle } from '../XComponents/HeaderLargeTitle';
import { HeaderLargeSocial } from '../XComponents/HeaderLargeSocial';

export function Dashboard() {
    return (
        <div>
            <HeaderLarge key="header">
                <HeaderLargeTitle title="San Francisco Housing Forecast 2017-18" />
                <HeaderLargeSocial />
            </HeaderLarge>
            <div key="content">{}</div>
        </div>
    );
}