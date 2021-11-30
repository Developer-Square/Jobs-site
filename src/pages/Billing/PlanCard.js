import React from "react";
import { formatCurrency } from "utils";

const PlanCard = (props) => {
  const { plan, selectedPlan } = props;

  return plan?.id ? (
    <div
      key={plan.id}
      className={`w-full ${
        props?.step ? "" : "sm:w-1/2 md:w-1/2 lg:w-1/4"
      } px-4 py-4 ${
        plan?.recommended ? "bg-indigo-500 text-white" : "bg-white"
      } mt-6 shadow-lg rounded-lg  ${
        props?.step ? "" : "transform hover:scale-110 transition duration-500"
      }`}
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
        <div className="grid justify-center items-center">
          <div className="mt-4 mx-auto text-4xl items-center leading-none font-extrabold">
            {formatCurrency(plan?.periodAmountMoney)}
          </div>
          <span
            className={`mx-auto leading-8 font-medium text-gray-${
              plan?.recommended ? "100" : "500"
            }`}
          >
            {" "}
            ({plan.periodType})
          </span>
        </div>
      </div>
      <p className="text-md mt-4">Plan includes:</p>
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

export default PlanCard;
