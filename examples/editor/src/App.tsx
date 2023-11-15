// import logo from './logo.svg'
import "bocknoate-core/style.css";
import {
  BlockNoteView,
  createReactBlockSpec,
  getDefaultReactSlashMenuItems,
  useBlockNote,
} from "bocknoate-react";
import styles from "./App.module.css";
import {
  BlockIdentifier,
  BlockNoteEditor,
  defaultBlockSchema,
  uploadToTmpFilesDotOrg_DEV_ONLY,
} from "bocknoate-core";

type WindowWithProseMirror = Window & typeof globalThis & { ProseMirror: any };

const CustomBlock = createReactBlockSpec({
  type: "query",
  propSchema: {
    hideToolbar: {
      default: true,
    },
  },
  render: ({ block }) => {
    return (
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          borderRadius: "4px",
        }}>
        <p>Custom block</p>
        <input></input>
        <input></input>
        <p>{block.props.hideToolbar}</p>
      </div>
    );
  },
  containsInlineContent: false,
});

const CustomSchema = {
  ...defaultBlockSchema,
  query: CustomBlock,
};

const runAnalyst = (editor: BlockNoteEditor<typeof CustomSchema>) => {
  editor.replaceBlocks(
    [editor.getTextCursorPosition().block.id as BlockIdentifier],
    [
      {
        type: "query",
        props: {
          hideToolbar: true,
        },
      },
    ]
  );
};

function App() {
  const editor = useBlockNote({
    blockSchema: CustomSchema,
    slashMenuItems: [
      ...getDefaultReactSlashMenuItems(),
      {
        name: "Analyst",
        aliases: [],
        execute: (editor) => runAnalyst(editor),
      },
    ],
    onEditorContentChange: (editor) => {
      console.log(editor.topLevelBlocks);
    },
    domAttributes: {
      editor: {
        class: styles.editor,
        "data-test": "editor",
      },
    },
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
  });

  // Give tests a way to get prosemirror instance
  (window as WindowWithProseMirror).ProseMirror = editor?._tiptapEditor;

  return <BlockNoteView editor={editor} />;
}

export default App;
