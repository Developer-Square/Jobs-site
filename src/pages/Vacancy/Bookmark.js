import React from "react";
import Button from "components/Button/Button";
import { showNotification } from "helpers";
import { TypedMutation } from "core/mutations";
import { BOOKMARK_VACANCY } from "graphql/mutations";

const TypedBookmarkMutation = TypedMutation(BOOKMARK_VACANCY);

const Bookmark = ({
  data,
  isAuthenticated,
  handleLoginNotification,
  toast,
}) => {
  return (
    <TypedBookmarkMutation
      onCompleted={(data, errors) =>
        showNotification(
          data.bookmarkVacancy,
          errors,
          null,
          "errors",
          "job Bookmarked Created",
          null,
        )
      }
    >
      {(bookmarkVacancy) => {
        function bookmarkJob() {
          if (data?.isActive) {
            bookmarkVacancy({
              variables: {
                job: data.id,
              },
            });
          } else {
            alert.show(
              {
                title: "This Job can No longer be bookmarked.",
              },
              { type: "info", timeout: 5000 },
            );
            toast.info("This Job can No longer be bookmarked.");
          }
        }
        return (
          <Button
            className="popup-with-zoom-anim button mt-8 ml-auto"
            onClick={isAuthenticated ? bookmarkJob : handleLoginNotification}
            title={
              <div style={{ color: "#FFFFFF" }}>
                <i className="fa fa-star" /> Bookmark This Job
              </div>
            }
          />
        );
      }}
    </TypedBookmarkMutation>
  );
};

export default Bookmark;
