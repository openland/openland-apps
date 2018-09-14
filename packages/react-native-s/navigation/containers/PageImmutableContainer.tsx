import * as React from 'react';

export interface PageImmutableContainerProps {
    component: React.ComponentType<{}>;
}

/**
 * PageImmutableContainer asserts that we will never ever re-render page.
 */
export class PageImmutableContainer extends React.Component<PageImmutableContainerProps> {
    shouldComponentUpdate(nextProps: PageImmutableContainerProps) {
        if (nextProps.component !== this.props.component) {
            throw Error('Page Container props shouldn\'t change');
        }
        return false;
    }

    render() {
        let Component = this.props.component;
        return (
            <Component />
        );
    }
}