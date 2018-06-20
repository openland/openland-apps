import './init';
import '../globals';
import * as React from 'react';
import { withData } from '../components/withData';
import { ErrorPage } from '../components/ErrorPage';

export default withData('Error', class Error extends React.Component {
    render() {
        return <ErrorPage statusCode={404} />;
    }
});