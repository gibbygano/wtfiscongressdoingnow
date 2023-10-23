export interface AppConfig {
  GoogleMapsAPISecret: string;
  RootUrl: string;
}

export function getAppConfig(): AppConfig {
  return <AppConfig> {
    GoogleMapsAPISecret: Deno.env.get("GoogleMapsAPISecret"),
    RootUrl: Deno.env.get("ROOT_URL"),
  };
}
