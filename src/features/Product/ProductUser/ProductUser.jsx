import React, { useEffect, useMemo, useState } from "react";
import ProductFilter from "./components/ProductFilter";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import ProductItem from "./components/ProductItem";
import productApi from "../../../apis/productApi";
import FilterViewer from "./components/Filters/FilterViewer";
import { Alert, Box, Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import ProductSkeleton from "./components/ProductSkeleton";
import AnnouncementIcon from "@mui/icons-material/Announcement";

function ProductUser() {
  const { product_list } = useSelector((state) => state.products); // Test
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _limit: Number.parseInt(params._limit) || 15,
    };
  }, [location.search]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 15,
    total: 10,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setFetched(true);
        setProductList(data);
        setPagination(pagination);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
    setLoading(false);
  }, [queryParams]);

  // Calculate the index range for the current page
  const indexOfLastProduct = currentPage * pagination.limit;
  const indexOfFirstProduct = indexOfLastProduct - pagination.limit;
  const currentProducts = product_list.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (event, page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    navigate(`/products/?${queryString.stringify(filters)}`);
  };

  const setNewFilters = (newFilters) => {
    navigate(`/products/?${queryString.stringify(newFilters)}`);
  };

  return (
    <div className="pt-[var(--height-header)] grid grid-cols-12 gap-6 mx-6 mt-6 pb-12">
      <div className="col-span-3">
        <ProductFilter filters={queryParams} onChange={handleFiltersChange} />
      </div>
      <div className="col-span-9  bg-slate-300 px-4 py-2 rounded">
        {productList.length === 0 && fetched ? (
          <>
            <FilterViewer filters={queryParams} onChange={setNewFilters} />
            <Alert
              className="mt-4"
              icon={<AnnouncementIcon />}
              severity="warning"
            >
              Sorry, no products were found matching your selection!
            </Alert>
          </>
        ) : (
          <>
            <div className="flex">
              <FilterViewer filters={queryParams} onChange={setNewFilters} />
            </div>
            <div className="mt-2 grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 gap-y-5 ">
              {loading ? (
                <ProductSkeleton length={pagination.limit} />
              ) : (
                <>
                  {currentProducts.map((product) => {
                    return <ProductItem key={product.id} product={product} />;
                  })}
                </>
              )}
            </div>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            flexGrow: "row nowrap",
            justifyContent: "center",
            marginTop: "20px",
            paddingBottom: "12px",
          }}
        >
          <Pagination
            count={Math.ceil(productList.length / pagination.limit)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </div>
    </div>
  );
}

export default ProductUser;
