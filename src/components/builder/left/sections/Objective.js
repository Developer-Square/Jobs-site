import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import Heading from "components/shared/Heading";
import Input from "components/shared/Input";

const Objective = ({ id }) => {
  const { t } = useTranslation();

  return (
    <section>
      <Heading id={id} />

      <Input
        name="heading"
        label={t("builder.sections.heading")}
        path={`${id}.heading`}
      />

      <Input
        type="textarea"
        label={t("shared.forms.summary")}
        path="objective.descriptionPlaintext"
      />
    </section>
  );
};

export default memo(Objective);
