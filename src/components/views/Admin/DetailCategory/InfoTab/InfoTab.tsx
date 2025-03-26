import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  dataCategory: ICategory;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataCategory, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("name", `${dataCategory?.name}`);
    setValueUpdateInfo("isActive", Boolean(dataCategory?.isActive));
  }, [dataCategory]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Info Kategori</h1>
        <p className="w-full text-small text-default-400">Atur Kategori</p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <p className="text-sm font-bold">Informasi</p>
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Nama Penggalangan Dana"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo.name?.message}
                  className="mt-2"
                  labelPlacement="outside"
                ></Input>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataCategory} className="rounded-lg">
            <Controller
              name="isActive"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  value={String(field.value)}
                  label="Status Kategori"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.isActive !== undefined}
                  errorMessage={errorsUpdateInfo.isActive?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[
                    dataCategory?.isActive === true ? "true" : "false",
                  ]}
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
          </Skeleton>
          <Button
            type="submit"
            color="success"
            className="mt-2 disabled:bg-default-500 bg-teal-600"
            disabled={isPendingUpdate || !dataCategory?.id}
          >
            {" "}
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              <span className="text-white">Simpan</span>
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
