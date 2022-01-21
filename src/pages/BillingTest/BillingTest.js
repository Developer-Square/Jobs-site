import React from "react";
import { TypedPlanListsQuery } from "graphql/queries";
import Loader from "components/Loader/Loader";
import UserContext from "contexts/user/user.provider";
import PlanCardTest from "./PlanCardTest";

const BillingTest = (props) => {
  const { user } = React.useContext(UserContext);
  const userType = user?.isSeeker
    ? "SEEKER"
    : user?.isEmployer
    ? "EMPLOYER"
    : null;
  return (
    <div className="py-4 px-4 bg-gray-100 rounded-xl shadow-lg hover:shadow-xl  mx-auto md:mx-0">
      {/* component */}
      <div className="items-center">
        <div className>
          <div className="text-center font-semibold">
            <h1 className="text-5xl">
              <span className="text-indigo-500 tracking-wide">Flexible </span>
              <span>Plans</span>
            </h1>
            <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
              Choose a plan that works best for you.
            </p>
          </div>
          {/* cards */}
          <TypedPlanListsQuery>
            {(plansList) => {
              if (plansList.loading) {
                return <Loader />;
              }

              const { allPlanLists } = plansList.data;

              return allPlanLists.map((list, index) => (
                <div key={index}>
                  {userType ? (
                    list?.userType === userType && (
                      <div
                        className="my-16 sm:flex flex-wrap justify-center items-center gap-8"
                        key={index}
                      >
                        {list.allPlans.map((plan) => (
                          <PlanCardTest
                            plan={plan}
                            selectedPlan={props?.selectedPlan}
                            selectPlan={props?.selectPlan}
                            handleNext={props?.handleNext}
                            handleBack={props?.handleBack}
                          />
                        ))}
                      </div>
                    )
                  ) : (
                    <>
                      <div className="sixteen columns">
                        <h3 className="margin-bottom-20">{list?.userType}</h3>
                      </div>
                      {list.allPlans.map((plan) => (
                        <PlanCardTest
                          plan={plan}
                          selectedPlan={props?.selectedPlan}
                          selectPlan={props?.selectPlan}
                          handleNext={props?.handleNext}
                          handleBack={props?.handleBack}
                        />
                      ))}
                    </>
                  )}
                </div>
              ));
            }}
          </TypedPlanListsQuery>
        </div>
      </div>
    </div>
  );
};

export default BillingTest;
