import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAProduct } from "../../actions/productAction";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, product } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getAProduct(id));
  }, [id, dispatch]);

  return (
    <div>
      ProductDetails
      {loading ? (
        "loading..."
      ) : (
        <div>
          {" "}
          {product ? (
            <div>
              <h3>Title: {product.title}</h3>
              <br />
              <p>Description: {product.description}</p>
              <br />
              <Link to={`/update/${product._id}`}>Edit</Link>
            </div>
          ) : (
            "No product found!"
          )}
        </div>
      )}
    </div>
  );
}
