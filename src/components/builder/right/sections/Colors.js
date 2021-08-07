/* eslint-disable jsx-a11y/control-has-associated-label */
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import * as styles from "./Colors.module.css";
import { handleKeyUp } from "utils";
import { useDispatch } from "contexts/resume/resume.provider";
import Heading from "components/shared/Heading";
import Input from "components/shared/Input";
import colorOptions from "data/colorOptions";

const Colors = ({ id }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = (value) => {
    dispatch({
      type: "on_input",
      payload: {
        path: "resumemetadata.primaryColor",
        value,
      },
    });
  };

  return (
    <section>
      <Heading id={id} />

      <div className="mb-6 grid grid-cols-8 gap-x-2 gap-y-6">
        {colorOptions.map((color) => (
          <div
            key={color}
            tabIndex="0"
            role="button"
            className={styles.circle}
            style={{ backgroundColor: color }}
            onKeyUp={(e) => handleKeyUp(e, () => handleClick(color))}
            onClick={() => handleClick(color)}
          />
        ))}
      </div>

      <Input
        type="color"
        name="primary"
        label={t("builder.colors.primary")}
        placeholder="#FF4081"
        path="resumemetadata.primaryColor"
      />

      <Input
        type="color"
        name="text"
        label={t("builder.colors.text")}
        placeholder="#444444"
        path="resumemetadata.textColor"
      />

      <Input
        type="color"
        name="background"
        label={t("builder.colors.background")}
        placeholder="#FFFFFF"
        path="resumemetadata.backgroundColor"
      />
    </section>
  );
};

export default memo(Colors);
