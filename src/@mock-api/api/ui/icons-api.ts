import mockApi from '../../mock-api.json';
import mock from '../../mock';

const heroiconsApi = mockApi.components.examples.icons_heroicons.value;

mock.onGet('/api/ui/icons/heroicons').reply(() => {
	return [200, heroiconsApi];
});

