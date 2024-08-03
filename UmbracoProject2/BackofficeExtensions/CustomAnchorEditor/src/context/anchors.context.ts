import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbBasicState } from "@umbraco-cms/backoffice/observable-api";
import { AnchorsManagementRespository } from "../repository/anchors.repository";

export class AnchorsManagementContext extends UmbControllerBase {

    #repository: AnchorsManagementRespository;

    #anchors = new UmbBasicState<string[] | undefined>(undefined);
    public readonly anchors = this.#anchors.asObservable();

    constructor(host: UmbControllerHost) {
        super(host);

        this.provideContext(ANCHORS_MANAGEMENT_CONTEXT_TOKEN, this);
        this.#repository = new AnchorsManagementRespository(this);
    }

    async getContentBlockIds(nodeId: string, culture: string) {
        const { data } = await this.#repository.getContentBlockIds(nodeId, culture);

        if (data) {
            this.#anchors.setValue(data)
        }
    }
}

export default AnchorsManagementContext;

export const ANCHORS_MANAGEMENT_CONTEXT_TOKEN =
    new UmbContextToken<AnchorsManagementContext>(AnchorsManagementContext.name);