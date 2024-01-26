import NavLinkAdapter from 'src/@templehs/core/NavLinkAdapter';
import IconButton from '@mui/material/IconButton';
import { Outlet } from 'react-router-dom';
import TemplehsSvgIcon from '@templehs/core/TemplehsSvgIcon/TemplehsSvgIcon';

/**
 * The contacts sidebar content.
 */
function ContactsSidebarContent() {
	return (
		<div className="flex flex-col flex-auto max-w-full w-md">
			<IconButton
				className="absolute top-0 right-0 my-16 mx-32 z-10"
				sx={{ color: 'white' }}
				component={NavLinkAdapter}
				to="/apps/contacts"
				size="large"
			>
				<TemplehsSvgIcon>heroicons-outline:x</TemplehsSvgIcon>
			</IconButton>

			<Outlet />
		</div>
	);
}

export default ContactsSidebarContent;
