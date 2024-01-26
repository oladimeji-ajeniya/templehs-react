import { ReactNode } from 'react';
import TemplehsScrollbars from '../TemplehsScrollbars/TemplehsScrollbars';

/**
 * Props for the TemplehsPageSimpleSidebarContent component.
 */
type TemplehsPageSimpleSidebarContentProps = {
	innerScroll?: boolean;
	children?: ReactNode;
};

/**
 * The TemplehsPageSimpleSidebarContent component is a content container for the TemplehsPageSimpleSidebar component.
 */
function TemplehsPageSimpleSidebarContent(props: TemplehsPageSimpleSidebarContentProps) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<TemplehsScrollbars enable={innerScroll}>
			<div className="TemplehsPageSimple-sidebarContent">{children}</div>
		</TemplehsScrollbars>
	);
}

export default TemplehsPageSimpleSidebarContent;
