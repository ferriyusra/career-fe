import DataTable from "@/components/ui/DataTable";
import {
  Chip,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Category = () => {
  const { isReady, push, query } = useRouter();
  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "isActive":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Aktif" : "Tidak Aktif"}
            </Chip>
          )
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/category/${category.id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${category.id}`);
                deleteCategoryModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          isLoading={isLoadingCategory || isRefetchingCategory}
          columns={COLUMN_LISTS_CATEGORY}
          emptyContent="Kategori Kosong"
          onClickButtonTopContent={addCategoryModal.onOpen}
          buttonTopContentLabel="Tambah Kategori"
          renderCell={renderCell}
          totalPages={Math.ceil(dataCategory?.pagination.total / dataCategory?.pagination.perPage)}
          data={dataCategory?.data || []}
        />
      )}
      <AddCategoryModal
        refetchCategory={refetchCategory}
        {...addCategoryModal}
      />
      <DeleteCategoryModal
        refetchCategory={refetchCategory}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        {...deleteCategoryModal}
      />
    </section>
  );
};

export default Category;
