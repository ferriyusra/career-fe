import { DELAY } from '@/constants/list.constants';
import useChangeUrl from '@/hooks/useChangeUrl';
import categoryServices from '@/services/category.service';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useCategory = () => {
	const [selectedId, setSelectedId] = useState<string>('');
	const router = useRouter();
	const { currentPerPage, currentPage, currentSearch } = useChangeUrl();

	const getCategories = async () => {
		let params = `page=${currentPage}&perPage=${currentPerPage}`;
		if (currentSearch) {
			params += `&name=${currentSearch}`;
		}

		const res = await categoryServices.getCategories(params);

		const { data } = res;

		return data;
	};

	const {
		data: dataCategory,
		isLoading: isLoadingCategory,
		isRefetching: isRefetchingCategory,
		refetch: refetchCategory,
	} = useQuery({
		queryKey: ['Categories', currentPage, currentPerPage, currentSearch],
		queryFn: () => getCategories(),
		enabled: router.isReady && !!currentPage && !!currentPerPage,
	});

	return {
		dataCategory,
		isRefetchingCategory,
		isLoadingCategory,
		refetchCategory,
		selectedId,
		setSelectedId,
	};
};

export default useCategory;
