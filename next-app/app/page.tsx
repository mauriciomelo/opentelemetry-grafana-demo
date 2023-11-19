import axios from "axios";

import {
  trace,
  context,
  propagation,
  Span,
  SpanStatusCode,
} from "@opentelemetry/api";
import React from "react";
import { Rolldice } from "./Rolldice";

export default async function Home() {
  const traceHeaders = {};
  // inject context to trace headers for propagtion to the next service
  propagation.inject(context.active(), traceHeaders);
  // pass the trace headers to your request
  const config = {
    headers: traceHeaders,
  };

  console.log(traceHeaders);

  const { data: pets } = await fetch(
    "http://petstore-api:3002/pets",
    config
  ).then((res) => res.json());
  // const {
  //   data: { data: pets },
  // } = await axios.get("http://petstore-api:3002/pets");
  return (
    <main className="p-5">
      <h1 className="py-5">Pets</h1>

      <ul>
        {pets.map((pet, index) => (
          <li key={index}>{pet.name}</li>
        ))}
      </ul>

      <Rolldice />
    </main>
  );
}
