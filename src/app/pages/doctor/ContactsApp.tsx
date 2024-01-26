import TemplehsPageSimple from 'src/@templehs/core/TemplehsPageSimple';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from 'src/@templehs/hooks';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from 'src/@templehs/hooks/useThemeMediaQuery';
import { useAppDispatch } from 'src/app/store';
import ContactsSidebarContent from './ContactsSidebarContent';
import { getTags } from './store/tagsSlice';
import { getCountries } from './store/countriesSlice';
import { getContacts } from './store/contactsSlice';
import ContactsBody from './ContactBody';

const Root = styled(TemplehsPageSimple)(({ theme }) => ({
	'& .TemplehsPageSimple-header': {
		backgroundColor: theme.palette.background.paper
	}
}));

/**
 * The ContactsApp page.
 */
function ContactsApp() {
	const dispatch = useAppDispatch();
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	useDeepCompareEffect(() => {
		dispatch(getContacts());
		dispatch(getCountries());
		dispatch(getTags());
	}, [dispatch]);

	useEffect(() => {
		setRightSidebarOpen(Boolean(routeParams.id));
	}, [routeParams]);

	return (
		<Root
			// header={<ContactsHeader />}
			content={<ContactsBody />}
			ref={pageLayout}
			rightSidebarContent={<ContactsSidebarContent />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => setRightSidebarOpen(false)}
			rightSidebarWidth={640}
			rightSidebarVariant="temporary"
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default ContactsApp;
