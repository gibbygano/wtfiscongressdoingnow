import { load } from "$std/dotenv/mod.ts";

export interface AppConfig {
  GoogleMapsAPISecret: string;
}

export async function getAppConfig(): Promise<AppConfig> {
  const env = await load({ export: true });

  return <AppConfig> {
    GoogleMapsAPISecret: env["GoogleMapsAPISecret"],
  };
}
