import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withRouter } from '../../../utils/withRouter';

const Index = withRouter((props) => {
    return <div>{props.router.asPath}</div>;
});

export default withPage(Index);