import { isEmpty, isFunction } from "lodash";
import { toast } from "react-toastify";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "contexts/resume/resume.provider";
import ModalContext from "contexts/modal/modal.provider";
import BaseModal from "./BaseModal";
import Button from "components/shared/Button";
import { getModalText } from "utils";
// import { objDiff } from "utils";

const DataModal = ({
  name,
  path,
  event,
  title,
  buttonText,
  onEdit,
  onCreate,
  children,
  ...rest
}) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const { emitter } = useContext(ModalContext);
  const { values, setValues, resetForm, validateForm } = useFormikContext();

  useEffect(() => {
    const unbind = emitter.on(event, (payload) => {
      setOpen(true);
      setData(payload);
    });

    return () => unbind();
  }, [emitter, event]);

  useEffect(() => {
    data && setValues(data) && setEditMode(true);
  }, [data, setValues]);

  const onSubmit = async (newData) => {
    // console.log(objDiff(values, newData, "id"));
    setLoading(true);

    const errors = await validateForm();

    if (isEmpty(errors)) {
      if (isEditMode) {
        if (data !== newData) {
          isFunction(onEdit)
            ? await onEdit({ variables: newData })
            : dispatch({
                type: "on_edit_item",
                payload: {
                  path,
                  value: newData,
                },
              });
        }
      } else {
        isFunction(onCreate)
          ? await onCreate({ variables: newData })
          : dispatch({
              type: "on_add_item",
              payload: {
                path,
                value: newData,
              },
            });
      }

      setLoading(false);
      modalRef.current.handleClose();
    } else {
      toast.error(t("builder.toasts.formErrors"));
      setLoading(false);
    }
  };

  const getTitle = buttonText
    ? buttonText
    : isEmpty(title)
    ? getModalText(isEditMode, name, t)
    : isEditMode
    ? title.edit
    : title.create;

  const submitAction = (
    <Button type="submit" isLoading={loading} onClick={() => onSubmit(values)}>
      {loading ? t("shared.buttons.loading") : getTitle}
    </Button>
  );

  const onDestroy = () => {
    resetForm();
    setEditMode(false);
    setData(null);
  };

  return (
    <BaseModal
      ref={modalRef}
      action={submitAction}
      onDestroy={onDestroy}
      state={[open, setOpen]}
      title={getTitle}
    >
      {children}
    </BaseModal>
  );
};

export default memo(DataModal);
