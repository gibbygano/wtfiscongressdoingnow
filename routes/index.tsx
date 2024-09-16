import { IS_BROWSER } from "$fresh/runtime.ts";
import { Bills } from "islands";
import { useRegisterServiceWorker } from "hooks";

const BillsPage = () => {
	if (IS_BROWSER) {
		console.log("BROWSER TIME BB");
		useRegisterServiceWorker();
	}

	return <Bills />;
};

export default BillsPage;
