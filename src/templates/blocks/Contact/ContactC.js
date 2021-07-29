import { useTranslation } from "react-i18next";
import React, { memo, useContext } from "react";
import { hasAddress, isItemVisible, safetyCheck } from "utils";
import BirthDateA from "../BirthDate/BirthDateA";
import PageContext from "contexts/page/page.provider";

const ContactItem = ({ value, label, link }) =>
  value ? (
    <div className="flex flex-col">
      <h6 className="capitalize font-semibold">{label}</h6>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <span className="font-medium break-all">{value}</span>
        </a>
      ) : (
        <span className="font-medium break-all">{value}</span>
      )}
    </div>
  ) : null;

const ContactC = () => {
  const { t } = useTranslation();
  const { data } = useContext(PageContext);

  return (
    <div className="text-xs grid gap-2">
      {hasAddress(data.owner.defaultAddress) && (
        <div>
          <h6 className="capitalize font-semibold">
            {t("shared.forms.address")}
          </h6>
          <div className="flex flex-col text-xs">
            <span>{data.owner?.defaultAddress?.streetAddress1}</span>
            <span>{data.owner?.defaultAddress?.streetAddress2}</span>
            <span>
              {data.owner?.defaultAddress?.city}{" "}
              {data.owner?.defaultAddress?.postalCode}
            </span>
          </div>
        </div>
      )}

      <ContactItem
        label={`Phone Number`}
        value={data.owner?.phone}
        icon="phone"
        link={`tel:${data.owner?.phone}`}
      />
      <ContactItem
        label={`Website`}
        value={data.owner?.website}
        icon="website"
        link={data.owner?.website}
      />
      <ContactItem
        label={`Email Address`}
        value={data.owner?.email}
        icon="email"
        link={`mailto:${data.owner?.email}`}
      />

      <BirthDateA />

      {safetyCheck(data.social) &&
        data.social.items.map(
          (x) =>
            isItemVisible(x) && (
              <ContactItem
                key={x.id}
                value={x.username}
                label={x.network}
                link={x.link}
              />
            ),
        )}
    </div>
  );
};

export default memo(ContactC);
