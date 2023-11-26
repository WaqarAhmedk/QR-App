import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";
import FileUpload from "./FileUpload";
import Input from "./Input";
import Textarea from "./TextArea";
import Button from "./Button";
import { useRouter } from "next/router";
import InputColor from "./inputColor";

function AddProduct() {
  const [productCount, setProductCount] = useState(1);
  const { setValue } = useFormContext();
  const products = useWatch({ name: "products" });
  const router = useRouter();
  const { edit_qrId } = router.query;

  useEffect(() => {
    if (edit_qrId && products) {
      setProductCount(products.length);
    }
  }, [products, edit_qrId]);

  const handleAddProduct = () => {
    setProductCount((prevCount) => prevCount + 1);
    setValue(`products[${productCount}]`, {
      price: null,
      name: "",
      textColor: "#00000",
      bgColor: "#ffffff",
    });
  };

  const handleDeleteProduct = (index) => {
    const updatedProductCount = productCount - 1;
    setProductCount(updatedProductCount);

    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setValue("products", updatedProducts);
  };

  return (
    <>
      {Array.from({ length: productCount }, (_, index) => (
        <div
          key={index}
          className="bg-light relative rounded-[10px] text-t1 antialiased px-6 py-6 mt-5"
        >
          {index >= 1 && (
            <Image
              className="cursor-pointer absolute right-[30px]"
              src="/assets/svgs/icons/bin_2.svg"
              width={36}
              height={36}
              alt="input-delete"
              onClick={() => {
                handleDeleteProduct(index);
              }}
            />
          )}

          <div className="space-y-3">
            <FileUpload
              label={`Product Image ${index}`}
              preLabel="Product Image"
              name={`products[${index}].image`}
              qrType="Menu"
              keyIndex={index}
            />
            <Input
              inputLabel="Product name"
              placeholder="Product name"
              name={`products[${index}].name`}
              bg="light"
            />
            <Input
              inputLabel="Price"
              placeholder="E.g $20"
              bg="light"
              name={`products[${index}].price`}
            />
            <div className="flex w-[100%] gap-2 375:flex-col 500:flex-row">
              <InputColor
                name={`products[${index}].textColor`}
                inputLabel="Text Color"
              />
              <InputColor
                name={`products[${index}].bgColor`}
                inputLabel="Background Color"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="mt-10">
        <Button
          text="+ Add More"
          actionType="button"
          type="gradient"
          buttonClass="rounded-xl h-[50px] bg-none"
          onClick={handleAddProduct}
        />
      </div>
    </>
  );
}

export default AddProduct;
