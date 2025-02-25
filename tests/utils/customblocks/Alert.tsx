import { createBlockSpec, defaultProps } from "bocknoate-core";
import { ReactSlashMenuItem } from "bocknoate-react";
import { RiAlertFill } from "react-icons/ri";

const values = {
  warning: {
    icon: "⚠️",
    backgroundColor: "#fbf3db",
  },
  error: {
    icon: "❌",
    backgroundColor: "#fbe4e4",
  },
  info: {
    icon: "ℹ️",
    backgroundColor: "#ddebf1",
  },
  success: {
    icon: "✅",
    backgroundColor: "#ddedea",
  },
} as const;

export const Alert = createBlockSpec({
  type: "alert" as const,
  propSchema: {
    textAlignment: defaultProps.textAlignment,
    textColor: defaultProps.textColor,
    type: {
      default: "warning",
      values: ["warning", "error", "info", "success"],
    },
  } as const,
  containsInlineContent: true,
  render: (block, editor) => {
    // Tests to see if types are correct:

    let test: "alert" = block.type;
    console.log(test);

    // @ts-expect-error
    let test1: "othertype" = block.type;
    console.log(test1);

    const parent = document.createElement("div");
    parent.setAttribute(
      "style",
      `display: flex; background-color: ${
        values[block.props.type as keyof typeof values].backgroundColor
      }`
    );

    const icon = document.createElement("div");
    icon.innerText = values[block.props.type as keyof typeof values].icon;
    icon.setAttribute("contenteditable", "false");
    icon.setAttribute(
      "style",
      "margin-right: 0.5rem; user-select: none; cursor: pointer;"
    );
    icon.addEventListener("click", () => {
      const type = editor.getBlock(block)!.props.type;

      if (type === "warning") {
        parent.setAttribute(
          "style",
          `display: flex; background-color: ${values["error"].backgroundColor}`
        );
        editor.updateBlock(editor.getBlock(block)!, {
          props: {
            type: "error",
          },
        });
      } else if (type === "error") {
        parent.setAttribute(
          "style",
          `display: flex; background-color: ${values["info"].backgroundColor}`
        );
        editor.updateBlock(editor.getBlock(block)!, {
          props: {
            type: "info",
          },
        });
      } else if (type === "info") {
        parent.setAttribute(
          "style",
          `display: flex; background-color: ${values["success"].backgroundColor}`
        );
        editor.updateBlock(editor.getBlock(block)!, {
          props: {
            type: "success",
          },
        });
      } else if (type === "success") {
        parent.setAttribute(
          "style",
          `display: flex; background-color: ${values["warning"].backgroundColor}`
        );
        editor.updateBlock(editor.getBlock(block)!, {
          props: {
            type: "warning",
          },
        });
      } else {
        throw new Error("Unknown alert type");
      }
    });

    const text = document.createElement("div");

    parent.appendChild(icon);
    parent.appendChild(text);

    return {
      dom: parent,
      contentDOM: text,
    };
  },
});

export const insertAlert = new ReactSlashMenuItem<{
  alert: typeof Alert;
}>(
  "Insert Alert",
  (editor) => {
    editor.insertBlocks(
      [
        {
          type: "alert",
        },
      ],
      editor.getTextCursorPosition().block,
      "after"
    );
  },
  ["alert", "notification", "emphasize", "warning", "error", "info", "success"],
  "Media",
  <RiAlertFill />,
  "Insert an alert block to emphasize text"
);
