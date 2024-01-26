import _ from '@lodash';
import TemplehsUtils from 'src/@templehs/utils';
import { ReactNode } from 'react';

/**
 * The type of the NotificationModel.
 */
export type NotificationModelType = {
	id?: string;
	icon?: string;
	title?: string;
	description?: string;
	time?: string;
	read?: boolean;
	variant?: string;
	useRouter?: boolean;
	link?: string;
	image?: string;
	children?: ReactNode;
};

/**
 * The NotificationModel class.
 * Implements NotificationModelProps interface.
 */
function NotificationModel(data: NotificationModelType): NotificationModelType {
	data = data || {};

	return _.defaults(data, {
		id: TemplehsUtils.generateGUID(),
		icon: 'heroicons-solid:star',
		title: '',
		description: '',
		time: new Date().toISOString(),
		read: false,
		variant: 'default'
	}) as NotificationModelType;
}

export default NotificationModel;
