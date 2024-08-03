import { ManifestGlobalContext } from "@umbraco-cms/backoffice/extension-registry";

const contexts : Array<ManifestGlobalContext> = [
    {
        type: 'globalContext',
        alias: 'anchors.context',
        name: 'Anchors context',
        js: () => import('./anchors.context')
    }
]

export const manifests = [...contexts];