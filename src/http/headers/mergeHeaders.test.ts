import { describe, it } from "vitest";

import { mergeHeaders } from "./mergeHeaders.js";

describe("mergeHeaders", () => {
  const currentHeaderFields = { "content-type": "application/json" };
  const addedFields = { accessToken: "bleowbleow" };

  it("correctly merges Headers object", ({ expect }) => {
    const headers = new Headers(currentHeaderFields);
    const mergedHeaders = mergeHeaders(headers, addedFields);

    if (mergedHeaders instanceof Headers) {
      expect(mergedHeaders.get("content-type")).toEqual(
        currentHeaderFields["content-type"],
      );
      expect(mergedHeaders.get("accessToken")).toEqual(addedFields.accessToken);
    } else {
      expect.fail();
    }
  });

  it("correctly merges arrays", ({ expect }) => {
    const headers = Object.entries(currentHeaderFields);
    const mergedHeaders = mergeHeaders(headers, addedFields);

    if (Array.isArray(mergedHeaders)) {
      const contentType = mergedHeaders.find(([key]) => key === "content-type");
      expect(contentType).toBeDefined();
      if (contentType !== undefined)
        expect(contentType[1]).toEqual(currentHeaderFields["content-type"]);

      const accessToken = mergedHeaders.find(([key]) => key === "accessToken");
      expect(accessToken).toBeDefined();
      if (accessToken !== undefined)
        expect(accessToken[1]).toEqual(addedFields.accessToken);
    } else {
      expect.fail();
    }
  });

  it("correctly merges records", ({ expect }) => {
    const mergedHeaders = mergeHeaders(currentHeaderFields, addedFields);

    if (typeof mergedHeaders === "object") {
      if ("content-type" in mergedHeaders)
        expect(mergedHeaders["content-type"]).toEqual(
          currentHeaderFields["content-type"],
        );
      else expect.fail();

      if ("accessToken" in mergedHeaders)
        expect(mergedHeaders.accessToken).toEqual(addedFields.accessToken);
      else expect.fail();
    } else {
      expect.fail();
    }
  });
});
