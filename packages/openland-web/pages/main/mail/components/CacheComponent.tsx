import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { PerfCollectorContext } from 'openland-web/perf/PerfCollectorContext';
import { createPoliteContext, ContextStateInterface } from 'openland-x/createPoliteContext';
import { useCheckPerf } from 'openland-web/hooks/useCheckPerf';
import { css, cx } from 'linaria';

const displayNoneCommonClassName = css`
    height: 100%;
    display: flex;
    flex-grow: 1;
`;

const displayNoneClassName = css`
    display: none;
`;

type ShouldUpdateComponentT = {
    Component: any;
    componentProps: any;
    isActive: boolean;
};

const { Context, ContextState } = createPoliteContext({
    defaultValue: true,
});

export const IsActivePoliteContext = Context;
export const IsActiveContextState = ContextState;

const isActiveContextsMap = new Map<string, ContextStateInterface<boolean>>();

class ShouldUpdateComponent extends React.Component<ShouldUpdateComponentT> {
    shouldComponentUpdate(props: any) {
        return this.props.isActive !== props.isActive;
    }
    render() {
        return (
            <this.props.Component {...this.props.componentProps} isActive={this.props.isActive} />
        );
    }
}

const DisplayNone = React.memo(
    ({
        isActive,
        Component,
        componentProps,
    }: {
        isActive: boolean;
        Component: any;
        componentProps: any;
    }) => {
        useCheckPerf({
            name: 'DisplayNone',
            id: componentProps.id,
        });

        return (
            <div className={cx(displayNoneCommonClassName, !isActive && displayNoneClassName)}>
                <ShouldUpdateComponent
                    Component={Component}
                    componentProps={componentProps}
                    isActive={isActive}
                />
            </div>
        );
    },
);

const maybeRequestIdleCallback = (cb: Function) => {
    if (window && (window as any).requestIdleCallback) {
        (window as any).requestIdleCallback(cb);
    } else {
        cb();
    }
};

export const CacheComponent = React.memo(
    ({
        Component,
        activeChat,
        componentProps,
    }: {
        Component: any;
        isMobile: boolean;
        activeChat: string | null;
        componentProps: {
            id?: string | null;
        };
    }) => {
        const perfCollector = React.useContext(PerfCollectorContext);
        useCheckPerf({ name: 'CacheComponent' });
        let SIZE_OF_CACHE = 20;

        if (canUseDOM && (window as any).safari !== undefined) {
            SIZE_OF_CACHE = 10;
        }

        const [cachedPropsArray, setCachedProps] = React.useState<
            {
                chatId: string;
                componentProps: {
                    id?: string | null;
                };
            }[]
        >([]);

        React.useEffect(() => {
            perfCollector.setCachedChatsIds(
                cachedPropsArray.map(({ chatId }: { chatId: string }) => {
                    return chatId;
                }),
            );
        }, [cachedPropsArray]);

        const setCachedPropsProc = (
            componentPropsToCache: {
                chatId: string;
                componentProps: {
                    id?: string | null;
                };
            }[],
        ) => {
            setCachedProps(componentPropsToCache);
        };

        if (activeChat) {
            if (cachedPropsArray.filter(({ chatId }) => chatId === activeChat).length === 0) {
                setCachedPropsProc([...cachedPropsArray, { chatId: activeChat, componentProps }]);
            }
        }

        React.useEffect(() => {
            if (activeChat) {
                if (
                    cachedPropsArray.length > SIZE_OF_CACHE &&
                    cachedPropsArray[0].chatId !== activeChat
                ) {
                    if (
                        cachedPropsArray.length - 1 > SIZE_OF_CACHE &&
                        cachedPropsArray[0].chatId !== activeChat &&
                        cachedPropsArray[1].chatId !== activeChat
                    ) {
                        maybeRequestIdleCallback(() => {
                            setCachedPropsProc(cachedPropsArray.slice(2));
                        });
                    } else {
                        maybeRequestIdleCallback(() => {
                            setCachedPropsProc(cachedPropsArray.slice(1));
                        });
                    }
                }
            }
        }, [activeChat]);

        // if (true) {
        //     return (
        //         <IsActiveContext.Provider value={true}>
        //             {activeChat && <Component {...componentProps} isActive={true} />}{' '}
        //         </IsActiveContext.Provider>
        //     );
        // }

        const renderedElements = [];

        for (let i = 0; i < cachedPropsArray.length; i++) {
            const cached = cachedPropsArray[i];

            let isActiveState = isActiveContextsMap.get(cached.chatId);
            if (!isActiveState) {
                isActiveState = new IsActiveContextState(false);
                isActiveContextsMap.set(cached.chatId, isActiveState);
            }
            isActiveState.setValue(activeChat !== null && activeChat === cached.chatId);

            renderedElements.push(
                <IsActivePoliteContext.Provider key={cached.chatId} value={isActiveState}>
                    <DisplayNone
                        isActive={activeChat !== null && activeChat === cached.chatId}
                        Component={Component}
                        componentProps={cached.componentProps}
                    />
                </IsActivePoliteContext.Provider>,
            );
        }

        return <>{renderedElements}</>;
    },
);
