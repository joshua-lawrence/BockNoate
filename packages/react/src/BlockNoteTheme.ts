import { CSSObject, MantineThemeOverride } from "@mantine/core";
import { blockStyles } from "bocknoate-core";
import _ from "lodash";

export type CombinedColor = {
  text: string;
  background: string;
};

export type ColorScheme = {
  editor: CombinedColor;
  menu: CombinedColor;
  tooltip: CombinedColor;
  hovered: CombinedColor;
  selected: CombinedColor;
  disabled: CombinedColor;
  shadow: string;
  border: string;
  sideMenu: string;
  highlightColors: {
    gray: CombinedColor;
    brown: CombinedColor;
    red: CombinedColor;
    orange: CombinedColor;
    yellow: CombinedColor;
    green: CombinedColor;
    blue: CombinedColor;
    purple: CombinedColor;
    pink: CombinedColor;
  };
};

export type ComponentStyles = Partial<{
  // Slash Menu, Formatting Toolbar dropdown, color picker dropdown
  Menu: CSSObject;
  // Icon in the color picker dropdown (Formatting Toolbar & Drag Handle Menu)
  ColorIcon: CSSObject;
  DragHandleMenu: CSSObject;
  // Menu to edit hyperlinks (in Formatting Toolbar & Hyperlink Toolbar)
  EditHyperlinkMenu: CSSObject;
  Editor: CSSObject;
  // Used in the Image Toolbar
  FileInput: CSSObject;
  Tabs: CSSObject;
  TextInput: CSSObject;
  // Wraps Formatting Toolbar & Hyperlink Toolbar
  Toolbar: CSSObject;
  // Appears on hover for Formatting Toolbar
  // & Hyperlink Toolbar buttons
  Tooltip: CSSObject;
  SlashMenu: CSSObject;
  SideMenu: CSSObject;
}>;

export type BlocknoteTheme = {
  colors: ColorScheme;
  borderRadius: number;
  fontFamily: string;
  componentStyles?: (theme: BlocknoteTheme) => ComponentStyles;
};

export const blockNoteToMantineTheme = (
  blocknoteTheme: BlocknoteTheme
): MantineThemeOverride => {
  const shadow = `0 4px 12px ${blocknoteTheme.colors.shadow}`;
  const border = `1px solid ${blocknoteTheme.colors.border}`;

  const textColors = {
    default: blocknoteTheme.colors.editor.text,
    gray: blocknoteTheme.colors.highlightColors.gray.text,
    brown: blocknoteTheme.colors.highlightColors.brown.text,
    red: blocknoteTheme.colors.highlightColors.red.text,
    orange: blocknoteTheme.colors.highlightColors.orange.text,
    yellow: blocknoteTheme.colors.highlightColors.yellow.text,
    green: blocknoteTheme.colors.highlightColors.green.text,
    blue: blocknoteTheme.colors.highlightColors.blue.text,
    purple: blocknoteTheme.colors.highlightColors.purple.text,
    pink: blocknoteTheme.colors.highlightColors.pink.text,
  };

  const backgroundColors = {
    default: blocknoteTheme.colors.editor.background,
    gray: blocknoteTheme.colors.highlightColors.gray.background,
    brown: blocknoteTheme.colors.highlightColors.brown.background,
    red: blocknoteTheme.colors.highlightColors.red.background,
    orange: blocknoteTheme.colors.highlightColors.orange.background,
    yellow: blocknoteTheme.colors.highlightColors.yellow.background,
    green: blocknoteTheme.colors.highlightColors.green.background,
    blue: blocknoteTheme.colors.highlightColors.blue.background,
    purple: blocknoteTheme.colors.highlightColors.purple.background,
    pink: blocknoteTheme.colors.highlightColors.pink.background,
  };

  const editorBorderRadius = `${Math.max(
    blocknoteTheme.borderRadius + 2,
    1
  )}px`;
  const outerBorderRadius = `${blocknoteTheme.borderRadius}px`;
  const innerBorderRadius = `${Math.max(blocknoteTheme.borderRadius - 2, 1)}px`;

  return {
    activeStyles: {
      // Removes button press effect.
      transform: "none",
    },
    components: {
      // Slash Menu, Formatting Toolbar dropdown, color picker dropdown
      Menu: {
        styles: () => ({
          dropdown: _.merge<CSSObject, CSSObject>(
            {
              backgroundColor: blocknoteTheme.colors.menu.background,
              border: border,
              borderRadius: outerBorderRadius,
              boxShadow: shadow,
              color: blocknoteTheme.colors.menu.text,
              padding: "2px",
              overflowY: "scroll",
              ".mantine-Menu-label": {
                backgroundColor: blocknoteTheme.colors.menu.background,
                color: blocknoteTheme.colors.menu.text,
              },
              ".mantine-Menu-item": {
                backgroundColor: blocknoteTheme.colors.menu.background,
                border: "none",
                borderRadius: innerBorderRadius,
                color: blocknoteTheme.colors.menu.text,
              },
              ".mantine-Menu-item[data-hovered]": {
                backgroundColor: blocknoteTheme.colors.hovered.background,
                border: "none",
                color: blocknoteTheme.colors.hovered.text,
              },
            },
            blocknoteTheme.componentStyles?.(blocknoteTheme).Menu || {}
          ),
        }),
      },
      Tabs: {
        styles: () => ({
          root: _.merge<CSSObject, CSSObject>(
            {
              width: "100%",
              backgroundColor: blocknoteTheme.colors.menu.background,
            },
            blocknoteTheme.componentStyles?.(blocknoteTheme).Tabs || {}
          ),
          tabsList: {
            borderColor: blocknoteTheme.colors.hovered.background,
          },
          tab: {
            color: blocknoteTheme.colors.menu.text,
            borderColor: blocknoteTheme.colors.hovered.background,
            "&:hover": {
              color: blocknoteTheme.colors.hovered.text,
              backgroundColor: blocknoteTheme.colors.hovered.background,
              borderColor: blocknoteTheme.colors.hovered.background,
            },
            "&[data-active], &[data-active]&:hover": {
              color: blocknoteTheme.colors.menu.text,
              borderColor: blocknoteTheme.colors.menu.text,
            },
          },
          panel: {
            padding: "8px",
            ".mantine-UnstyledButton-root": {
              width: "60%",
              border: `solid ${blocknoteTheme.colors.border} 1px`,
              borderRadius: "4px",
              height: "32px",
            },
            ".mantine-UnstyledButton-root:hover": {
              color: blocknoteTheme.colors.hovered.text,
              backgroundColor: blocknoteTheme.colors.hovered.background,
            },
          },
        }),
      },
      FileInput: {
        styles: () => ({
          root:
            blocknoteTheme.componentStyles?.(blocknoteTheme).FileInput || {},
          input: {
            color: blocknoteTheme.colors.menu.text,
            backgroundColor: blocknoteTheme.colors.menu.background,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: blocknoteTheme.colors.hovered.background,
            },
          },
          wrapper: {
            border: `solid ${blocknoteTheme.colors.border} 1px`,
            borderRadius: "4px",
          },
          placeholder: {
            color: `${blocknoteTheme.colors.menu.text} !important`,
            fontWeight: 600,
          },
        }),
      },
      TextInput: {
        styles: () => ({
          root:
            blocknoteTheme.componentStyles?.(blocknoteTheme).TextInput || {},
          input: {
            color: blocknoteTheme.colors.menu.text,
            backgroundColor: blocknoteTheme.colors.menu.background,
            border: `solid ${blocknoteTheme.colors.border} 1px`,
            borderRadius: "4px",
            height: "32px",
          },
        }),
      },
      ColorIcon: {
        styles: () => ({
          root: _.merge<CSSObject, CSSObject>(
            {
              border: border,
              borderRadius: innerBorderRadius,
            },
            blocknoteTheme.componentStyles?.(blocknoteTheme).ColorIcon || {}
          ),
        }),
      },
      DragHandleMenu: {
        styles: () => ({
          root: _.merge<CSSObject, CSSObject>(
            {
              ".mantine-Menu-item": {
                fontSize: "12px",
                height: "30px",
              },
            },
            blocknoteTheme.componentStyles?.(blocknoteTheme).DragHandleMenu ||
              {}
          ),
        }),
      },
      Editor: {
        styles: () => ({
          root: _.merge<CSSObject, CSSObject>(
            {
              ".ProseMirror": {
                backgroundColor: blocknoteTheme.colors.editor.background,
                borderRadius: editorBorderRadius,
                color: blocknoteTheme.colors.editor.text,
                fontFamily: blocknoteTheme.fontFamily,
              },
              // Placeholders
              [`.${blockStyles.isEmpty} .${blockStyles.inlineContent}:before, .${blockStyles.isFilter} .${blockStyles.inlineContent}:before`]:
                {
                  color: blocknoteTheme.colors.sideMenu,
                },
              // Indent lines
              [`.${blockStyles.blockGroup}`]: {
                [`.${blockStyles.blockGroup}`]: {
                  [`.${blockStyles.blockOuter}:not([data-prev-depth-changed])::before`]:
                    {
                      borderLeft: `1px solid ${blocknoteTheme.colors.sideMenu}`,
                    },
                },
              },
              // Highlight text colors
              ...(Object.fromEntries(
                Object.entries(textColors).map(([key, value]) => [
                  `[data-text-color="${key}"]`,
                  { color: value },
                ])
              ) as CSSObject),
              // Highlight background colors
              ...(Object.fromEntries(
                Object.entries(backgroundColors).map(([key, value]) => [
                  `[data-background-color="${key}"]`,
                  { backgroundColor: value },
                ])
              ) as CSSObject),
            },
            blocknoteTheme.componentStyles?.(blocknoteTheme).Editor || {}
          ),
        }),
      },
      Toolbar: {
        styles: () => ({
          root: _.merge<CSSObject, CSSObject>(
            {
              backgroundColor: blocknoteTheme.colors.menu.background,
              boxShadow: shadow,
              border: border,
              borderRadius: outerBorderRadius,
              flexWrap: "nowrap",
              gap: "2px",
              padding: "2px",
              width: "fit-content",
              // Button (including dropdown target)
              ".mantine-Button-root, .mantine-ActionIcon-root": {
                backgroundColor: blocknoteTheme.colors.menu.background,
                border: "none",
                borderRadius: innerBorderRadius,
                color: blocknoteTheme.colors.menu.text,
              },
              // Hovered button
              ".mantine-Button-root:hover, .mantine-ActionIcon-root:hover": {
                backgroundColor: blocknoteTheme.colors.hovered.background,
                border: "none",
                color: blocknoteTheme.colors.hovered.text,
              },
              // Selected button
              ".mantine-Button-root[data-selected], .mantine-ActionIcon-root[data-selected]":
                {
                  backgroundColor: blocknoteTheme.colors.selected.background,
                  border: "none",
                  color: blocknoteTheme.colors.selected.text,
                },
              // Disabled button
              ".mantine-Button-root[data-disabled], .mantine-ActionIcon-root[data-disabled]":
                {
                  backgroundColor: blocknoteTheme.colors.disabled.background,
                  border: "none",
                  color: blocknoteTheme.colors.disabled.text,
                },
              // Dropdown
              ".mantine-Menu-dropdown": {
                // Dropdown item
                ".mantine-Menu-item": {
                  fontSize: "12px",
                  height: "30px",
                  ".mantine-Menu-itemRightSection": {
                    paddingLeft: "5px",
                  },
                },
                ".mantine-Menu-item:hover": {
                  backgroundColor: blocknoteTheme.colors.hovered.background,
                },
              },
            },
            blocknoteTheme.componentStyles?.(blocknoteTheme).Toolbar || {}
          ),
        }),
      },
      ToolbarInputDropdown: {
        styles: () => ({
          root: _.merge<CSSObject, CSSObject>(
            {
              backgroundColor: blocknoteTheme.colors.menu.background,
              border: border,
              borderRadius: outerBorderRadius,
              boxShadow: shadow,
              color: blocknoteTheme.colors.menu.text,
              gap: "4px",
              minWidth: "145px",
              padding: "2px",
              // Row
              ".mantine-Group-root": {
                flexWrap: "nowrap",
                // Row input field
                ".mantine-TextInput-root, .mantine-FileInput-root": {
                  width: "300px",
                  ".mantine-TextInput-wrapper:hover": {
                    backgroundColor: blocknoteTheme.colors.hovered.background,
                  },
                  ".mantine-TextInput-wrapper, .mantine-FileInput-wrapper": {
                    padding: 0,
                    borderRadius: "4px",
                    ".mantine-FileInput-icon": {
                      color: blocknoteTheme.colors.menu.text,
                    },
                    ".mantine-TextInput-input, .mantine-FileInput-input": {
                      border: "none",
                      fontSize: "12px",
                      ".mantine-FileInput-placeholder": {
                        color: blocknoteTheme.colors.menu.text,
                      },
                    },
                    ".mantine-FileInput-input:hover": {
                      backgroundColor: blocknoteTheme.colors.hovered.background,
                    },
                  },
                },
              },
            },
            blocknoteTheme.componentStyles?.(blocknoteTheme)
              .EditHyperlinkMenu || {}
          ),
        }),
      },
      Tooltip: {
        styles: () => ({
          root: _.merge<CSSObject, CSSObject>(
            {
              backgroundColor: blocknoteTheme.colors.tooltip.background,
              border: border,
              borderRadius: outerBorderRadius,
              boxShadow: shadow,
              color: blocknoteTheme.colors.tooltip.text,
              padding: "4px 10px",
              textAlign: "center",
              "div ~ div": {
                color: blocknoteTheme.colors.tooltip.text,
              },
            },
            blocknoteTheme.componentStyles?.(blocknoteTheme).Tooltip || {}
          ),
        }),
      },
      SlashMenu: {
        styles: () => ({
          root: _.merge<CSSObject, CSSObject>(
            {
              position: "relative",
              ".mantine-Menu-item": {
                // Icon
                ".mantine-Menu-itemIcon": {
                  backgroundColor: blocknoteTheme.colors.tooltip.background,
                  borderRadius: innerBorderRadius,
                  color: blocknoteTheme.colors.tooltip.text,
                  padding: "8px",
                },
                // Text
                ".mantine-Menu-itemLabel": {
                  paddingRight: "16px",
                  ".mantine-Stack-root": {
                    gap: "0",
                  },
                },
                // Badge (keyboard shortcut)
                ".mantine-Menu-itemRightSection": {
                  ".mantine-Badge-root": {
                    backgroundColor: blocknoteTheme.colors.tooltip.background,
                    color: blocknoteTheme.colors.tooltip.text,
                  },
                },
              },
            },
            blocknoteTheme.componentStyles?.(blocknoteTheme).SlashMenu || {}
          ),
        }),
      },
      SideMenu: {
        styles: () => ({
          root: _.merge<CSSObject, CSSObject>(
            {
              backgroundColor: "transparent",
              ".mantine-UnstyledButton-root": {
                backgroundColor: "transparent",
                color: blocknoteTheme.colors.sideMenu,
              },
              ".mantine-UnstyledButton-root:hover": {
                backgroundColor: blocknoteTheme.colors.hovered.background,
              },
            },
            blocknoteTheme.componentStyles?.(blocknoteTheme).SideMenu || {}
          ),
        }),
      },
    },
    fontFamily: blocknoteTheme.fontFamily,
    other: {
      textColors: textColors,
      backgroundColors: backgroundColors,
    },
  };
};
