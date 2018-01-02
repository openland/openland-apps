import * as React from 'react';
import { ListQueryData } from '../utils/graphqlList';
import { Loader, LoaderLine } from './Loaders';
import { canUseDOM } from '../utils/environment';

// import FlipMove from 'react-flip-move';

function InfiniteListContainer(props: { children: any }) {
    return (
        <div className="x-in--list">
            {props.children}
        </div>
    );
}

class PageEndDetector extends React.Component<{ onLoadMore: () => void }> {
    private sentinel: HTMLDivElement | null;

    constructor(props: { onLoadMore: () => void }) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        if (canUseDOM) {
            window.addEventListener('scroll', this.checkWindowScroll);
            window.addEventListener('resize', this.checkWindowScroll);
        }
    }

    componentWillUnmount() {
        if (canUseDOM) {
            window.removeEventListener('scroll', this.checkWindowScroll);
            window.removeEventListener('resize', this.checkWindowScroll);
        }
    }

    checkWindowScroll = () => {
        if (canUseDOM) {
            if (this.sentinel!!.getBoundingClientRect().top - window.innerHeight < 100) {
                this.props.onLoadMore();
            }
        }
    };

    clickHandler(e: any) {
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

export function XInfiniteListItem(props: { children: any }) {
    return (
        <div className="x-in--item">
            {props.children}
        </div>
    );
}

export function withInfiniteList<TResult extends { id: string }>(render: (item: TResult[]) => React.ReactNode): React.ComponentType<ListQueryData<TResult>> {
    return function (props: ListQueryData<TResult>) {
        if (props.data.items && props.data.loading) {
            return (
                <InfiniteListContainer>
                    <LoaderLine key="____loader"/>
                    {render(props.data.items.edges.map((p) => p.node))}
                </InfiniteListContainer>
            );
        }
        if (props.data.loading) {
            return (
                <InfiniteListContainer>
                    <Loader isRelative={true} noBackground={true} key="____loader_big"/>
                </InfiniteListContainer>
            );
        } else if (props.data.error != null) {
            return (
                <InfiniteListContainer>
                    <div key="____error">
                        {props.data.error.message}
                    </div>
                </InfiniteListContainer>
            );
        }

        if (props.data.items && props.data.items.edges.length === 0) {
            return (
                <InfiniteListContainer>
                    <div className="x-empty">No buildings match your criteria</div>
                </InfiniteListContainer>
            );
        }

        return (
            <InfiniteListContainer>
                {render(props.data.items.edges.map((p) => p.node))}

                {props.data.items!!.pageInfo.hasNextPage && (
                    <PageEndDetector key="__page_end_detector" onLoadMore={props.data.loadMoreEntries}/>
                )}
            </InfiniteListContainer>
        );
    };
}