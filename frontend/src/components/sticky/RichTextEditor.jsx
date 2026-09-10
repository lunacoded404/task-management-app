import React, { useEffect, useState } from "react";
import {
    useEditor,
    EditorContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

import "./richTextEditor.scss";


const CustomBulletList = BulletList.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            bulletType: {
                default: "circle",
                parseHTML: (element) => {
                    return (
                        element.getAttribute(
                            "data-bullet-type"
                        ) || "circle"
                    );
                },

                renderHTML: (attributes) => {
                    return {
                        "data-bullet-type":
                            attributes.bulletType,
                    };
                },
            },
        };
    },
});

const CustomOrderedList = OrderedList.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            numberType: {
                default: "decimal",
                parseHTML: (element) => {
                    return (
                        element.getAttribute("data-number-type") || "decimal"
                    );
                },

                renderHTML: (attributes) => {
                    return {"data-number-type":attributes.numberType};
                },
            },
        };
    },
});


const RichTextEditor = ({
    value,
    onChange,
}) => {
    const [openListMenu, setOpenListMenu] = useState(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                orderedList: false,
            }),
            Underline,
            TextAlign.configure({
                types: [
                    "heading",
                    "paragraph",
                ],
            }),
            CustomBulletList,
            CustomOrderedList,
        ],

        content: value || "",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor) {
            return;
        }
        const currentContent = editor.getHTML();
        if (value !== currentContent) {
            editor.commands.setContent(
                value || "",
                false
            );
        }
    }, [editor, value]);


    if (!editor) {
        return null;
    }

    const setBulletType = (type) => {
        if (!editor.isActive("bulletList")) {
            editor
                .chain()
                .focus()
                .toggleBulletList()
                .run();
        }

        editor
            .chain()
            .focus()
            .updateAttributes("bulletList", {
                bulletType: type,
            })
            .run();

        setOpenListMenu(null);
    };

    const setNumberType = (type) => {
        if (!editor.isActive("orderedList")) {
            editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run();
        }

        editor
            .chain()
            .focus()
            .updateAttributes("orderedList", {
                numberType: type,
            })
            .run();

        setOpenListMenu(null);
    };


    return (
        <div className="richTextEditor">
            <div className="toolbar">
                <div className="toolbar-group">
                    <button
                        type="button"
                        title="Bold"
                        className={
                            editor.isActive("bold")
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                    >
                        <FormatBoldIcon />
                    </button>

                    <button
                        type="button"
                        title="Italic"
                        className={
                            editor.isActive("italic")
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                        }
                    >
                        <FormatItalicIcon />
                    </button>

                    <button
                        type="button"
                        title="Underline"
                        className={
                            editor.isActive("underline")
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleUnderline()
                                .run()
                        }
                    >
                        <FormatUnderlinedIcon />
                    </button>
                </div>

                <div className="toolbar-divider" />


                <div className="toolbar-group list-dropdown">
                    <button
                        type="button"
                        title="Bullet list"     
                        className={
                            editor.isActive("bulletList")
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setOpenListMenu(
                                openListMenu === "bullet"
                                    ? null
                                    : "bullet"
                            )
                        }
                    >
                        <FormatListBulletedIcon />
                    </button>

                    {openListMenu === "bullet" && (
                        <div className="list-menu">
                            <button
                                type="button"
                                onClick={() =>
                                    setBulletType(
                                        "circle"
                                    )
                                }
                            >
                                <span className="list-preview circle">
                                    •
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setBulletType(
                                        "hyphen"
                                    )
                                }
                            >
                                <span className="list-preview">
                                    –
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setBulletType(
                                        "plus"
                                    )
                                }
                            >
                                <span className="list-preview">
                                    +
                                </span>
                            </button>
                        </div>
                    )}
                </div>

                <div className="toolbar-group list-dropdown">
                    <button
                        type="button"
                        title="Numbered list"
                        className={
                            editor.isActive("orderedList")
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setOpenListMenu(
                                openListMenu === "number"
                                    ? null
                                    : "number"
                            )
                        }
                    >
                        <FormatListNumberedIcon />
                    </button>

                    {openListMenu === "number" && (
                        <div className="list-menu">
                            <button
                                type="button"
                                onClick={() =>
                                    setNumberType(
                                        "decimal"
                                    )
                                }
                            >
                                <span className="list-preview">
                                    1.
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setNumberType(
                                        "upper-alpha"
                                    )
                                }
                            >
                                <span className="list-preview">
                                    A.
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setNumberType(
                                        "lower-alpha"
                                    )
                                }
                            >
                                <span className="list-preview">
                                    a.
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setNumberType(
                                        "upper-roman"
                                    )
                                }
                            >
                                <span className="list-preview roman">
                                    I.
                                </span>
                            </button>
                        </div>
                    )}
                </div>

                <div className="toolbar-divider" />

                <div className="toolbar-group">
                    <button
                        type="button"
                        title="Align left"
                        className={
                            editor.isActive({
                                textAlign: "left",
                            })
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setTextAlign("left")
                                .run()
                        }
                    >
                        <FormatAlignLeftIcon />
                    </button>

                    <button
                        type="button"
                        title="Align center"
                        className={
                            editor.isActive({
                                textAlign: "center",
                            })
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setTextAlign("center")
                                .run()
                        }
                    >
                        <FormatAlignCenterIcon />
                    </button>

                    <button
                        type="button"
                        title="Align right"
                        className={
                            editor.isActive({
                                textAlign: "right",
                            })
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setTextAlign("right")
                                .run()
                        }
                    >
                        <FormatAlignRightIcon />
                    </button>

                    <button
                        type="button"
                        title="Justify"
                        className={
                            editor.isActive({
                                textAlign: "justify",
                            })
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setTextAlign("justify")
                                .run()
                        }
                    >
                        <FormatAlignJustifyIcon />
                    </button>
                </div>

                <div className="toolbar-divider" />

                <div className="toolbar-group">
                    <button
                        type="button"
                        title="Undo"
                        disabled={
                            !editor.can().undo()
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .undo()
                                .run()
                        }
                    >
                        <UndoIcon />
                    </button>

                    <button
                        type="button"
                        title="Redo"
                        disabled={
                            !editor.can().redo()
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .redo()
                                .run()
                        }
                    >
                        <RedoIcon />
                    </button>
                </div>
            </div>

            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;