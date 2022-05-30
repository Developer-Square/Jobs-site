import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import React, { memo, Suspense } from "react";
import { useAlert } from "react-alert";

import { TypedMutation } from "core/mutations";
import ModalContext from "contexts/modal/modal.provider";
import { INDUSTRY_MUTATION, INDUSTRY_UPDATE_MUTATION } from "graphql/mutations";
import IconsSearchInput from "components/IconsSearchInput";
import Loader from "components/Loader/Loader";
import FormikControl from "containers/FormikContainer/FormikControl";
import { showNotification } from "helpers";

import DataModal from "./DataModal";
import ModalEvents from "../constants/ModalEvents";

const TypedIndustryMutation = TypedMutation(INDUSTRY_MUTATION);
const TypedIndustryUpdateMutation = TypedMutation(INDUSTRY_UPDATE_MUTATION);

const IndustriesModal = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const { emitter } = React.useContext(ModalContext);
  const [industryData, setIndustryData] = React.useState(null);
  const [initialValues, setInitialValues] = React.useState({
    description: "{}",
    descriptionPlaintext: "",
    name: "",
    icon: { value: "", label: "" },
    seo: {
      title: "",
      description: "TheDatabase Kenya | Jobs need people.",
    },
    backgroundImageAlt: "TheDatabase industries",
  });
  React.useEffect(() => {
    const unbind = emitter.on(ModalEvents.INDUSTRY_MODAL, (payload) => {
      if (payload) {
        setIndustryData(payload);
        setInitialValues({
          description: payload?.description,
          descriptionPlainText: payload?.descriptionPlaintext,
          name: payload?.name,
          icon: { value: payload?.icon || "", label: payload?.icon || "" },
          seo: {
            title: payload?.seo?.title,
            description: payload?.seo?.description,
          },
          backgroundImageAlt: payload?.backgroundImageAlt,
        });
      }
    });

    return () => unbind();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emitter, ModalEvents]);

  // const { createResume, updateResume } = useContext(DatabaseContext);

  const schema = Yup.object().shape({
    icon: Yup.object({
      value: Yup.string().required(
        "An Icon is required to add an Industry, select one",
      ),
      label: Yup.string().required(
        "An Icon is required to add an Industry, select one",
      ),
    }),
    name: Yup.string()
      .min(5, t("shared.forms.validation.min", { number: 5 }))
      .required(t("shared.forms.validation.required")),
  });
  // if (!imgPreview) {
  //   setInitialValues({ name: "", preview: img });
  // }

  return (
    <TypedIndustryMutation
      onCompleted={(data, errors) =>
        showNotification(
          data.rcreateIndustry,
          errors,
          alert,
          "vacancyErrors",
          "Industry Created",
        )
      }
    >
      {(industryCreate) => {
        return (
          <TypedIndustryUpdateMutation
            onCompleted={(data, errors) =>
              showNotification(
                data.updateIndustry,
                errors,
                alert,
                "vacancyErrors",
                "Industry Updated",
              )
            }
          >
            {(industryUpdate) => {
              return (
                <Formik
                  validateOnBlur
                  initialValues={initialValues}
                  validationSchema={schema}
                  enableReinitialize
                >
                  {(formik) => (
                    <DataModal
                      title={{
                        create: "Add New Industry",
                        edit: "Edit Industry",
                      }}
                      onEdit={(data) => {
                        console.log(data);
                        industryUpdate({
                          variables: {
                            id: industryData?.id || "",
                            description: data?.variables?.description,
                            descriptionPlainText:
                              data?.variables?.descriptionPlaintext,
                            name: data?.variables?.name,
                            icon: data?.variables?.icon?.value,
                            seo: {
                              title: data?.variables?.seo?.title?.includes(
                                "TheDatabase Kenya",
                              )
                                ? data?.variables?.seo?.title
                                : `${data?.variables?.name} - TheDatabase Kenya`,
                              description: data?.variables?.seo?.description,
                            },
                            backgroundImageAlt:
                              data?.variables?.backgroundImageAlt,
                          },
                        });
                      }}
                      onCreate={(data) => {
                        industryCreate({
                          variables: {
                            description: data?.variables?.description,
                            descriptionPlainText:
                              data?.variables?.descriptionPlaintext,
                            name: data?.variables?.name,
                            icon: data?.variables?.icon?.value,
                            seo: {
                              title:
                                data?.variables?.seo?.title === ""
                                  ? `${data?.variables?.name} - TheDatabase Kenya`
                                  : data?.variables?.seo?.title,
                              description: data?.variables?.seo?.description,
                            },
                            backgroundImageAlt:
                              data?.variables?.backgroundImageAlt,
                          },
                        });
                      }}
                      event={ModalEvents.INDUSTRY_MODAL}
                    >
                      <div className="form grid grid-cols-2 gap-6">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Industry Name"
                          placeholder="Accouting and Finance"
                          name="name"
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="SEO Title"
                          placeholder="Accouting and Finance - TheDatabase Kenya"
                          name="seo.title"
                        />
                      </div>
                      <Suspense fallback={<Loader />}>
                        <div className="form grid grid-cols-2 gap-6">
                          <IconsSearchInput
                            name={"icon"}
                            formik={formik}
                            label={"Icon Search"}
                          />
                          <p style={{ padding: "10px" }}>
                            <i
                              style={{
                                fontSize: "36px",
                                height: "42px",
                                transition: "0.4s",
                                color: "#1849B1",
                                display: "inline-block",
                              }}
                              className={
                                formik?.values?.icon?.value || "fa fa-question"
                              }
                            />
                          </p>
                        </div>
                      </Suspense>
                      <div className="form grid grid-cols-1">
                        <FormikControl
                          control="textarea"
                          label="Industry Description"
                          name="descriptionPlaintext"
                          placeholder="Give a short description of the industry"
                          rte={false}
                          fullWidth
                        />
                      </div>

                      <p className="leading-loose">
                        Add an icon for visual appeal ... search and add
                      </p>
                    </DataModal>
                  )}
                </Formik>
              );
            }}
          </TypedIndustryUpdateMutation>
        );
      }}
    </TypedIndustryMutation>
  );
};

export default memo(IndustriesModal);
