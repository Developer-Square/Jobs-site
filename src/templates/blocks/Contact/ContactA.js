import { FaCaretRight } from "react-icons/fa";
import { get } from "lodash";
import React, { memo, useContext } from "react";
import { isItemVisible, safetyCheck } from "utils";
import BirthDateB from "../BirthDate/BirthDateB";
import Icons from "../Icons";
import PageContext from "contexts/page/page.provider";

const ContactItem = ({ value, icon, link }) => {
  const { data } = useContext(PageContext);
  const Icon = get(Icons, icon && icon.toLowerCase(), FaCaretRight);

  return value ? (
    <div className="flex items-center">
      <Icon
        size="10px"
        className="mr-2"
        style={{ color: data.metadata.colors.primary }}
      />
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <span className="font-medium break-all">{value}</span>
        </a>
      ) : (
        <span className="font-medium break-all">{value}</span>
      )}
    </div>
  ) : null;
};

const ContactA = () => {
  const { data } = useContext(PageContext);

  return (
    <div className="text-xs grid gap-2">
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

      <BirthDateB />

      {safetyCheck(data.social) &&
        data.social.items.map(
          (x) =>
            isItemVisible(x) && (
              <ContactItem
                key={x.id}
                value={x.username}
                icon={x.network}
                link={x.url}
              />
            ),
        )}
    </div>
  );
};

export default memo(ContactA);