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
    <section className="container uploader" style={{ width: "100%" }}>
      {rest.version && rest.version === "profile" ? (
        <div className="">
          <label
            className="upload-btn"
            style={{ margin: 0, color: "#fff", marginRight: "10px" }}
          >
            <input {...getInputProps()} />
            <i className="fa fa-upload" /> Browse
          </label>
          <span className="fake-input">No file selected</span>
        </div>
      ) : (
        // <div className="edit-profile-photo" {...getRootProps()}>
        //   {thumbs}
        //   <div className="change-photo-btn">
        //     <div className="photoUpload">
        //       <span>
        //         <i className="fa fa-upload" /> Upload Photo
        //       </span>
        //       <input {...getInputProps()} />
        //     </div>
        //   </div>
        // </div>
        <>
          {minimal ? (
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
                {`${doc ? (multiple ? "document(s)" : "document") : "image"}`}{" "}
                here.
              </Text>
            </Container>
          )}
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
      )}
    </section>
  );
}

export default Uploader;
