import TemplehsSvgIcon from "@templehs/core/TemplehsSvgIcon/TemplehsSvgIcon";

type NotificationIconProps = {
	value?: string;
};

/**
 * The notification icon.
 */
function NotificationIcon(props: NotificationIconProps) {
	const { value } = props;

	switch (value) {
		case 'error': {
			return (
				<TemplehsSvgIcon
					className="mr-8 opacity-75"
					color="inherit"
				>
					heroicons-outline:minus-circle
				</TemplehsSvgIcon>
			);
		}
		case 'success': {
			return (
				<TemplehsSvgIcon
					className="mr-8 opacity-75"
					color="inherit"
				>
					heroicons-outline:check-circle
				</TemplehsSvgIcon>
			);
		}
		case 'warning': {
			return (
				<TemplehsSvgIcon
					className="mr-8 opacity-75"
					color="inherit"
				>
					heroicons-outline:exclamation-circle
				</TemplehsSvgIcon>
			);
		}
		case 'info': {
			return (
				<TemplehsSvgIcon
					className="mr-8 opacity-75"
					color="inherit"
				>
					heroicons-outline:information-circle
				</TemplehsSvgIcon>
			);
		}
		default: {
			return null;
		}
	}
}

export default NotificationIcon;
