import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { TemplehsNavItemType } from '../types/TemplehsNavItemType';

/**
 *  TemplehsNavItemModel
 *  Constructs a navigation item based on TemplehsNavItemType
 */
function TemplehsNavItemModel(data?: PartialDeep<TemplehsNavItemType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		translate: '',
		auth: null,
		subtitle: '',
		icon: '',
		iconClass: '',
		url: '',
		target: '',
		type: 'item',
		sx: {},
		disabled: false,
		active: false,
		exact: false,
		end: false,
		badge: null,
		children: []
	});
}

export default TemplehsNavItemModel;
