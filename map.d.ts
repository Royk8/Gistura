declare module 'react-leaflet-markercluster' {
	import { FC } from 'react';

	interface Props {
		showCoverageOnHover?: boolean;
		iconCreateFunction?: any;
	}

	const MarkerClusterGroup: FC<Props> = () => {};

	// eslint-disable-next-line react/prefer-stateless-function
	export default MarkerClusterGroup;
}
