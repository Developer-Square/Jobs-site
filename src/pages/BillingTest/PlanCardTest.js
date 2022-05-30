import React from "react";
import Select from "react-select";
import { formatCurrency } from "utils";

const periodName = (period) => {
  if (period.periodType === "HOURLY") {
    return `Every ${period?.periodLength > 1 ? period?.periodLength : ""} Hour${
      period?.periodLength > 1 ? "s" : ""
    }`;
  }
  if (period.periodType === "DAILY") {
    return `Every ${period?.periodLength > 1 ? period?.periodLength : ""} Day${
      period?.periodLength > 1 ? "s" : ""
    }`;
  }
  if (period.periodType === "WEEKLY") {
    return `Every ${period?.periodLength > 1 ? period?.periodLength : ""} Week${
      period?.periodLength > 1 ? "s" : ""
    }`;
  }
  if (period.periodType === "MONTHLY") {
    return `Every ${
      period?.periodLength > 1 ? period?.periodLength : ""
    } Month${period?.periodLength > 1 ? "s" : ""}`;
  }
  if (period.periodType === "YEARLY") {
    return `Every ${period?.periodLength > 1 ? period?.periodLength : ""} Year${
      period?.periodLength > 1 ? "s" : ""
    }`;
  }
};
const processPeriods = (periods) => {
  return periods.reduce((arr, period) => {
    arr.push({
      label: periodName(period),
      value: period,
    });
    return arr;
  }, []);
};
const PlanCardTest = (props) => {
  const { plan, selectedPlan } = props;
  const [selectedPeriod, setSelectedPeriod] = React.useState(
    processPeriods(plan?.allPricing)[0] || null,
  );
  const [totalPrice, setTotalPrice] = React.useState(
    plan?.allPricing[0]?.amount,
  );
  const [cart, setCart] = React.useState([]);

  console.log("the cart", cart);
  const calclulateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      const amount = cart[i]?.totalCount * cart[i]?.baseAmount;
      total = total + amount;
    }
    setTotalPrice(selectedPeriod?.value?.amount + total);
  };
  const totalItemsInCart = (period, feature) => {
    console.log(feature);
    const foundItem = cart.find(({ id }) => id === feature.id);
    if (foundItem) {
      console.log(parseInt(period?.minCount), parseInt(foundItem?.totalCount));
      return parseInt(period?.minCount) + parseInt(foundItem?.totalCount);
    }
    return parseInt(period?.minCount);
  };

  const addToCart = (plan, feature) => {
    if (cart.length === 0) {
      cart.push({
        name: feature?.name,
        id: feature?.id,
        totalCount: 1,
        baseAmount: plan?.amount,
      });
    } else {
      let newCart = cart;
      const foundObject = newCart.find(({ id }) => id === feature.id);
      if (foundObject) {
        const idx = newCart.indexOf(foundObject);
        if (idx !== -1) {
          newCart[idx] = {
            name: feature?.name,
            id: feature?.id,
            totalCount: foundObject?.totalCount + 1,
            baseAmount: plan?.amount,
          };
          setCart(newCart);
        }
      } else {
        setCart([
          ...cart,
          {
            name: feature?.name,
            id: feature?.id,
            totalCount: 1,
            baseAmount: plan?.amount,
          },
        ]);
      }
    }
    calclulateTotalPrice();
  };
  const removeFromCart = (plan, feature) => {
    let newCart = cart;
    const foundObject = newCart.find(({ id }) => id === feature.id);
    const idx = newCart.indexOf(foundObject);

    if (foundObject) {
      if (foundObject?.totalCount - 1 === 0) {
        if (idx > -1) {
          newCart.splice(idx, 1);
          setCart(newCart);
        }
      } else {
        newCart[idx] = {
          name: feature?.name,
          id: feature?.id,
          totalCount: foundObject?.totalCount - 1,
          baseAmount: plan?.amount,
        };
        setCart(newCart);
      }
    }
    calclulateTotalPrice();
  };

  const selectStyle = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
      backgroundColor: "transparent",
    }),
  };

  return plan?.id ? (
    <div
      key={plan.id}
      className={`w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-white mt-6 shadow-lg rounded-lg `}
      style={
        plan?.id === selectedPlan?.id
          ? {
              border: "10px solid #4be16e",
            }
          : props?.step
          ? { maxWidth: "440px" }
          : {}
      }
    >
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        <div className="flex justify-center">
          <span className="inline-flex px-4 py-1 rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
            {plan.title}
          </span>
        </div>
      </div>
      <span className="inline-flex py-1 text-sm">{plan?.description}</span>

      <div className="p5">
        <div className="grid justify-center items-center">
          <div className="mt-4 mx-auto text-4xl items-center leading-none font-extrabold">
            {formatCurrency(totalPrice)}
          </div>
          <Select
            width="200px"
            menuColor="red"
            defaultValue={selectedPeriod}
            options={processPeriods(plan?.allPricing)}
            value={selectedPeriod}
            onChange={(val) => setSelectedPeriod(val)}
            styles={selectStyle}
            className={`leading-8 font-medium text-gray-${
              plan?.recommended ? "100" : "500"
            }`}
          />
        </div>
      </div>
      <span
        className={`leading-8 font-medium text-gray-${
          plan?.recommended ? "100" : "500"
        }`}
      ></span>
      <p className="text-md mt-4" />
      {selectedPeriod?.value?.hasTrial && (
        <>
          <button
            type="button"
            onClick={() => {
              setCart([]);
              setTotalPrice(selectedPeriod?.value?.amount);
            }}
            className="w-full px-3 py-3 text-sm shadow rounded-lg bg-transparent border-2 border-gray-800 text-gray-500 text-lg rounded-lg hover:bg-gray-500 hover:text-gray-100 focus:border-4 focus:border-gray-300 transition-colors duration-700 transform"
          >
            Start Free Trial
          </button>
          <p className="text-md mt-4" />
        </>
      )}

      <ul className="text-sm w-full mt-6 mb-6">
        {selectedPeriod?.value?.allFeatures.map((val, k) => (
          <li className="mb-3 flex items-center" key={k}>
            <b style={{ marginRight: 10 }}>
              {totalItemsInCart(val, val?.feature)}
            </b>{" "}
            {val?.feature?.name}
            <div
              style={{
                display: "flex",
                float: "right",
                marginLeft: "auto",
              }}
            >
              <button
                style={{
                  minHeight: "1.2rem",
                  minWidth: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "0.5rem",
                  border: "1.6px solid rgb(0, 0, 0)",
                  borderRadius: "1rem",
                }}
                onClick={() =>
                  totalItemsInCart(val, val?.feature) <= val?.minCount
                    ? null
                    : removeFromCart(val, val?.feature)
                }
              >
                <i className="fa fa-minus hover:text-white" />
              </button>
              <button
                style={{
                  minHeight: "1.2rem",
                  minWidth: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "1rem",
                  border: "1.6px solid rgb(0, 0, 0)",
                  borderRadius: "1rem",
                }}
                onClick={() =>
                  totalItemsInCart(val, val?.feature) < val?.maxCount
                    ? addToCart(val, val?.feature)
                    : null
                }
              >
                <i className="fa fa-plus hover:text-white" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-md mt-4" />
      <ul className="text-sm w-full mt-6 mb-6">
        {plan.collection
          .reduce((arr, v) => {
            arr.push([v]);
            return arr;
          }, [])
          .map((val, i) => (
            <li className="mb-3 flex items-center" key={i}>
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width={6}
                height={6}
                stroke="currentColor"
                fill={plan?.recommended ? "currentColor" : "green"}
                viewBox="0 0 1792 1792"
              >
                <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              {val.toString()}
            </li>
          ))}

        <li className="mb-3 flex items-center opacity-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={6}
            height={6}
            className="h-6 w-6 mr-2"
            fill={plan?.recommended ? "currentColor" : "red"}
            viewBox="0 0 1792 1792"
          >
            <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
          </svg>
          Consultation
        </li>
      </ul>
      <button
        type="button"
        onClick={
          props?.step
            ? props?.handleBack
            : () => {
                props?.selectPlan(plan);
                props?.handleNext();
              }
        }
        className="w-full px-3 py-3 text-sm shadow rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-700 transform"
      >
        {props?.step ? (
          "Choose Different"
        ) : (
          <>
            <i className="fa fa-shopping-cart" /> Purchase Plan
          </>
        )}
      </button>
    </div>
  ) : (
    <p>no Plan </p>
  );
};

export default PlanCardTest;
