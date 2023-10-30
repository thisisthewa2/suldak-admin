import React from 'react';

interface ErrorBoundaryProps {
  type: 'global' | 'api' | 'component';
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/** 에러 핸들링 컴포넌트 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // 초기 상태
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  // 에러 발생시 업데이트
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  // 에러 정보를 캡처하고 상태를 업데이트
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  render(): React.ReactNode {
    // 에러가 있을 경우
    if (this.state.hasError) {
      const { type } = this.props;

      // 발생한 에러의 타입에 따라 다른 메시지 렌더링
      switch (type) {
        case 'global':
          return <h1>Something went wrong. Please refresh the page.</h1>;
        case 'api':
          return <h1>Failed to fetch data. Please try again later.</h1>;
        case 'component':
          return <h1>Component failed to render.</h1>;
        default:
          return <h1>Unknown error occurred.</h1>;
      }
    }

    // 에러가 없을 경우
    return this.props.children;
  }
}

export default ErrorBoundary;
