import React, { useState, useEffect } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const getEditorValue = (form, field) => {
  let editorVal = EditorState.createEmpty();
  if (form.dirty) {
    return;
  }
  if (!field.value) {
    return;
  }

  const contentBlock = htmlToDraft(draftToHtml(JSON.parse(field.value)));
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks,
    );
    editorVal = EditorState.createWithContent(contentState);
  }

  return editorVal;
};

function EditorField({
  input,
  meta,
  field,
  form,
  label,
  placeholder,
  labelCss,
}) {
  const [editorState, setEditorState] = useState(getEditorValue(form, field));

  useEffect(() => {
    if (!field.value) {
      return;
    }

    const contentBlock = htmlToDraft(draftToHtml(JSON.parse(field.value)));
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onEditorStateChange(editorState) {
    setEditorState(editorState);
    form.setFieldValue(
      field.name,
      // convertToRaw(editorState.getCurrentContent()),
      // draftToHtml(convertToRaw(editorState.getCurrentContent()))
      JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    );
  }

  console.log(editorState);
  return (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        placeholder={placeholder}
        onEditorStateChange={(val) => onEditorStateChange(val)}
        spellCheck
      />
    </>
  );
}

export default EditorField;
