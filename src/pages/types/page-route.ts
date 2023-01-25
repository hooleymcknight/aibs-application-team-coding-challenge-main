import React from 'react';

// In general PageRoute components are not passed props
// FatalErrorPage component passes FallBackProps from react-error-boundary
export type PageRoute = (props: any) => React.ReactElement;
