import * as React from 'react';

export const RefContext = React.createContext({});

export const withRefComponent = (Component: any) => {
  return (props: any) => (
    <RefContext.Consumer>
      {({ editRef }: any) => <Component ref={editRef} {...props} />}
    </RefContext.Consumer>
  );
};

export const ForwardRefProvider = (Component: any) => {
  return React.forwardRef((props: any, forwardRef: any) => {
    return (
      <RefContext.Provider value={{ editRef: forwardRef }}>
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
