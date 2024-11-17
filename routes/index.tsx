import { Bills } from "islands";
import { getAppConfig } from "appConfig";

const BillsPage = () => {
	const appVersion = getAppConfig().AppVersion;
	console.debug(`App Version: ${appVersion}`);
	return <Bills appVersion={appVersion} />;
};

export default BillsPage;
