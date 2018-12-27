import * as React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default class AboutPage extends React.Component {
    render() {
        return (
            <>
                <Header />
                <div>About</div>
                <Footer />
            </>
        );
    }
}
