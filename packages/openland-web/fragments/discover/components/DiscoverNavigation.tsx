import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { SearchBox } from 'openland-web/fragments/discover/components/SearchBox';
import { SortPicker } from 'openland-web/fragments/discover/components/sortPicker';
import { XLoader } from 'openland-x/XLoader';
import { TextLabel1 } from 'openland-web/utils/TextStyles';

const subContainer = css`
    display: flex;
    flex-direction: row;
    align-self: center;
    justify-content: space-between;
    flex-shrink: 1;
    flex-grow: 1;
    padding: 12px 16px 16px;
    width: 100%;
`;

const subTitle = css`
    display: flex;
    align-items: center;
    color: var(--foregroundPrimary);
    flex-grow: 1;
    flex-shrink: 1;
`;

const subCounter = css`
    color: var(--foregroundSecondary);
    margin-left: 5px;
`;

interface SubHeaderProps {
    title: string;
    counter?: number;
    right?: any;
}

const SubHeader = (props: SubHeaderProps) => {
    return (
        <div className={subContainer}>
            <div className={cx(subTitle, TextLabel1)}>
                {props.title}
                {props.counter && <div className={cx(subCounter, TextLabel1)}>{props.counter}</div>}
            </div>
            {props.right && props.right}
        </div>
    );
};

export const SearchCardsOrShowProfile = React.memo(
    ({
        id,
        onlyFeatured,
        searchPlaceholder,
        noQueryText,
        hasQueryText,
        CardsComponent,
        ProfileComponent,
        sortOptions,
        defaultSortOption,
        withoutFeatured,
        page,
        withoutSort,
    }: {
        id?: string | null;
        onlyFeatured?: boolean;
        searchPlaceholder: string;
        noQueryText: string;
        hasQueryText: string;
        CardsComponent: any;
        ProfileComponent?: any;
        sortOptions?: {
            label: string;
            values: { label: string; value: string }[];
        };
        defaultSortOption?: string;
        withoutFeatured?: boolean;
        page?: number;
        withoutSort?: boolean;
    }) => {
        const [itemCount, setItemCount] = React.useState(0);
        const [query, setQuery] = React.useState('');
        const [sort, setSort] = React.useState({
            orderBy: defaultSortOption || 'createdAt',
            featured: true,
        });

        const tagsCount = React.useCallback(
            (n: number) => {
                if (itemCount !== n) {
                    setItemCount(n);
                }
            },
            [itemCount],
        );

        return (
            <>
                {!id && (
                    <XView height="100%">
                        <SearchBox
                            value={query}
                            onChange={setQuery}
                            placeholder={searchPlaceholder}
                        />
                        {query.length <= 0 && (
                            <SubHeader
                                title={noQueryText}
                                right={
                                    !withoutSort && (
                                        <SortPicker
                                            sort={sort}
                                            onPick={setSort}
                                            withoutFeatured={withoutFeatured}
                                            options={sortOptions}
                                        />
                                    )
                                }
                            />
                        )}
                        {query.length > 0 && itemCount > 0 && (
                            <SubHeader
                                title={hasQueryText}
                                counter={itemCount}
                                right={
                                    !withoutSort && (
                                        <SortPicker
                                            sort={sort}
                                            onPick={setSort}
                                            withoutFeatured={withoutFeatured}
                                            options={sortOptions}
                                        />
                                    )
                                }
                            />
                        )}
                        <CardsComponent
                            onlyFeatured={onlyFeatured}
                            featuredFirst={sort.featured}
                            orderBy={sort.orderBy}
                            tagsCount={tagsCount}
                            notFoundText={query}
                            variables={{
                                query,
                                page,
                            }}
                        />
                    </XView>
                )}

                {id && ProfileComponent && <ProfileComponent id={id} />}
            </>
        );
    },
);

export const ComponentWithSort = ({
    Component,
    queryToPrefix,
    noSort,
}: {
    Component: any;
    queryToPrefix?: boolean;
    noSort?: boolean;
}) => ({
    onlyFeatured,
    featuredFirst,
    orderBy,
    variables,
    tagsCount,
    customMenu,
    notFoundText,
    CustomButtonComponent,
}: {
    onlyFeatured?: boolean;
    featuredFirst: boolean;
    orderBy: string;
    variables: {
        query: string;
        page?: string;
    };
    tagsCount: Function;
    customMenu: any;
    notFoundText: string;
    CustomButtonComponent: any;
}) => {
    const finalQuery = variables.query
        ? variables.query
        : onlyFeatured
        ? JSON.stringify({ featured: 'true' })
        : variables.query;

    const finalVariables = {
        ...(queryToPrefix
            ? {
                  prefix: variables.query,
                  query: !variables.query && onlyFeatured ? finalQuery : undefined,
              }
            : {
                  query: finalQuery,
              }),
        sort: noSort
            ? ''
            : JSON.stringify([
                  ...(featuredFirst ? [{ ['featured']: { order: 'desc' } } as any] : []),
                  { [orderBy]: { order: 'desc' } },
              ]),
        ...(variables.page ? { page: variables.page } : {}),
    };

    return (
        <React.Suspense
            fallback={
                <XView flexGrow={1} flexShrink={0}>
                    <XLoader loading={true} />
                </XView>
            }
        >
            <Component
                tagsCount={tagsCount}
                variables={finalVariables}
                customMenu={customMenu}
                CustomButtonComponent={CustomButtonComponent}
                notFoundText={notFoundText}
            />
        </React.Suspense>
    );
};
