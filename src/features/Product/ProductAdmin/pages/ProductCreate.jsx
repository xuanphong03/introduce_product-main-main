import React from "react";
import FormCreateProduct from "./FormCreateProduct";
import { ToastContainer, toast } from "react-toastify";
import productApi from "../../../../apis/productApi";

function ProductCreate(props) {
  const handleCreateProduct = async (data) => {
    try {
      console.log("Data new product: ", data);
      // Call api tạo sản phẩm
      const response = await productApi.addProduct(data);
      // Check response
      if (response.status === 201) {
        toast.success("Add product successfully 🎉", {
          autoClose: 3000,
        });
      } else {
        toast.error("Failed to add product 🙁", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      if(error.response.data.status === 400) {
        toast.error(`${error.response.data.message}🙁`, {
          autoClose: 3000,
        });
      }
      
    }
  };
  return (
    <div className="col-span-11 md:col-span-10 px-6 py-2 bg-gray-200">
      <FormCreateProduct onSubmit={handleCreateProduct} />
      <ToastContainer />
    </div>
  );
}

export default ProductCreate;
