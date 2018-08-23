import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XLink } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';

const PaginationWrapper = Glamorous(XHorizontal)({
    paddingTop: 16,
    paddingBottom: 16
});

const PaginationButton = Glamorous(XLink)<{ current?: boolean, disable?: boolean, }>(props => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    minWidth: 24,
    height: 24,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    letterSpacing: -0.2,
    textAlign: 'center',
    color: props.current ? '#fff' : '#5c6a81',
    backgroundColor: props.current ? '#5c6a81' : '#f3f3f5',
    cursor: (props.disable || props.current) ? 'default' : undefined,
    pointerEvents: (props.disable || props.current) ? 'none' : undefined,
    '&:hover': {
        backgroundColor: '#654bfa',
        color: '#fff'
    },
    '& > i': {
        fontSize: 20,
        color: props.disable ? '#c1c7cf' : undefined
    },
    '&.arrow': {
        width: 24,
        maxWidth: 24
    }
}));

const PaginationDotted = Glamorous.div({
    width: 18,
    height: 24,
    color: '#c1c7cf',
    textAlign: 'center',
    lineHeight: '25px',
    fontSize: 25,
    fontWeight: 500,
    letterSpacing: -0.1
});

interface PagePaginationProps {
    pageInfo: {
        hasNextPage: boolean;
        itemsCount: number;
        pagesCount: number;
        currentPage: number;
        openEnded: boolean;
    };
}

export class PagePagination extends React.Component<PagePaginationProps> {
    constructor(props: PagePaginationProps) {
        super(props);
    }
    PaginationFunc = (pagesCount: number, currentPage: number) => {
        let delta = 2;
        let left = currentPage - delta;
        let right = currentPage + delta + 1;
        let range = [];
        let rangeWithDots = [];
        let l;

        for (let i = 1; i <= pagesCount; i++) {
            if (i === 1 || i === pagesCount || i >= left && i < right) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(
                        <PaginationButton key={'pag1_' + i + left} current={(i + 1) === currentPage} path={'/directory?page=' + (i + 1).toString() + '#'}>
                            {i + 1}
                        </PaginationButton>
                    );
                } else if (i - l !== 1) {
                    rangeWithDots.push(<PaginationDotted key={'_dotted_' + i / 0.33}>...</PaginationDotted>);
                }
            }
            rangeWithDots.push(
                <PaginationButton key={'pag2_' + i + right} current={i === currentPage} path={'/directory?page=' + i.toString() + '#'}>
                    {i}
                </PaginationButton>
            );
            l = i;
        }

        return rangeWithDots;
    }

    render() {

        const {
            hasNextPage,
            pagesCount,
            currentPage,
        } = this.props.pageInfo;
        if (pagesCount < 2) {
            return null;
        }
        return (
            <PaginationWrapper justifyContent="flex-end" alignSelf="center" separator={4}>
                <PaginationButton
                    className="arrow left"
                    path={'/directory?page=' + (currentPage - 1).toString() + '#'}
                    disable={currentPage === 1}
                >
                    <XIcon icon="keyboard_arrow_left" />
                </PaginationButton>
                {this.PaginationFunc(pagesCount + 1, currentPage)}
                <PaginationButton
                    className="arrow right"
                    path={'/directory?page=' + (currentPage + 1).toString() + '#'}
                    disable={hasNextPage === false}
                >
                    <XIcon icon="keyboard_arrow_right" />
                </PaginationButton>
            </PaginationWrapper>
        );
    }
}