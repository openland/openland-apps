import * as React from 'react';
import { ErrorPage } from '../components/ErrorPage';

export default class Error extends React.Component {
    render() {
        return <ErrorPage statusCode={404} />;
    }
}