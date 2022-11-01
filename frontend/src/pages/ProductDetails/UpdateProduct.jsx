import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearError,
  getAProduct,
  updateProduct,
} from "../../actions/productAction";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";

export default function UpdateProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const {
    error: updateError,
    success: updateSuccess,
    loading: updateProductLoading,
  } = useSelector((state) => state.updateProductStore);

  useEffect(() => {
    if (updateError) {
      alert(updateError);
      dispatch(clearError());
    }
    if (updateSuccess) {
      alert("Product update successfully");
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate(`/product-details/${id}`);
      return;
    }

    dispatch(getAProduct(id));
  }, [error, id, dispatch, updateSuccess, navigate, updateError]);

  const [title, setTitle] = useState(product?.title);
  const [description, setDescription] = useState(product?.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
    };

    dispatch(updateProduct(data, id));
  };

  return (
    <div>
      <h2>UpdateProduct</h2>
      {loading ? (
        "Loading..."
      ) : (
        <div className="update_product">
          <form action="">
            <fieldset>
              <legend>Product Details:</legend>
              <input
                type="text"
                placeholder="Product title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                name="description"
                id=""
                cols="30"
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <input
                disabled={updateProductLoading}
                onClick={handleSubmit}
                type="submit"
                value={loading ? "Loading..." : "Update"}
                className="button"
              />
            </fieldset>
          </form>
        </div>
      )}
    </div>
  );
}
