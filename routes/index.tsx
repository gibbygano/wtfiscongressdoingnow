import { Bills } from "islands";
import { getAppConfig } from "appConfig";

const BillsPage = () => {
	const appVersion = getAppConfig().AppVersion;
	return <Bills appVersion={appVersion} />;
};

export default BillsPage;
