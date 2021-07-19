import { MdFlare } from "react-icons/md";
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

const ContactD = () => {
  const { data } = useContext(PageContext);

  return (
    <div
      className="my-4 relative w-full border-2 grid gap-2 text-center text-xs py-5"
      style={{
        borderColor: data.metadata.colors.primary,
      }}
    >
      <div
        className="absolute text-center"
        style={{
          top: "-11px",
          left: "50%",
          marginLeft: "-10px",
          color: data.metadata.colors.primary,
        }}
      >
        <MdFlare size="20px" />
      </div>

      {hasAddress(data.profile.address) && (
        <div>
          <h6 className="capitalize font-semibold">Address</h6>
          <div className="flex flex-col text-xs">
            <span>{data.profile.address.line1}</span>
            <span>{data.profile.address.line2}</span>
            <span>
              {data.profile.address.city} {data.profile.address.pincode}
            </span>
          </div>
        </div>
      )}

      <ContactItem
        label={`Phone Number`}
        value={data.profile.phone}
        icon="phone"
        link={`tel:${data.profile.phone}`}
      />
      <ContactItem
        label={`Website`}
        value={data.profile.website}
        icon="website"
        link={data.profile.website}
      />
      <ContactItem
        label={`Email Address`}
        value={data.profile.email}
        icon="email"
        link={`mailto:${data.profile.email}`}
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
                link={x.url}
              />
            ),
        )}
    </div>
  );
};

export default memo(ContactD);