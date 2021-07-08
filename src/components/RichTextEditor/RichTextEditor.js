import EditorJS from "@editorjs/editorjs";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import classNames from "classnames";
import React from "react";

import { tools } from "./RichTextEditorContent";
import useStyles from "./styles";

const RichTextEditor = ({
  data,
  disabled,
  error,
  helperText,
  label,
  name,
  onChange,
  onReady,
}) => {
  const classes = useStyles({});

  const [isFocused, setFocus] = React.useState(false);
  const editor = React.useRef();
  const editorContainer = React.useRef();
  const prevTogglePromise = React.useRef(); // used to await subsequent toggle invocations

  React.useEffect(
    () => {
      if (data) {
        editor.current = new EditorJS({
          data,
          holder: editorContainer.current,
          logLevel: "ERROR",
          onChange: async (api) => {
            const savedData = await api.saver.save();
            onChange(savedData);
          },
          onReady: () => {
            // FIXME: This throws an error and is not working
            // const undo = new Undo({ editor });
            // undo.initialize(data);

            if (onReady) {
              onReady();
            }
          },
          readOnly: disabled,
          tools,
        });
      }

      return editor.current?.destroy;
    },
    // Rerender editor only if changed from undefined to defined state
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data === undefined],
  );

  React.useEffect(() => {
    const toggle = async () => {
      if (editor.current?.readOnly) {
        // readOnly.toggle() by itself does not enqueue the events and will result in a broken output if invocations overlap
        // Remove this logic when this is fixed in EditorJS
        if (prevTogglePromise.current instanceof Promise) {
          await prevTogglePromise.current;
        }
        prevTogglePromise.current = editor.current.readOnly.toggle(disabled);
      }
    };

    toggle();
  }, [disabled]);

  return (
    <FormControl
      data-test="richTextEditor"
      data-test-id={name}
      disabled={disabled}
      error={error}
      fullWidth
      variant="outlined"
    >
      <InputLabel focused={true} shrink={true}>
        {label}
      </InputLabel>
      <div
        className={classNames(classes.editor, classes.root, {
          [classes.rootActive]: isFocused,
          [classes.rootDisabled]: disabled,
          [classes.rootError]: error,
        })}
        ref={editorContainer}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
