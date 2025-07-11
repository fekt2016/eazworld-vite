import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminApi from "../../apiService/adminApi";
import { useState } from "react";
import { useEffect } from "react";

const useAdmin = (adminId) => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(""); // Local search state
  const [appliedSearch, setAppliedSearch] = useState("");
  const [sort, setSort] = useState("createdAt:desc");

  useEffect(() => {
    // Only set the applied search if there's a change
    if (searchValue !== appliedSearch) {
      const handler = setTimeout(() => {
        setAppliedSearch(searchValue);
        setPage(1); // Reset to first page when search changes
      }, 500); // 500ms debounce delay

      return () => clearTimeout(handler);
    }
  }, [searchValue, appliedSearch]);

  const queryClient = useQueryClient();

  // Get seller details if sellerId is provided
  const {
    data: admin,
    isLoading: isAdminLoading,
    error: adminError,
    // refetch: refetchSeller,
  } = useQuery({
    queryKey: ["admin", adminId],
    queryFn: () => adminApi.getAdminDetails(adminId),
    enabled: !!adminId, // Only fetch when sellerId exists
  });

  // Get all sellers with pagination
  const {
    data: admins,
    isLoading: isAdminsLoading,
    error: adminsError,
  } = useQuery({
    queryKey: ["admins", page, appliedSearch, sort],
    queryFn: () => {
      const params = {
        page,
        sort,
      };

      // Only add search parameter if it has value
      if (appliedSearch) {
        params.search = appliedSearch;
      }
      return adminApi.getAllAdmins(params);
    },
    keepPreviousData: true,
    retry: 2,
    onSuccess: (response) => {
      // Use optional chaining to safely access data
      const apiData = response?.data?.data || {};
      const meta = apiData?.meta || {
        total: 0,
        totalPages: 1,
        currentPage: page,
        itemsPerPage: 10,
      };

      // Update pagination if needed
      if (page > meta?.totalPages) {
        setPage(Math.max(1, meta.totalPages));
      }

      // Update cache with consistent structure
      queryClient.setQueryData(["admins"], (oldData) => {
        return {
          data: {
            ...(oldData?.data || {}),
            meta,
            results: apiData?.results || oldData?.data?.results || [],
          },
        };
      });
    },
  });
  const adminsData = admins?.data?.data || {};
  const meta = adminsData?.meta || {};

  // Status update mutation
  const updateStatus = useMutation({
    mutationFn: (statusData) => adminApi.updateadminStatus(statusData),
    onSuccess: (data) => {
      console.log("Status updated successfully:", data);
      // Invalidate the sellers query
      queryClient.invalidateQueries(["admins"]);
    },
  });

  return {
    admin,
    admins: admins?.data || [],
    meta,
    isLoading: isAdminsLoading || isAdminLoading,
    error: adminError || adminsError,
    updateStatus,
    page,
    setPage,
    sort,
    setSort,
    setSearchValue,
    searchValue,
    appliedSearch,
  };
};

export default useAdmin;
