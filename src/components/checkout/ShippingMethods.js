import Error from "./Error";

const ShippingMethods = ({ shipMethods, handleOnChange, input }) => {
  const { errors, shippingMethod } = input || {};
  return (
    <>
      <div className="mt-3">
        <h3 class=" font-bold">Metodo di Spedizione</h3>
        <Error errors={errors} fieldName={"shippingMethod"} />
        {/*Direct bank transfers*/}
        <div className="form-check woo-next-payment-input-container mt-2">
          <label className="form-check-label">
            <input
              onChange={handleOnChange}
              value="standard"
              className="form-check-input mr-3"
              name="shippingMethod"
              type="radio"
              checked={"standard" === shippingMethod}
            />
            <span className="woo-next-payment-content">Standard 6,00 €</span>
          </label>
        </div>
        {/*Pay with Paypal*/}
        <div className="form-check woo-next-payment-input-container mt-2">
          <label className="form-check-label">
            <input
              onChange={handleOnChange}
              value="pickup"
              className="form-check-input mr-3"
              name="shippingMethod"
              type="radio"
              checked={"pickup" === shippingMethod}
            />
            <span className="woo-next-payment-content">Ritiro in negozio</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default ShippingMethods;
