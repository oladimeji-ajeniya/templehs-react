import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import NavLinkAdapter from 'src/@templehs/core/NavLinkAdapter';
import ListItemButton from '@mui/material/ListItemButton';
import { ContactType } from './types/ContactType';
import TimeSlotSlider from './TimeSlotButton';
import Paper from '@mui/material/Paper';

type ContactListItemPropsType = {
	contact: ContactType;
};

/**
 * The contact list item.
 */
function ContactListItem(props: ContactListItemPropsType) {
	const { contact } = props;

	return (
		<>
			<Paper className="rounded-2xl shadow-ring mb-16 hover:bg-gray-100 pb-16">

				<ListItemButton
					className="px-32 py-16"
					sx={{ bgcolor: 'background.paper' }}
					component={NavLinkAdapter}
					to={`/doctors/${contact.id}`}
				>
					<ListItemAvatar>
						<Avatar
							alt={contact.name}
							src={contact.avatar}
						/>
					</ListItemAvatar>
					<ListItemText
						classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
						primary={contact.name}
						secondary={
							<Typography
								className="inline"
								component="span"
								variant="body2"
								color="text.secondary"
							>
								{contact.title}
								
							</Typography>
						}
					/>
				</ListItemButton>

				<Typography className="px-20 my-16 "component="div">
				{contact.notes && (
					<div className="flex">
						<div
							className="max-w-none ml-24 prose dark:prose-invert"
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{ __html: contact.notes }}
						/>
					</div>
				)}
				</Typography>

				<Typography className="px-20 ml-24 font-bold" component="div">
					Next Available Slots
				</Typography>

				<Typography className="p-20  ml-24" component="div">
					<TimeSlotSlider/>
				</Typography>


				<Typography className="px-20 ml-24 text-green-500" component="div">
					Check Full profile and availability
				</Typography>
			</Paper>
		</>
	);
}

export default ContactListItem;
