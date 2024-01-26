import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import UserType from 'src/app/store/user/UserType';

/**
 * Creates a new user object with the specified data.
 */
function UserModel(data: PartialDeep<UserType>): UserType {
	data = data || {};

	return _.defaults(data, {
		role: [],
		data: {
			displayName: 'John Doe',
			photoURL: 'assets/images/avatars/brian-hughes.jpg',
			email: 'johndoe@templehs.com',
			settings: {}
		}
	});
}

export default UserModel;
