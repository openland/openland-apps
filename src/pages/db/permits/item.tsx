import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withRouter } from '../../../utils/withRouter';

export default withPage(withRouter((props) => {
    return <div>{props.router.asPath}</div>;
}));