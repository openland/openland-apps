import * as React from 'react';
import { withApp } from '../../components/App/withApp';
import { XCard } from '../../components/X/XCard';

export default withApp((props) => {
    return (
        <XCard shadow="medium">
            <XCard.Content>
                Hello!
            </XCard.Content>
        </XCard>
    );
});