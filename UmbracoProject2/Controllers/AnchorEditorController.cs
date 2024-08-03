using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Core.Composing;

namespace UmbracoProject2.Controllers
{
    [VersionedApiBackOfficeRoute("AnchorEditor")]
    [ApiExplorerSettings(GroupName = "Anchor Editor API")]
    [MapToApi("anchors")]
    public class AnchorEditorController() : ManagementApiControllerBase
    {

        [HttpGet("GetContentBlockIds")]
        public List<string> GetContentBlockIds(string nodeId, string culture)
        {
            return ["anchor", "another-anchor"];
        }
    }

    public class SwaggerComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();
        }
    }

    internal class ConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
    {
        public void Configure(SwaggerGenOptions options)
        {
            options.SwaggerDoc(
               "anchors",
               new OpenApiInfo
               {
                   Title = "Anchors Api",
                   Version = "Latest",
                   Description = "Anchors"
               });

            options.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]}");
        }
    }
}
