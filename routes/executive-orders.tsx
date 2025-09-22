import { ExecutiveOrderContextProvider } from "context";
import { ExecutiveOrders } from "islands";

const ExecutiveOrdersPage = () => (
	<ExecutiveOrderContextProvider>
		<ExecutiveOrders />
	</ExecutiveOrderContextProvider>
);
export default ExecutiveOrdersPage;
