import _ from '@lodash';
import TemplehsUtils from 'src/@templehs/utils';
import NotificationModel, {
	NotificationModelType
} from 'src/app/theme-layouts/shared-components/notificationPanel/models/NotificationModel';
import mockApi from '../mock-api.json';
import mock from '../mock';
import { Params } from '../ExtendedMockAdapter';

let notificationsDB: NotificationModelType[] = mockApi.components.examples.notifications.value;

mock.onGet('/api/notifications').reply(() => [200, notificationsDB]);

mock.onDelete('/api/notifications').reply(() => {
	notificationsDB = [];
	return [200];
});

mock.onPost('/api/notifications').reply(({ data }) => {
	const newNotification = NotificationModel({
		id: TemplehsUtils.generateGUID(),
		...JSON.parse(data as string)
	} as NotificationModelType);

	notificationsDB.push(newNotification);

	return [200, newNotification];
});

mock.onDelete('/api/notifications/:id').reply((config) => {
	const { id } = config.params as Params;

	_.remove(notificationsDB, { id });

	return [200, id];
});
