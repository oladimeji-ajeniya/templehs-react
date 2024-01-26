import Input from '@mui/material/Input';
import { motion } from 'framer-motion';
import TemplehsSvgIcon from 'src/@templehs/core/TemplehsSvgIcon';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { ChangeEvent } from 'react';
import { selectSearchText, setContactsSearchText } from './store/contactsSlice';

/**
 * The contacts header.
 */
function ContactsHeader() {
	const dispatch = useAppDispatch();
	const searchText = useAppSelector(selectSearchText);

	return (
		<div className="p-24 sm:p-32 w-full">
			
			<div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center mt-16 -mx-8">
				<Box
					component={motion.div}
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
					className="flex flex-1 w-full sm:w-auto items-center px-16 mx-8 border-1 rounded-full"
				>
					<Input
						placeholder="Select date"
						className="flex flex-1 px-16"
						disableUnderline
						fullWidth
						value={searchText}
						inputProps={{
							'aria-label': 'Search'
						}}
						onChange={(ev: ChangeEvent<HTMLInputElement>) => dispatch(setContactsSearchText(ev))}
					/>

					<TemplehsSvgIcon
						color="action"
						size={20}
					>
						heroicons-outline:calendar
					</TemplehsSvgIcon>
					
				</Box>

				<Box
					component={motion.div}
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
					className="flex flex-1 w-full sm:w-auto items-center px-16 mx-8 border-1 rounded-full"
				>
					<Input
						placeholder="Select time range"
						className="flex flex-1 px-16"
						disableUnderline
						fullWidth
						value={searchText}
						inputProps={{
							'aria-label': 'Search'
						}}
						onChange={(ev: ChangeEvent<HTMLInputElement>) => dispatch(setContactsSearchText(ev))}
					/>

					<TemplehsSvgIcon
						color="action"
						size={20}
					>
						heroicons-outline:clock
					</TemplehsSvgIcon>
					
				</Box>

				<Box
					component={motion.div}
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
					className="flex flex-1 w-full sm:w-auto items-center px-16 mx-8 border-1 rounded-full"
				>
					

					<Input
						placeholder="Select expertise"
						className="flex flex-1 px-16"
						disableUnderline
						fullWidth
						value={searchText}
						inputProps={{
							'aria-label': 'Search'
						}}
						onChange={(ev: ChangeEvent<HTMLInputElement>) => dispatch(setContactsSearchText(ev))}
					/>

					<TemplehsSvgIcon
						color="action"
						size={20}
					>
						heroicons-outline:search
					</TemplehsSvgIcon>
					
				</Box>
				{/* <Button
					className="mx-8"
					variant="contained"
					color="secondary"
					component={NavLinkAdapter}
					to="new/edit"
				>
					<TemplehsSvgIcon size={20}>heroicons-outline:plus</TemplehsSvgIcon>
					<span className="mx-8">Add</span>
				</Button> */}
			</div>

			
		</div>
	);
}

export default ContactsHeader;
