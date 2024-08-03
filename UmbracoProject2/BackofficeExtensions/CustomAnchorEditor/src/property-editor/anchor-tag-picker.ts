import { LitElement, html, customElement, state, property } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import AnchorsManagementContext, { ANCHORS_MANAGEMENT_CONTEXT_TOKEN } from "../context/anchors.context";
import { UmbPropertyEditorConfigCollection } from "@umbraco-cms/backoffice/property-editor";
import { UMB_ENTITY_WORKSPACE_CONTEXT, UMB_WORKSPACE_CONTEXT, UmbVariantableWorkspaceContextInterface, UmbVariantDatasetWorkspaceContext } from "@umbraco-cms/backoffice/workspace";
import { UMB_PROPERTY_CONTEXT, UMB_PROPERTY_DATASET_CONTEXT, UmbPropertyContext, UmbPropertyDatasetContext } from "@umbraco-cms/backoffice/property";
import { UMB_ENTITY_CONTEXT, UmbEntityContext } from "@umbraco-cms/backoffice/entity";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT, UmbDocumentWorkspaceContext } from "@umbraco-cms/backoffice/document";

@customElement('anchor-tag-picker')
export default class AnchorTagPicker extends UmbElementMixin((LitElement)) implements UmbPropertyEditorUiElement {

    _anchorsContext?: AnchorsManagementContext;
    _workspaceContext?: UmbVariantableWorkspaceContextInterface;
    _propertyDatasetContext?: UmbPropertyDatasetContext;
    _documentWorkspaceContext?: UmbDocumentWorkspaceContext;
    _propertyContext?: UmbPropertyContext;
    _entityContext?: UmbEntityContext;
    _entityWorkspaceContext?: UmbVariantDatasetWorkspaceContext;

    @property({ type: Object })
    value?: unknown;

    @property({ type: Object })
    config?: UmbPropertyEditorConfigCollection | undefined;

    @state()
    _anchors?: Array<string> = [];

    @state()
    _nodeId?: string;

    @state()
    _culture?: string;

    constructor() {
        super();

        this._nodeId = '';
        this._culture = '';

        this.consumeContext(UMB_ENTITY_CONTEXT, (ctx) => {
            this._entityContext = ctx;
            this._nodeId = this._entityContext.getUnique() ?? '';
            console.log('UMB_ENTITY_CONTEXT', ctx)
        })

        this.consumeContext(ANCHORS_MANAGEMENT_CONTEXT_TOKEN, (instance) => {
            this._anchorsContext = instance

            this.observe(instance.anchors, (anchors) => {
                this._anchors = anchors;
            });
        })
    }

    #consumeContexts() {
        this.consumeContext(UMB_WORKSPACE_CONTEXT, (ctx) => {
            this._workspaceContext = (ctx as UmbVariantableWorkspaceContextInterface);
            console.log('UMB_WORKSPACE_CONTEXT', ctx)

            this.observe(this._workspaceContext.variantOptions, (options) => {
                console.log('UMB_WORKSPACE_CONTEXT:variant options:', options)
            })

            this.observe(this._workspaceContext.variants, (variants) => {
                console.log('UMB_WORKSPACE_CONTEXT:variants:', variants)
            })
        });

        this.consumeContext(UMB_PROPERTY_DATASET_CONTEXT, (ctx) => {
            this._propertyDatasetContext = ctx;
            console.log('UMB_PROPERTY_DATASET_CONTEXT', ctx)
            if (this._propertyDatasetContext.propertyVariantId) {
                this._propertyDatasetContext.propertyVariantId('contentBlocks').then(x => {
                    this.observe(x, (anchorLinks) => {
                        console.log('UMB_PROPERTY_DATASET_CONTEXT:contentBlocks:', anchorLinks)
                    })

                })
            }
        })

        this.consumeContext(UMB_DOCUMENT_WORKSPACE_CONTEXT, (ctx) => {
            console.log('UMB_DOCUMENT_WORKSPACE_CONTEXT', ctx)
            this._documentWorkspaceContext = ctx;
        })

        this.consumeContext(UMB_PROPERTY_CONTEXT, (ctx) => {
            console.log('UMB_PROPERTY_CONTEXT', ctx)
            this._propertyContext = ctx;

            this.observe(this._propertyContext.variantId, (id) => {
                console.log('UMB_PROPERTY_CONTEXT:variantId:', id)
                if (id && id.culture !== undefined) {
                    this._culture = id.culture ?? '';
                    console.log(':UMB_PROPERTY_CONTEXTculture:', this._culture)
                } else {
                    console.log('UMB_PROPERTY_CONTEXT:culture is undefined')
                }
            })
        })

        this.consumeContext(UMB_ENTITY_WORKSPACE_CONTEXT, (ctx) => {
            console.log('UMB_ENTITY_WORKSPACE_CONTEXT', ctx)
            this._entityWorkspaceContext = (ctx as UmbVariantDatasetWorkspaceContext);
            this.observe(this._entityWorkspaceContext.variantOptions, (options) => {
                console.log('UMB_ENTITY_WORKSPACE_CONTEXT:variant options:', options)
            })

            this.observe(this._entityWorkspaceContext.variants, (variants) => {
                console.log('UMB_ENTITY_WORKSPACE_CONTEXT:variants:', variants)
            })

            this._entityWorkspaceContext.propertyValueByAlias("contentBlocks").then(x => {
                this.observe(x, (contentBlocks) => {
                    console.log('UMB_ENTITY_WORKSPACE_CONTEXT:contentBlocks:', contentBlocks)
                })
            })
            this._entityWorkspaceContext.propertyValueByAlias("title").then(x => {
                this.observe(x, (title) => {
                    console.log('UMB_ENTITY_WORKSPACE_CONTEXT:title:', title)
                })
            })
        })
    }

    override async connectedCallback() {
        super.connectedCallback();
        this.#consumeContexts()

        console.log('UMB_WORKSPACE_CONTEXT:contentBlocks', this._workspaceContext?.getPropertyValue<unknown>("contentBlocks"))
        console.log('UMB_WORKSPACE_CONTEXT:title', this._workspaceContext?.getPropertyValue<string>("title"))
        console.log('UMB_PROPERTY_DATASET_CONTEXT:variantId', this._propertyDatasetContext?.getVariantId())
        console.log('UMB_PROPERTY_DATASET_CONTEXT:unique', this._propertyDatasetContext?.getUnique())
        console.log('UMB_DOCUMENT_WORKSPACE_CONTEXT:collectionAlias:', this._documentWorkspaceContext?.getCollectionAlias())
        console.log('UMB_DOCUMENT_WORKSPACE_CONTEXT:data:', this._documentWorkspaceContext?.getData())
        console.log('UMB_DOCUMENT_WORKSPACE_CONTEXT:contentBlocks', this._documentWorkspaceContext?.getPropertyValue('contentBlocks'))
        console.log('UMB_PROPERTY_CONTEXT:variantId:', this._propertyContext?.getVariantId())
        console.log('UMB_PROPERTY_CONTEXT:getAlias:', this._propertyContext?.getAlias())
        console.log('UMB_ENTITY_CONTEXT:unique:', this._entityContext?.getUnique())
        console.log('UMB_ENTITY_WORKSPACE_CONTEXT:type:', this._entityWorkspaceContext?.getEntityType())
        console.log('UMB_ENTITY_WORKSPACE_CONTEXT:unique:', this._entityWorkspaceContext?.getUnique())
        console.log('UMB_ENTITY_WORKSPACE_CONTEXT:type2:', this._entityWorkspaceContext?.getEntityType())
        console.log('UMB_ENTITY_WORKSPACE_CONTEXT:unique2:', this._entityWorkspaceContext?.getUnique())
        await this._anchorsContext?.getContentBlockIds(this._nodeId ?? '', 'nl-NL')
    }

    render() {
        return html`
        <uui-box>    
            <p>anchor tag editor</p>              
        </uui-box>
        <umb-debug visible></umb-debug>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'anchor-tag-picker': AnchorTagPicker;
    }
}