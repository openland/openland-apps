import * as React from 'react';
import uuid from 'uuid';
import { useLayout } from './LayoutContext';
import { XView } from 'react-mental';

export interface UnicornPage {
    key: string;
    component: any;
}

export class UnicornController {
    pages: UnicornPage[] = [];
    private _listeners: ((pages: UnicornPage[]) => void)[] = [];

    push = (component: any) => {
        this.pages.push({ component, key: uuid() });
        for (let l of this._listeners) {
            l(this.pages);
        }
    }

    pop = () => {
        if (this.pages.length > 0) {
            this.pages.splice(this.pages.length - 1, 1);
        }
        for (let l of this._listeners) {
            l(this.pages);
        }
    }

    addListener = (handler: (pages: UnicornPage[]) => void) => {
        this._listeners.push(handler);
        return () => {
            this._listeners.splice(this._listeners.indexOf(handler), 1);
        }
    }
}

const UnicornContext = React.createContext<UnicornController>(undefined as any);

const UnicornContainer = (props: { root: any, controller: UnicornController }) => {
    let layout = useLayout();
    let [pages, setPages] = React.useState<UnicornPage[]>([]);
    React.useEffect(() => {
        return props.controller.addListener((p) => setPages([...p]));
    }, []);
    if (layout === 'mobile') {
        return (
            <XView width="100%" height="100%" position="relative">
                <XView left={0} top={0} right={0} bottom={50} position="absolute">
                    <XView width="100%" height="100%" position="relative" alignItems="flex-start">
                        {props.root}
                    </XView>
                </XView>
                {pages.map((v) => (
                    <XView left={0} top={0} right={0} bottom={0} position="absolute" key={v.key}>
                        <XView width="100%" height="100%" position="relative" alignItems="flex-start" backgroundColor="white">
                            {v.component}
                        </XView>
                    </XView>
                ))}
            </XView>
        )
    } else {
        return (
            <XView width="100%" height="100%" flexDirection="row" paddingLeft={50}>
                <XView maxWidth={370} flexShrink={1} flexGrow={1} height="100%" flexDirection="column">
                    {props.root}
                </XView>
                <XView width={0} flexGrow={1} minWidth={500} height="100%" flexDirection="column" backgroundColor="purple" position="relative">
                    {pages.map((v) => (
                        <XView left={0} top={0} right={0} bottom={0} position="absolute" key={v.key} backgroundColor="white">
                            <XView width="100%" height="100%" position="relative" alignItems="flex-start">
                                {v.component}
                            </XView>
                        </XView>
                    ))}
                </XView>
            </XView>
        )
    }
};

export const UnicornProvider = (props: { root: any }) => {
    let controller = React.useMemo(() => new UnicornController(), []);
    return (
        <UnicornContext.Provider value={controller}>
            <UnicornContainer root={props.root} controller={controller} />
        </UnicornContext.Provider>
    );
}
export const useController = () => React.useContext(UnicornContext);