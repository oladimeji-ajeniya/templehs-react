import { TemplehsRouteConfigsType } from 'src/@templehs/utils/TemplehsUtils';
import ContactsAppConfig from './doctor/ContactsAppConfig';
import CalendarAppConfig from './calendar/CalendarAppConfig';


const appsConfigs: TemplehsRouteConfigsType = [
	CalendarAppConfig,
	ContactsAppConfig,
];

export default appsConfigs;
