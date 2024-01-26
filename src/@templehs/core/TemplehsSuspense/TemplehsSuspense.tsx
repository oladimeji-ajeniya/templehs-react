import TemplehsLoading from 'src/@templehs/core/TemplehsLoading';
import { ReactNode, Suspense } from 'react';
import { TemplehsLoadingProps } from 'src/@templehs/core/TemplehsLoading/TemplehsLoading';

type TemplehsSuspenseProps = {
	loadingProps?: TemplehsLoadingProps;
	children: ReactNode;
};

/**
 * The TemplehsSuspense component is a wrapper around the React Suspense component.
 * It is used to display a loading spinner while the wrapped components are being loaded.
 * The component is memoized to prevent unnecessary re-renders.
 * React Suspense defaults
 * For to Avoid Repetition
 */
function TemplehsSuspense(props: TemplehsSuspenseProps) {
	const { children, loadingProps } = props;
	return <Suspense fallback={<TemplehsLoading {...loadingProps} />}>{children}</Suspense>;
}

export default TemplehsSuspense;
