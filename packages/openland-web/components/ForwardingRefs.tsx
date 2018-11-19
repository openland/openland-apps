import * as React from 'react';

export const RefContext = React.createContext({});

export const withRefComponent = (Component: any) => {
  return (props: any) => (
    <RefContext.Consumer>
      {({ ref }: any) => <Component ref={ref} {...props} />}
    </RefContext.Consumer>
  );
};

export const ForwardRefProvider = (Component: any) => {
  return React.forwardRef((props: any, forwardRef: any) => {
    return (
      <RefContext.Provider value={{ ref: forwardRef }}>
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
