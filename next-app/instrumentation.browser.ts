import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";
import { CollectorTraceExporter } from "@opentelemetry/exporter-collector";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { B3Propagator } from "@opentelemetry/propagator-b3";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");

const exporter = new CollectorTraceExporter({
  serviceName: "auto-instrumentations-web",
});

const otlpExporter = new OTLPTraceExporter({
  // optional - default url is http://localhost:4318/v1/traces
  url: "http://localhost:4318/v1/traces",
  // optional - collection of custom headers to be sent with each request, empty by default
  headers: {},
});

const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "next-app-browser",
  }),
});
provider.addSpanProcessor(new SimpleSpanProcessor(otlpExporter));
provider.register({
  contextManager: new ZoneContextManager(),
  propagator: new B3Propagator(),
});

registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      // load custom configuration for xml-http-request instrumentation
      "@opentelemetry/instrumentation-xml-http-request": {
        clearTimingResources: true,
      },
    }),
  ],
});
