import { useEffect } from "react";
import Error from "./Error";

const ShippingMethods = ({
  shipMethods,
  handleOnChange,
  input,
  shippingMethodSelected,
}) => {
  const { errors, shippingMethod } = input || {};

  useEffect(() => {}, [shippingMethodSelected]);
  return (
    <>
      <div className="mt-3">
        <h3 clasNames=" font-bold">Metodo di Spedizione</h3>
        <Error errors={errors} fieldName={"shippingMethod"} />
        {/*Direct bank transfers*/}
        <div className="form-check woo-next-payment-input-container mt-2">
          <label className="form-check-label">
            <input
              onChange={handleOnChange}
              value="flat_rate:1"
              className="form-check-input mr-3"
              name="shippingMethod"
              type="radio"
              checked={"flat_rate:1" === shippingMethodSelected}
            />
            <span className="woo-next-payment-content">Standard</span>
          </label>
        </div>
        {/*Pay with Paypal*/}
        <div className="form-check woo-next-payment-input-container mt-2">
          <label className="form-check-label">
            <input
              onChange={handleOnChange}
              value="local_pickup:4"
              className="form-check-input mr-3"
              name="shippingMethod"
              type="radio"
              checked={"local_pickup:4" === shippingMethod}
            />
            <span className="woo-next-payment-content">
              Ritiro in negozio - via Antonio Fratti 106, Viareggio, (LU)
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default ShippingMethods;
