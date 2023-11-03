import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/** 에러 핸들링 컴포넌트 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  // 에러가 발생하면 이 생명주기 메서드가 호출, 에러 상태를 업데이트
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // 에러 정보를 콘솔에 출력하거나 추가적인 에러 처리
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // console.error('Caught error:', error, errorInfo);
    // console.log('dfdfd');
  }

  render(): ReactNode {
    // 에러가 발생하면 에러 메시지를 보여준다
    if (this.state.hasError) {
      // TODO return 부분에 오류 발생 컴포넌트로 변경 필요
      return <div>오류가 발생했습니다. 나중에 다시 시도해주세요.</div>;
    }

    // 에러가 발생하지 않았다면 자식 컴포넌트들이 정상적으로 렌더링
    return this.props.children;
  }
}

export default ErrorBoundary;
