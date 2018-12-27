import * as React from 'react';
import { Container } from './Container';
import { FooterStyles } from './footer/styles';

export const Footer = () => (
    <footer className={FooterStyles.root}>
        <Container>Footer</Container>
        <div className={FooterStyles.info}>
            &copy; 2018 Data Makes Perfect Inc.<span>Built in San Francisco</span>
        </div>
    </footer>
);
