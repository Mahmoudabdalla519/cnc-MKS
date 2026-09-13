import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in React tree:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 text-center font-['Cairo',sans-serif]">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-2xl">
              !
            </div>
            <h2 className="text-xl font-black text-white">حدث خطأ أثناء تحميل الصفحة</h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              يرجى إعادة تحميل الصفحة أو التأكد من إعدادات الاتصال.
            </p>
            {this.state.error && (
              <pre className="text-xs text-left bg-black/60 p-3 rounded-xl overflow-x-auto text-amber-300 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-sm transition-all"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
