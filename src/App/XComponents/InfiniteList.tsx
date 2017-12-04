import * as React from 'react';
import { GraphQLListComponentProps } from '../../api/graphqlList';
import { Loader } from '../Components/Loader';

function InfiniteListContainer(props: { children: any }) {
    return (
        <div className="x-in--list">
            {props.children}
        </div>
    );
}

class PageEndDetector extends React.Component<{ onLoadMore: () => void }> {
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

export function withInfiniteList<TResult>(render: (item: TResult) => React.ReactNode): React.ComponentType<GraphQLListComponentProps<TResult>> {
    return function (props: GraphQLListComponentProps<TResult>) {
        if (props.data.items && props.data.loading) {
            return (
                <InfiniteListContainer>
                    <span key="____loader">Loading...</span>
                    {props.data.items.edges.map(p => render(p.node))}
                </InfiniteListContainer>
            );
        }
        if (props.data.loading) {
            return (
                <InfiniteListContainer>
                    <Loader key="____loader_big" />
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

        return (
            <InfiniteListContainer>
                {props.data.items.edges.map(p => render(p.node))}

                {props.data.items!!.pageInfo.hasNextPage && (
                    <PageEndDetector
                        onLoadMore={() => {
                            if (props.data.networkStatus === 7 /* when ready */) {
                                props.data.loadMoreEntries();
                            }
                        }}
                    />
                )}
            </InfiniteListContainer>
        );
    };
}