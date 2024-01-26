import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import TemplehsPageSimpleSidebarContent from './TemplehsPageSimpleSidebarContent';

/**
 * Props for the TemplehsPageSimpleSidebar component.
 */
type TemplehsPageSimpleSidebarProps = {
	open?: boolean;
	position?: SwipeableDrawerProps['anchor'];
	variant?: SwipeableDrawerProps['variant'];
	onClose?: () => void;
	children?: ReactNode;
};

/**
 * The TemplehsPageSimpleSidebar component.
 */
const TemplehsPageSimpleSidebar = forwardRef<{ toggleSidebar: (T: boolean) => void }, TemplehsPageSimpleSidebarProps>(
	(props, ref) => {
		const { open = true, position, variant, onClose = () => {} } = props;

		const [isOpen, setIsOpen] = useState(open);

		useImperativeHandle(ref, () => ({
			toggleSidebar: handleToggleDrawer
		}));

		const handleToggleDrawer = useCallback((val: boolean) => {
			setIsOpen(val);
		}, []);

		useEffect(() => {
			handleToggleDrawer(open);
		}, [handleToggleDrawer, open]);

		return (
			<>
				<Hidden lgUp={variant === 'permanent'}>
					<SwipeableDrawer
						variant="temporary"
						anchor={position}
						open={isOpen}
						onOpen={() => {}}
						onClose={() => onClose()}
						disableSwipeToOpen
						classes={{
							root: clsx('TemplehsPageSimple-sidebarWrapper', variant),
							paper: clsx(
								'TemplehsPageSimple-sidebar',
								variant,
								position === 'left' ? 'TemplehsPageSimple-leftSidebar' : 'TemplehsPageSimple-rightSidebar'
							)
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
						// container={rootRef.current}
						BackdropProps={{
							classes: {
								root: 'TemplehsPageSimple-backdrop'
							}
						}}
						style={{ position: 'absolute' }}
					>
						<TemplehsPageSimpleSidebarContent {...props} />
					</SwipeableDrawer>
				</Hidden>

				{variant === 'permanent' && (
					<Hidden lgDown>
						<Drawer
							variant="permanent"
							anchor={position}
							className={clsx(
								'TemplehsPageSimple-sidebarWrapper',
								variant,
								isOpen ? 'opened' : 'closed',
								position === 'left' ? 'TemplehsPageSimple-leftSidebar' : 'TemplehsPageSimple-rightSidebar'
							)}
							open={isOpen}
							onClose={onClose}
							classes={{
								paper: clsx('TemplehsPageSimple-sidebar border-0', variant)
							}}
						>
							<TemplehsPageSimpleSidebarContent {...props} />
						</Drawer>
					</Hidden>
				)}
			</>
		);
	}
);

export default TemplehsPageSimpleSidebar;
