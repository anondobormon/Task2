import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, createProduct } from "../../actions/productAction";
import { CREATE_PRODUCT_RESET } from "../../constants/productConstants";
import "./CreateProduct.scss";

export default function CreateProduct() {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.createProduct
  );
  useEffect(() => {
    if (success) {
      alert("Product created successfully");
      setData({ title: "", description: "" });
      dispatch({ type: CREATE_PRODUCT_RESET });
    }
    if (error) {
      alert(error);
      setData({ title: "", description: "" });
      dispatch(clearError());
    }
  }, [success, error, dispatch]);

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, description } = data;

    title && description && dispatch(createProduct(data));
  };

  return (
    <div className="create_product">
      <h2>Create Product</h2>

      <form action="">
        <fieldset>
          <legend>Product Details:</legend>
          <input
            onChange={handleDataChange}
            type="text"
            placeholder="Product title"
            name="title"
            value={data.title}
          />
          <textarea
            onChange={handleDataChange}
            name="description"
            id=""
            cols="30"
            rows="10"
            placeholder="Description"
            value={data.description}
          ></textarea>
          <input
            disabled={loading}
            onClick={handleSubmit}
            type="submit"
            value={loading ? "Loading..." : "Create"}
            className="button"
          />
        </fieldset>
      </form>
    </div>
  );
}
