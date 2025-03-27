import { DELAY, PER_PAGE_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { ChangeEvent } from "react";

const useChangeUrl = () => {

  const router = useRouter();
  const debounce = useDebounce();
  const currentPerPage = router.query.perPage;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;

  const setUrl = () => {
    router.replace({
      query: {
        page: currentPage || PAGE_DEFAULT,
        perPage: currentPerPage || PER_PAGE_DEFAULT,
        search: currentSearch || "",
      },
    });
  }

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        page: PAGE_DEFAULT,
        perPage: selectedLimit,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };


  return {
    currentPerPage,
    currentPage,
    currentSearch,
    setUrl,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
  };

}

export default useChangeUrl;