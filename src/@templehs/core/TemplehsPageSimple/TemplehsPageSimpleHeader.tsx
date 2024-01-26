import clsx from 'clsx';
import { ReactNode } from 'react';

/**
 * Props for the TemplehsPageSimpleHeader component.
 */
type TemplehsPageSimpleHeaderProps = {
	className?: string;
	header?: ReactNode;
};

/**
 * The TemplehsPageSimpleHeader component is a sub-component of the TemplehsPageSimple layout component.
 * It provides a header area for the layout.
 */
function TemplehsPageSimpleHeader(props: TemplehsPageSimpleHeaderProps) {
	const { header = null, className } = props;
	return (
		<div className={clsx('TemplehsPageSimple-header', className)}>
			<div className="container">{header}</div>
		</div>
	);
}

export default TemplehsPageSimpleHeader;
