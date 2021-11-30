import React from "react";
import { TypedPlanListsQuery } from "graphql/queries";
import Loader from "components/Loader/Loader";
import PlanCard from "./PlanCard";
import UserContext from "contexts/user/user.provider";

const PlanCards = (props) => {
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
                          <PlanCard
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
                        <PlanCard
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

      {/* <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <a
            title="Buy me a beer"
            href="https://www.twitter.com/asad_codes"
            target="_blank"
            className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
            rel="noreferrer"
          >
            <img
              alt="some soem"
              className="object-cover object-center w-full h-full rounded-full"
              src="https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2019/12/twitter-logo.jpg"
            />
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default PlanCards;
