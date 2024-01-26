import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/app/store';
import { ReactNode } from 'react';
import withReducer from 'src/app/store/withReducer';
import { selectNotifications } from './store/dataSlice';
import { toggleNotificationPanel } from './store/stateSlice';
import reducer from './store';
import TemplehsSvgIcon from '@templehs/core/TemplehsSvgIcon/TemplehsSvgIcon';

type NotificationPanelToggleButtonProps = {
	children?: ReactNode;
};

/**
 * The notification panel toggle button.
 */
function NotificationPanelToggleButton(props: NotificationPanelToggleButtonProps) {
	const { children = <TemplehsSvgIcon>heroicons-outline:bell</TemplehsSvgIcon> } = props;

	const notifications = useSelector(selectNotifications);

	const dispatch = useAppDispatch();

	return (
		<IconButton
			className="h-40 w-40"
			onClick={() => dispatch(toggleNotificationPanel())}
			size="large"
		>
			<Badge
				color="secondary"
				variant="dot"
				invisible={notifications.length === 0}
			>
				{children}
			</Badge>
		</IconButton>
	);
}

export default withReducer('notificationPanel', reducer)(NotificationPanelToggleButton);
