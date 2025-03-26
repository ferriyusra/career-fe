import { Tabs, Tab } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
  const {
    dataCategory,
    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  } = useDetailCategory();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          dataCategory={dataCategory}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
