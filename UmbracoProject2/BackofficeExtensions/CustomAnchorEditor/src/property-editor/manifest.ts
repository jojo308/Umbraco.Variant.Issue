import { ManifestPropertyEditorUi } from "@umbraco-cms/backoffice/extension-registry";

const propertyEditors: Array<ManifestPropertyEditorUi> = [
    {
        type: 'propertyEditorUi',
        alias: 'CustomAnchorEditor',
        name: 'Custom Anchor Editor',
        elementName: 'anchor-tag-picker',
        js: () => import('./anchor-tag-picker.js'),
        meta: {
            label: "Custom Anchor Picker",
            icon: "icon-tags",
            group: "common",
            propertyEditorSchemaAlias: "Umbraco.Plain.Json"
        }
    }
];

export const manifests = [...propertyEditors];