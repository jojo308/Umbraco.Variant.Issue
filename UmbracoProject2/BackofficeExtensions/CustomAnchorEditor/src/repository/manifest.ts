import { ManifestRepository } from "@umbraco-cms/backoffice/extension-registry";
import { AnchorsManagementRespository } from "./anchors.repository";

const repositories: Array<ManifestRepository> = [
    {
        type: 'repository',
        alias: 'anchors.repository',
        name: 'Anchors Repository',
        api: AnchorsManagementRespository,
    }
];

export const manifests = [...repositories];