import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { JaegerExporter } from "@opentelemetry/exporter-jaeger";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
const { PrometheusExporter } = require("@opentelemetry/exporter-prometheus");

// OpenTelemetry Prometheus Metric Exporter

// Add your port and startServer to the Prometheus options
const prometheusPort = 9465;
const prometheusEndpoint = PrometheusExporter.DEFAULT_OPTIONS.endpoint;
const host = "localhost";

const exporter = new PrometheusExporter(
  {
    port: prometheusPort,
  },
  () => {
    console.log(
      `prometheus scrape endpoint: http://${host}:${prometheusPort}${prometheusEndpoint}`
    );
  }
);

const jaegerExporter = new JaegerExporter({
  tags: [{ key: "tag", value: "value" }],
  host: "jaeger",
  port: 6832,
});

const sdk = new NodeSDK({
  traceExporter: jaegerExporter,
  metricReader: exporter,
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "petstore-api",
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
