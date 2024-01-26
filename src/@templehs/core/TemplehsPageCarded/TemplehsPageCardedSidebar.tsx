import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState, ReactNode } from 'react';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import TemplehsPageCardedSidebarContent from './TemplehsPageCardedSidebarContent';

/**
 * Props for the TemplehsPageCardedSidebar component.
 */
type TemplehsPageCardedSidebarProps = {
	open?: boolean;
	position?: SwipeableDrawerProps['anchor'];
	variant?: SwipeableDrawerProps['variant'];
	onClose?: () => void;
	children?: ReactNode;
};

/**
 * The TemplehsPageCardedSidebar component is a sidebar for the TemplehsPageCarded component.
 */
const TemplehsPageCardedSidebar = forwardRef<{ toggleSidebar: (T: boolean) => void }, TemplehsPageCardedSidebarProps>(
	(props, ref) => {
		const { open = true, position, variant, onClose = () => {} } = props;

		const [isOpen, setIsOpen] = useState(open);

		const handleToggleDrawer = useCallback((val: boolean) => {
			setIsOpen(val);
		}, []);

		useImperativeHandle(ref, () => ({
			toggleSidebar: handleToggleDrawer
		}));

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
							root: clsx('TemplehsPageCarded-sidebarWrapper', variant),
							paper: clsx(
								'TemplehsPageCarded-sidebar',
								variant,
								position === 'left' ? 'TemplehsPageCarded-leftSidebar' : 'TemplehsPageCarded-rightSidebar'
							)
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
						BackdropProps={{
							classes: {
								root: 'TemplehsPageCarded-backdrop'
							}
						}}
						style={{ position: 'absolute' }}
					>
						<TemplehsPageCardedSidebarContent {...props} />
					</SwipeableDrawer>
				</Hidden>
				{variant === 'permanent' && (
					<Hidden lgDown>
						<Drawer
							variant="permanent"
							anchor={position}
							className={clsx(
								'TemplehsPageCarded-sidebarWrapper',
								variant,
								isOpen ? 'opened' : 'closed',
								position === 'left' ? 'TemplehsPageCarded-leftSidebar' : 'TemplehsPageCarded-rightSidebar'
							)}
							open={isOpen}
							onClose={onClose}
							classes={{
								paper: clsx('TemplehsPageCarded-sidebar', variant)
							}}
						>
							<TemplehsPageCardedSidebarContent {...props} />
						</Drawer>
					</Hidden>
				)}
			</>
		);
	}
);

export default TemplehsPageCardedSidebar;
