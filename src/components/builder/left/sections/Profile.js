import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import Heading from "components/shared/Heading";
import Input from "components/shared/Input";
import PhotoUpload from "components/shared/PhotoUpload";

const Profile = ({ id }) => {
  const { t } = useTranslation();

  return (
    <section>
      <Heading id={id} />

      <Input
        name="heading"
        label={t("builder.sections.heading")}
        path={`${id}.heading`}
      />

      <PhotoUpload />

      <div className="grid grid-cols-2 gap-6">
        <Input
          name="firstName"
          label={t("builder.profile.firstName")}
          path="owner.firstName"
        />
        <Input
          name="lastName"
          label={t("builder.profile.lastName")}
          path="owner.lastName"
        />
      </div>

      <Input
        name="subtitle"
        label={t("shared.forms.subtitle")}
        path="owner.seeker.title"
      />

      <Input
        type="date"
        name="birthDate"
        label={t("builder.profile.birthDate")}
        path="owner.seeker.dateOfBirth"
      />

      <hr />

      <Input
        name="addressLine1"
        label={t("builder.profile.address.line1")}
        path="owner.defaultAddress.streetAddress1"
      />
      <Input
        name="addressLine2"
        label={t("builder.profile.address.line2")}
        path="owner.defaultAddress.streetAddress2"
      />

      <div className="grid grid-cols-2 gap-6">
        <Input
          name="city"
          label={t("builder.profile.address.city")}
          path="owner.defaultAddress.city"
        />
        <Input
          name="pincode"
          label={t("builder.profile.address.pincode")}
          path="owner.defaultAddress.postalCode"
        />
      </div>

      <hr />

      <Input name="phone" label={t("shared.forms.phone")} path="owner.phone" />
      <Input name="email" label={t("shared.forms.email")} path="owner.email" />
    </section>
  );
};

export default memo(Profile);
