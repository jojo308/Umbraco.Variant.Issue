
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { AnchorsDataSource, AnchorsManagementDataSource } from "./sources/anchors.datasource";

export class AnchorsManagementRespository extends UmbControllerBase {
    #anchorsDataSource: AnchorsDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#anchorsDataSource = new AnchorsManagementDataSource(this);
    }

    async getContentBlockIds(nodeId: string, culture: string) {
        return this.#anchorsDataSource.getContentBlockIds(nodeId, culture);
    }
}
