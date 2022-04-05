import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { UploadIcon } from "../AllSvgIcon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/fontawesome-free-solid";
import Button from "components/Button/Button";

const PicInput = styled.div`
  margin-right: 8px;
  opacity: 1;

  color: #5f6368;
  fill: #5f6368;

  -webkit-user-select: none;
  -webkit-transition: background 0.3s;
  transition: background 0.3s;
  border: 0;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  height: 48px;
  outline: none;
  overflow: hidden;
  position: relative;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  width: 48px;
  z-index: 0;
`;

const Text = styled.span`
  color: black;
  margin-top: 15px;
  text-align: center;
`;

const TextHighlighted = styled.span`
  color: blue;
  font-weight: bold;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #e6e6e6;
  border-style: dashed;
  background-color: #ffffff;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
`;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
`;

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Uploader(props) {
  const {
    onChange,
    imageURL,
    action,
    directUpload,
    doc,
    restrict,
    multiple,
    minimal,
    preview,
    showIcon = true,
    ...rest
  } = props;
  const [files, setFiles] = useState(
    imageURL ? [{ name: "demo", preview: imageURL }] : [],
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: doc ? (restrict ? restrict : ".doc, .docx, .pdf") : "image/*",
    multiple: multiple,
    maxFiles: multiple ? 4 : 1,
    onDrop: useCallback(
      (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        );
        onChange(acceptedFiles);
        if (directUpload) {
          action(acceptedFiles);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onChange],
    ),
  });
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size / 1000} KB
    </li>
  ));

  const removeFile = (file) => {
    acceptedFiles.splice(file, 1);
  };

  const thumbs = files.map((file) => (
    <Thumb
      style={
        rest.version && rest.version === "profile"
          ? {
              width: "auto",
              height: "100px",
            }
          : {}
      }
      key={file.name}
    >
      <div style={thumbInner}>
        <img
          src={typeof file === "string" ? file : file.preview}
          style={img}
          alt={file.name}
        />
      </div>
    </Thumb>
  ));
  const minimalThumbs = files.map((file) => (
    <div key={file.name}>
      <p>{file.name}</p>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <section className="container-x uploader" style={{ width: "100%" }}>
      {rest.version && rest.version === "profile" ? (
        <div className="">
          <label
            className="upload-btn"
            style={{ margin: 0, color: "#fff", marginRight: "10px" }}
          >
            <input {...getInputProps()} />
            {showIcon && <i className="fa fa-upload" />}
            Browse
          </label>
          <span className="fake-input">No file selected</span>
        </div>
      ) : rest?.version === "stepper" ? (
        <>
          <div className="flex flex-col lg:grid lg:gap-4 2xl:gap-6 lg:grid-cols-4 2xl:row-span-2 ">
            <div className="lg:order-4 lg:row-span-2 2xl:row-span-1 lg:col-span-1">
              <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
                {files.length === 0 && (
                  <li
                    id="empty"
                    className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                  >
                    <img
                      className="mx-auto w-32"
                      src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                      alt="no data"
                    />
                    <span className="text-small text-gray-500">
                      No file selected
                    </span>
                  </li>
                )}

                {files.length > 0 &&
                  files.map((file, i) => (
                    <li className="block h-24" key={i}>
                      <article
                        tabIndex={0}
                        className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm"
                      >
                        <img
                          alt="upload preview"
                          src={typeof file === "string" ? file : file.preview}
                          className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
                        />
                        <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                          <div className="flex">
                            <button
                              onClick={() => removeFile(file)}
                              className="delete ml-auto focus:outline-none hover:bg-gray-200 p-1 rounded-md"
                            >
                              <svg
                                className="pointer-events-none fill-current w-4 h-4 ml-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className="pointer-events-none"
                                  d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                />
                              </svg>
                            </button>
                          </div>
                        </section>
                        {/* <h1 className="flex-1">
                          {file?.name} {file.size / 1000} KB
                        </h1> */}
                      </article>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="lg:order-4 lg:row-span-2 2xl:row-span-1 lg:col-span-1">
              <Container {...getRootProps()}>
                <input {...getInputProps()} />
                <UploadIcon />
                <Text>
                  <TextHighlighted>Drag/Upload</TextHighlighted> your{" "}
                  {`${doc ? (multiple ? "document(s)" : "document") : "image"}`}{" "}
                  here.
                </Text>
              </Container>
            </div>
          </div>
          <p className="text-sm text-gray-300">
            <span>File types: png, jpg, jpeg, types of images</span>
          </p>
        </>
      ) : minimal ? (
        <Button
          size="small"
          {...getRootProps()}
          style={{
            background: "transparent",
            color: "#ec7623",
            textTransform: "none",
            margin: 0,
          }}
          title={
            <PicInput>
              <input {...getInputProps()} />
              <FontAwesomeIcon
                icon={faFileImage}
                className="icon"
                style={{
                  height: "100%",
                  width: "50%",
                }}
              />
            </PicInput>
          }
        />
      ) : (
        <Container {...getRootProps()}>
          <input {...getInputProps()} />
          <UploadIcon />
          <Text>
            <TextHighlighted>Drag/Upload</TextHighlighted> your{" "}
            {`${doc ? (multiple ? "document(s)" : "document") : "image"}`} here.
          </Text>
        </Container>
      )}
      {!rest?.version === "stepper" ? (
        <>
          {preview ? (
            multiple ? (
              <ul>{acceptedFileItems}</ul>
            ) : (
              thumbs && <ThumbsContainer>{thumbs}</ThumbsContainer>
            )
          ) : (
            minimalThumbs
          )}
        </>
      ) : (
        minimalThumbs
      )}
    </section>
  );
}

export default Uploader;
