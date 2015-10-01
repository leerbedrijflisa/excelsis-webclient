﻿using Lisa.Excelsis.WebApi.Models;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Data.Entity;
using Microsoft.Dnx.Runtime;
using Microsoft.Framework.Configuration;
using Microsoft.Framework.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Lisa.Excelsis.WebApi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            // Setup configuration sources.
            var builder = new ConfigurationBuilder(appEnv.ApplicationBasePath)
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.DefaultValueHandling = DefaultValueHandling.Ignore;
                options.SerializerSettings.MissingMemberHandling = MissingMemberHandling.Error;
            });

            services.AddEntityFramework()
                    .AddSqlServer()
                    .AddDbContext<ExcelsisDb>(options =>
                    {
                        options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]);
                    });

            services.AddTransient<SampleDataInitializer>();

            services.ConfigureCors(options =>
            {
                options.AddPolicy(
                   "CorsExcelsis",
                    builder =>
                    {
                        builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
                    });
            });            
        }

        public void Configure(IApplicationBuilder app, SampleDataInitializer sampleData)
        {
            app.UseCors("CorsExcelsis");

            app.UseMvcWithDefaultRoute();
            app.UseStaticFiles();

            sampleData.InitializeDataAsync();
        }
    }
}