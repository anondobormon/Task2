import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearError,
  deleteProduct,
  getAllProducts,
} from "../../actions/productAction";
import { PRODUCT_DELETE_RESET } from "../../constants/productConstants";

export default function ProductList() {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector(
    (state) => state.allProducts
  );
  const { success: deleteSuccess, error: deleteError } = useSelector(
    (state) => state.updateProductStore
  );

  useEffect(() => {
    if (deleteSuccess) {
      alert("Product deleted successfully");
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearError());
    }

    dispatch(getAllProducts());
  }, [error, deleteSuccess, deleteError, dispatch]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },
    {
      field: "title",
      headerName: "Title",
      minWidth: 300,
      flex: 0.6,
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      type: "number",
      minWidth: 120,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="actions">
            <Link
              className="view"
              to={`/product-details/${params.getValue(params.id, "id")}`}
            >
              View
            </Link>

            <button
              className="deletebtn"
              disabled={loading ? true : false}
              onClick={() => deleteHandler(params.getValue(params.id, "id"))}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        title: item.title,
      });
    });

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <div>
      ProductList
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className="productListTable"
        autoHeight
      />
    </div>
  );
}
