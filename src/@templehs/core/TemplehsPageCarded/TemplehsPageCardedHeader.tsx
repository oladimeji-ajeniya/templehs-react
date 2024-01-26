import clsx from 'clsx';
import { ReactNode } from 'react';

/**
 * Props for the TemplehsPageCardedHeader component.
 */
type TemplehsPageCardedHeaderProps = {
	header?: ReactNode;
};

/**
 * The TemplehsPageCardedHeader component is a header for the TemplehsPageCarded component.
 */
function TemplehsPageCardedHeader(props: TemplehsPageCardedHeaderProps) {
	const { header = null } = props;

	return <div className={clsx('TemplehsPageCarded-header', 'container')}>{header}</div>;
}

export default TemplehsPageCardedHeader;
