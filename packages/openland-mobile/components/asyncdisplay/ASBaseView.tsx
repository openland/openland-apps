import * as React from 'react';

export function createASView<T>(name: string, preprocessor?: (src: T) => any): React.ComponentType<T> {
    class ASView extends React.PureComponent<T> {
        static __ISASVIEW = true;
        static asName = name;
        static asPreprocessor = preprocessor;
        static displayName = 'AS' + name.substring(0, 1).toUpperCase + name.substring(1);
        render() {
            return <>{this.props.children}</>;
        }
    }

    return ASView;
}