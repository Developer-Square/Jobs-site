import React from "react";
import Button from "components/Button/Button";
import { showNotification } from "helpers";
import { TypedMutation } from "core/mutations";
import { BOOKMARK_VACANCY } from "graphql/mutations";

const TypedBookmarkMutation = TypedMutation(BOOKMARK_VACANCY);

const Bookmark = ({ data, isAuthenticated, handleLoginNotification }) => {
  return (
    <TypedBookmarkMutation
      onCompleted={(data, errors) =>
        showNotification(
          data.bookmarkVacancy,
          errors,
          alert,
          "vacancyErrors",
          "job Bookmarked Created",
        )
      }
    >
      {(bookmarkVacancy) => {
        function bookmarkJob() {
          bookmarkVacancy({
            variables: {
              job: data.id,
            },
          });
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
