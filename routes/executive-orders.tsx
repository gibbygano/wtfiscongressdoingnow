import { ExecutiveOrders } from "islands";
import { ExecutiveOrderContextProvider } from "context";

const ExecutiveOrdersPage = () => (
	<ExecutiveOrderContextProvider>
		<ExecutiveOrders />
	</ExecutiveOrderContextProvider>
);
export default ExecutiveOrdersPage;
