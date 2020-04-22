import * as React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { ZAnimatedView } from './ZAnimatedView';

export const ZLoaderContext = React.createContext<() => () => void>(() => () => { /* */ });

export const ZLoaderEnabler = React.memo(() => {
    let ctx = React.useContext(ZLoaderContext);
    React.useEffect(ctx, []);
    return null;
});

export const ZLoaderContaienr = React.memo((props: { loaderStyle?: StyleProp<ViewStyle>, children?: any }) => {
    const [loadersCount, setLoaders] = React.useState(0);
    const callback = React.useMemo(() => {
        return () => {
            let locked = true;
            setLoaders((s) => s + 1);
            return () => {
                if (locked) {
                    locked = false;
                    setLoaders((s) => s - 1);
                }
            };
        };
    }, []);

    return (
        <ZLoaderContext.Provider value={callback}>
            {props.children}
            <ZAnimatedView
                style={[{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }, props.loaderStyle]}
                opactiy={loadersCount > 0 ? 1 : 0}
                pointerEvents={loadersCount > 0 ? 'none' : 'box-none'}
            >
                <LoaderSpinner />
            </ZAnimatedView>
        </ZLoaderContext.Provider>
    );
});