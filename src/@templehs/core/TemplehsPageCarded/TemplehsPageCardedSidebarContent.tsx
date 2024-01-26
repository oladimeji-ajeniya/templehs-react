import TemplehsScrollbars from 'src/@templehs/core/TemplehsScrollbars';
import { ReactNode } from 'react';

/**
 * Props for the TemplehsPageCardedSidebarContent component.
 */
type TemplehsPageCardedSidebarContentProps = {
	innerScroll?: boolean;
	children?: ReactNode;
};

/**
 * The TemplehsPageCardedSidebarContent component is a content container for the TemplehsPageCardedSidebar component.
 */
function TemplehsPageCardedSidebarContent(props: TemplehsPageCardedSidebarContentProps) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<TemplehsScrollbars enable={innerScroll}>
			<div className="TemplehsPageCarded-sidebarContent">{children}</div>
		</TemplehsScrollbars>
	);
}

export default TemplehsPageCardedSidebarContent;
