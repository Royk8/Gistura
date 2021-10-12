export namespace Nominatim {
	export namespace Api {
		export interface ReverseResponse {
			place_id: number;
			licence: string;
			osm_type: string;
			osm_id: number;
			lat: string;
			lon: string;
			place_rank: number;
			category: string;
			type: string;
			importance: number;
			addresstype: string;
			name: string;
			display_name: string;
			address: {
				leisure: string;
				road: string;
				neighbourhood: string;
				suburb: string;
				city_district: string;
				city: string;
				state_district: string;
				state: string;
				region: string;
				postcode: string;
				country: string;
				country_code: string;
			};
			boundingbox: [string, string, string, string];
		}

		export interface ReverseRequest {
			lat: string;
			lon: string;
		}
	}
}

export default Nominatim;
