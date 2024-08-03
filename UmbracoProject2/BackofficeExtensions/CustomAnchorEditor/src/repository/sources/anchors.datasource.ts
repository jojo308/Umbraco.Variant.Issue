import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { getContentBlockIds, GetContentBlockIdsResponse, } from "../../api";

export interface AnchorsDataSource {
    getContentBlockIds(nodeId: string, culture: string): Promise<UmbDataSourceResponse<GetContentBlockIdsResponse>>;
}

export class AnchorsManagementDataSource implements AnchorsDataSource {

    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }    

    async getContentBlockIds(nodeId: string, culture: string): Promise<UmbDataSourceResponse<GetContentBlockIdsResponse>> {
        return await tryExecuteAndNotify(this.#host, getContentBlockIds({nodeId: nodeId, culture: culture}))
    }
}
