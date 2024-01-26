import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { selectMainTheme } from 'src/app/store/templehs/settingsSlice';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import TemplehsSvgIcon from 'src/@templehs/core/TemplehsSvgIcon';
import FullCalendar from '@fullcalendar/react';
import { DatesSetArg } from '@fullcalendar/core';
import { MutableRefObject } from 'react';
import { openNewEventDialog } from './store/eventsSlice';

type CalendarHeaderProps = {
	calendarRef: MutableRefObject<FullCalendar | null>;
	currentDate: DatesSetArg;
	onToggleLeftSidebar: () => void;
};

/**
 * The calendar header.
 */
function CalendarHeader(props: CalendarHeaderProps) {
	const { calendarRef, currentDate, onToggleLeftSidebar } = props;

	const mainTheme = useAppSelector(selectMainTheme);
	const calendarApi = () => calendarRef.current.getApi();
	const dispatch = useAppDispatch();

	return (
		<div className="flex flex-col md:flex-row w-full p-12 justify-between z-10 container">
			<div className="flex flex-col sm:flex-row items-center">
				<div className="flex items-center">
					<Typography className="text-2xl font-semibold tracking-tight whitespace-nowrap mx-16">
						{currentDate?.view.title}
					</Typography>
				</div>

				<div className="flex items-center">
					<Tooltip title="Previous">
						<IconButton
							aria-label="Previous"
							onClick={() => calendarApi().prev()}
						>
							<TemplehsSvgIcon size={20}>
								{mainTheme.direction === 'ltr'
									? 'heroicons-solid:chevron-left'
									: 'heroicons-solid:chevron-right'}
							</TemplehsSvgIcon>
						</IconButton>
					</Tooltip>
					<Tooltip title="Next">
						<IconButton
							aria-label="Next"
							onClick={() => calendarApi().next()}
						>
							<TemplehsSvgIcon size={20}>
								{mainTheme.direction === 'ltr'
									? 'heroicons-solid:chevron-right'
									: 'heroicons-solid:chevron-left'}
							</TemplehsSvgIcon>
						</IconButton>
					</Tooltip>

					<Tooltip title="Today">
						<div>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1, transition: { delay: 0.3 } }}
							>
								<IconButton
									aria-label="today"
									onClick={() => calendarApi().today()}
									size="large"
								>
									<TemplehsSvgIcon>heroicons-outline:calendar</TemplehsSvgIcon>
								</IconButton>
							</motion.div>
						</div>
					</Tooltip>
				</div>
			</div>

			<motion.div
				className="flex items-center justify-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.7 } }}
			>

				<Button 
				variant="contained" 
				color="success"
				onClick={(ev) =>
					dispatch(
						openNewEventDialog({
							jsEvent: ev.nativeEvent,
							start: new Date(),
							end: new Date()
						})
					)
				}>
				<TemplehsSvgIcon className="mr-4">heroicons-outline:plus</TemplehsSvgIcon>
				Schedule appointment
				</Button>

			</motion.div>
		</div>
	);
}

export default CalendarHeader;
