import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback !== undefined ? this.props.fallback : (
        <div className="flex items-center justify-center w-full h-full min-h-[400px] bg-secondary/20 text-muted-foreground p-8 text-center">
          <p>Failed to load 3D scene. Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
