import * as React from 'react';

type ReturnedTuple = [string, () => void];

export const useReloadImage = (): ReturnedTuple => {
    const [errorsCount, setErrorsCount] = React.useState(0);
    let timeoutId: any;

    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const handleImageError = () => {
        timeoutId = setTimeout(() => { setErrorsCount(prevCount => prevCount + 1); }, 3000);
    };

    return [`loading-errors-${errorsCount}`, handleImageError];
};

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;
type Ref = React.RefObject<HTMLImageElement>;

export const ImgWithRetry = React.memo(React.forwardRef((props: ImgProps, ref: Ref) => {
    const [key, onError] = useReloadImage();
    const handleError = React.useCallback((e) => {
        onError();
        if (props.onError) {
            props.onError(e);
        }
    }, []);

    return <img ref={ref} key={key} {...props} onError={handleError} />;
}));
