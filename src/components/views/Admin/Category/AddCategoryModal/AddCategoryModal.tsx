import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Textarea } from "@heroui/react"
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchCategory: () => void;
}

const AddCategoryModal = (props: PropTypes) => {

  const { isOpen, onClose, onOpenChange, refetchCategory } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    handleOnClose,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddCategory) {
      onClose();
      refetchCategory();
    }

  }, [isSuccessMutateAddCategory])

  const disbaledSubmit = isPendingMutateAddCategory;

  return (
    <Modal
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      isOpen={isOpen} placement="center" scrollBehavior="inside">
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Tambah Kategori</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Informasi</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Nama Kategori"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={String(field.value)}
                    label="Status Kategori"
                    variant="bordered"
                    isInvalid={errors.isActive !== undefined}
                    errorMessage={errors.isActive?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true" id="true">
                      Aktif
                    </SelectItem>
                    <SelectItem key="false" id="false">
                      Tidak Aktif
                    </SelectItem>
                  </Select>
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disbaledSubmit}
            >Batal</Button>
            <Button
              color="success"
              type="submit"
              disabled={disbaledSubmit}
              className="bg-teal-600"
            >{
                isPendingMutateAddCategory ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <>

                    <p className="text-white">Simpan</p>
                  </>
                )
              }</Button>
          </ModalFooter>
        </ModalContent>
      </form >
    </Modal >
  )
}

export default AddCategoryModal;