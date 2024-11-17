export interface AppConfig {
	GoogleMapsAPISecret: string;
	RootUrl: string;
	DataGovAPIKey: string;
	AppVersion: string;
}

export function getAppConfig(): AppConfig {
	return <AppConfig> {
		GoogleMapsAPISecret: Deno.env.get("GoogleMapsAPISecret"),
		RootUrl: Deno.env.get("ROOT_URL"),
		DataGovAPIKey: Deno.env.get("DATA_GOV_API_KEY"),
		AppVersion: Deno.env.get("APP_VERSION"),
	};
}
