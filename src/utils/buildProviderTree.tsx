import React, { ReactNode } from 'react';

type ProviderType = React.ComponentType<any>; // Define a type for Provider that accepts any props

type ComponentWithProps = [ProviderType, any] | [ProviderType, null];

export const buildProviderTree = (componentsWithProps: ComponentWithProps[]) => {
  const initialComponent = ({ children }: { children: ReactNode }) => <>{children}</>
  return componentsWithProps.reduce((AccumulateComponent: any, [Provider, props = {}]: ComponentWithProps) => {
    return ({ children }: { children: ReactNode }) => {
      return (
        <AccumulateComponent>
          <Provider {...props}>
            {children}
          </Provider>
        </AccumulateComponent>
      )
    }
  }, initialComponent)
}
