import * as React from 'react';
import * as renderer from 'react-test-renderer';

jest.doMock('../components/DevDocsScaffold', () => {
    const ComponentToMock = ({ children }: any) => <div>{children}</div>;

    return {
        DevDocsScaffold: ComponentToMock,
    };
});

describe.only('MessageTextComponent', () => {
    const PageComponent = require('./MessageTextComponent.page').default;
    it('should render correctly', () => {
        expect(renderer.create(<PageComponent />).toJSON()).toMatchSnapshot();
    });
});
