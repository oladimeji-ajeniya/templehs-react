import { amber, blue, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { hideMessage, selectTemplehsMessageOptions, selectTemplehsMessageState } from 'src/app/store/templehs/messageSlice';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import TemplehsSvgIcon from '../TemplehsSvgIcon';

export type TemplehsMessageVariantType = 'success' | 'error' | 'warning' | 'info';

type StyledSnackbarProps = {
	variant?: TemplehsMessageVariantType;
};

const StyledSnackbar = styled(Snackbar)<StyledSnackbarProps>(({ theme, variant }) => ({
	'& .TemplehsMessage-content': {
		...(variant === 'success' && {
			backgroundColor: green[600],
			color: '#FFFFFF'
		}),

		...(variant === 'error' && {
			backgroundColor: theme.palette.error.dark,
			color: theme.palette.getContrastText(theme.palette.error.dark)
		}),

		...(variant === 'info' && {
			backgroundColor: blue[600],
			color: '#FFFFFF'
		}),

		...(variant === 'warning' && {
			backgroundColor: amber[600],
			color: '#FFFFFF'
		})
	}
}));

const variantIcon = {
	success: 'check_circle',
	warning: 'warning',
	error: 'error_outline',
	info: 'info'
};

/**
 * TemplehsMessage
 * The TemplehsMessage component holds a snackbar that is capable of displaying message with 4 different variant. It uses the @mui/material React packages to create the components.
 */
function TemplehsMessage() {
	const dispatch = useAppDispatch();
	const state = useAppSelector(selectTemplehsMessageState);
	const options = useAppSelector(selectTemplehsMessageOptions);

	return (
		<StyledSnackbar
			{...options}
			open={state}
			onClose={() => dispatch(hideMessage())}
		>
			<SnackbarContent
				className="TemplehsMessage-content"
				message={
					<div className="flex items-center">
						{variantIcon[options.variant] && (
							<TemplehsSvgIcon color="inherit">{variantIcon[options.variant]}</TemplehsSvgIcon>
						)}
						<Typography className="mx-8">{options.message}</Typography>
					</div>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={() => dispatch(hideMessage())}
						size="large"
					>
						<TemplehsSvgIcon>heroicons-outline:x</TemplehsSvgIcon>
					</IconButton>
				]}
			/>
		</StyledSnackbar>
	);
}

export default memo(TemplehsMessage);
