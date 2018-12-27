import * as React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default class TermsPage extends React.Component {
    render() {
        return (
            <>
                <Header />
                <div>Terms</div>
                <Footer />
            </>
        );
    }
}
