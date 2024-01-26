import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
	'& > .logo-icon': {
		transition: theme.transitions.create(['width', 'height'], {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	}
}));

/**
 * The logo component.
 */
function Logo() {
	return (
		<Root className="flex items-center">
			<img
				className="logo-icon h-80 w-80"
				src="assets/images/logo/logo.svg"
				alt="logo"
			/>
		</Root>
	);
}

export default Logo;
