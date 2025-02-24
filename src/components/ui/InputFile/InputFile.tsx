import { cn } from "@/utils/cn";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import React, { ChangeEvent, ReactNode, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface PropTypes {
  className?: string;
  errorMessage?: string;
  isDropable?: boolean;
  isUploading?: boolean;
  isDeleting?: boolean;
  isInvalid?: boolean;
  label?: ReactNode;
  name: string;
  onUpload?: (files: FileList) => void;
  onDelete?: () => void;
  preview?: string
}

const InputFile = (props: PropTypes) => {
  const {
    className,
    isDropable = false,
    name,
    isUploading,
    isDeleting,
    isInvalid,
    label,
    errorMessage,
    onUpload,
    onDelete,
    preview,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;

    if (files && onUpload) {
      onUpload(files)
    }
  };

  useEffect(() => {
    const dropCurrent = drop.current;

    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files)
    }
  };

  return (
    <div>
      {label}
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
          className,
          { "border-teal-600": isInvalid }
        )}
      >

        {preview && (
          <div className="relative flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2">
              <Image
                fill
                src={preview}
                alt="image"
                className="!relative"
              />
            </div>
            <Button
              onPress={onDelete}
              disabled={isDeleting}
              isIconOnly
              className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded bg-teal-100">
              {
                isDeleting ? (
                  <Spinner size="sm" color="success" />
                ) : <CiTrash className="h-5 w-5 text-teal-500" />
              }
            </Button>
          </div>
        )}

        {!preview && !isUploading && (
          <div className="relative flex flex-col items-center justify-center p-5">
            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-center text-sm font-semibold text-gray-500">
              {isDropable
                ? "Seret dan lepas atau klik untuk mengunggah file di sini"
                : "Klik untuk mengunggah file di sini"}
            </p>
          </div>
        )}

        {isUploading && (
          <div className=" flex flex-col items-center justify-center p-5">
            <Spinner color="success" size="lg" />
          </div>
        )}

        <input
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          onChange={handleOnUpload}
          disabled={preview !== ""}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label >
      {isInvalid && (
        <p
          className="p-1 text-xs text-danger-500"
        >
          {errorMessage}
        </p>
      )}
    </div >
  );
};

export default InputFile;
