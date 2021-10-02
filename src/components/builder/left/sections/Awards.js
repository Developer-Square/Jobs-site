import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import Heading from "components/shared/Heading";
import Input from "components/shared/Input";
import List from "../../lists/List";

const Awards = ({ id, event }) => {
  const path = `${id}.items`;
  console.log(path);
  const { t } = useTranslation();

  return (
    <section>
      <Heading id={id} />

      <Input
        name="heading"
        label={t("builder.sections.heading")}
        path={`${id}.heading`}
      />

      <List
        path={path}
        event={event}
        titlePath="title"
        subtitlePath="awarder"
        textPath="summary"
      />
    </section>
  );
};

export default memo(Awards);
