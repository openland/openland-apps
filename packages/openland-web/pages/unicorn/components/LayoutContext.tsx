import * as React from 'react';

export const LayoutContext = React.createContext<'mobile' | 'desktop'>('desktop');

export const LayoutProvider = (props: { children?: any }) => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 750);
    React.useEffect(() => {
        let prev = window.innerWidth <= 750;
        console.log('inited with mobile: ' + prev);
        const handleResize = () => {
            let n = window.innerWidth <= 750;
            if (prev !== n) {
                prev = n;
                console.log('updated with mobile: ' + prev);
                setIsMobile(n);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    if (isMobile) {
        return (<LayoutContext.Provider value="mobile">{props.children}</LayoutContext.Provider>);
    } else {
        return (<LayoutContext.Provider value="desktop">{props.children}</LayoutContext.Provider>);
    }
}