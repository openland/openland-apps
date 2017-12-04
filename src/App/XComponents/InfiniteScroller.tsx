import * as React from 'react';

export class InfiniteScroller extends React.Component<{onLoadMore: () => void}> {
    private sentinel: HTMLDivElement | null;

    constructor() {
        super();

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.checkWindowScroll);
        window.addEventListener('resize', this.checkWindowScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.checkWindowScroll);
        window.removeEventListener('resize', this.checkWindowScroll);
    }
    
    checkWindowScroll = () => {
        if (this.sentinel!!.getBoundingClientRect().top - window.innerHeight < 100) {
            this.props.onLoadMore();
        }
    }

    clickHandler (e: any) {
        e.preventDefault();

        this.props.onLoadMore();
    }

    render() {
        return (
            <div className="x-infinite" ref={i => this.sentinel = i}>
                <a href="#" onClick={this.clickHandler}>Load more...</a>
            </div>
        );
    }
}