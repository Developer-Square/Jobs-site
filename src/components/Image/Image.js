import React, { useEffect, useState } from "react";
import { Img } from "react-image";
import placeholder from "./job-logo-placeholder.png";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import axios from "axios";

const Placeholder = () => <img src={placeholder} alt="product img loder" />;

export default function ImageWrapper({ url, alt, className, style, id }) {
  const [pictureUrl, setPictureUrl] = useState("");
  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/accounts/${id}`, tokenConfig())
        .then(async (res) => {
          const isIndividual = res.data.is_individual;
          if (isIndividual === true) {
            try {
              axios
                .get(`${BASE_URL}/individual/`, tokenConfig())
                .then((res) => {
                  let orgProfile = res.data.results.filter(
                    (filteredProfile) => filteredProfile.user === id
                  )[0].image;
                  setPictureUrl(orgProfile);
                })
                .catch((err) => {
                  console.log("Catching Errors:", err);
                });
            } catch (error) {
              console.log("Catching Errors:", error);
            }
          } else {
            try {
              axios
                .get(`${BASE_URL}/organization/`, tokenConfig())
                .then((res) => {
                  let individualProfile = res.data.results.filter(
                    (filteredProfile) => filteredProfile.user === id
                  )[0].logo;
                  setPictureUrl(individualProfile);
                })
                .catch((err) => {
                  console.log("Catching Errors:", err);
                });
            } catch (error) {
              console.log("Catching Errors:", error);
            }
          }

          await new Promise((resolve) => setTimeout(resolve, 1000));
        })
        .catch((err) => {
          console.log("Catching Errors:", err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Img
      draggable={false}
      style={style}
      src={id ? pictureUrl : url}
      alt={alt}
      loader={<Placeholder />}
      unloader={<Placeholder />}
      className={className}
    />
  );
}
