import React, { memo } from "react";
import cx from "classnames";
import * as styles from "./Templates.module.css";
import { handleKeyUp } from "utils";
import { useDispatch, useSelector } from "contexts/resume/resume.provider";
import Heading from "components/shared/Heading";
import templateOptions from "data/templateOptions";

const Templates = ({ id }) => {
  const dispatch = useDispatch();
  const template = useSelector("resumemetadata.template");

  const handleClick = (value) => {
    dispatch({
      type: "on_input",
      payload: {
        path: "resumemetadata.template",
        value,
      },
    });
  };

  return (
    <section>
      <Heading id={id} />

      <div className="grid grid-cols-2 gap-4">
        {templateOptions.map((x) => (
          <div
            key={x.id}
            tabIndex="0"
            role="button"
            onKeyUp={(e) => handleKeyUp(e, () => handleClick(x.id))}
            onClick={() => handleClick(x.id)}
            className={cx(styles.template, {
              [styles.selected]: template === x.id,
            })}
          >
            <img alt={x.name} src={`${x.image}`} />

            <span>{x.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(Templates);
