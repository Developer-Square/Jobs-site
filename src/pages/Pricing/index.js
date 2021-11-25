import React from "react";
import { TypedPlanListsQuery } from "graphql/queries";
import Loader from "components/Loader/Loader";
import { formatCurrency } from "utils";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div>
      {/* Titlebar
    ================================================== */}
      <div id="titlebar" className="single">
        <div className="container-x">
          <div className="sixteen columns">
            <h2>Pricing Tables</h2>
            <nav id="breadcrumbs">
              <ul>
                <li>You are here:</li>
                <li>
                  <a href>Home</a>
                </li>
                <li>Pricing</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* Pricing Tables
    ================================================== */}
      <TypedPlanListsQuery>
        {(plansList) => {
          if (plansList.loading) {
            return <Loader />;
          }

          const { allPlanLists } = plansList.data;

          return (
            <div className="container-x">
              {allPlanLists.map((list, index) => (
                <div
                  className={list?.allPlans?.length === 4 ? "" : "container-x"}
                  key={index}
                >
                  <div className="sixteen columns">
                    <h3 className="margin-bottom-20">{list?.userType}</h3>
                  </div>
                  {list.allPlans.map((plan, idx) => (
                    <div
                      className={`plan color-1 ${
                        list?.allPlans?.length === 4
                          ? "four columns"
                          : "one-third column"
                      }`}
                      key={idx}
                    >
                      <div className="plan-price">
                        <h3>{plan.title}</h3>
                        <span className="plan-currency">
                          {" "}
                          {formatCurrency(plan?.periodAmountMoney)}
                        </span>
                      </div>
                      <div className="plan-features">
                        <ul>
                          {plan.collection
                            .reduce((arr, v) => {
                              arr.push([v]);
                              return arr;
                            }, [])
                            .map((val, i) => (
                              <li key={i}>&bull;➜ {val.toString()}</li>
                            ))}
                        </ul>
                        <Link className="button" to={{ pathname: "" }}>
                          <i className="fa fa-shopping-cart" /> Purchase Plan
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        }}
      </TypedPlanListsQuery>
      <br />
    </div>
  );
};

export default Pricing;
