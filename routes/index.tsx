import { Bills } from "islands";
import { BillsContextProvider } from "context";

const BillsPage = () => {
  return (
    <BillsContextProvider>
      <Bills />
    </BillsContextProvider>
  );
};

export default BillsPage;
