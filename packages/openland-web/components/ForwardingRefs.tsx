import * as React from 'react';

export const RefContext = React.createContext({});

export const ForwardRefProvider = (Component: any) => {
  return React.forwardRef((props: any, innerRef: any) => {
    return (
      <RefContext.Provider value={{ ref: innerRef }}>
        <Component {...props} />
      </RefContext.Provider>
    );
  });
};

export const ForwardRefProviderComponent = ForwardRefProvider(
  class extends React.Component<any> {
    render() {
      return <>{this.props.children}</>;
    }
  }
);
