import * as React from 'react';

interface ClickOutsideProps {
    onClickOutside: Function;
}

export default class ClickOutside extends React.Component<ClickOutsideProps> {
    private container: any;

    constructor(props: any) {
        super(props);
        this.getContainer = this.getContainer.bind(this);
    }

    getContainer(ref: any) {
        this.container = ref;
    }

    render() {
        const { children, onClickOutside, ...props } = this.props;
        return <div {...props} ref={this.getContainer}>{children}</div>;
    }

    componentDidMount() {
        document.addEventListener('click', this.handle, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handle, true);
    }

    handle = (e: any) => {
        const { onClickOutside } = this.props;
        const el = this.container;
        if (!el.contains(e.target)) {
            onClickOutside(e);
        }
    }
}