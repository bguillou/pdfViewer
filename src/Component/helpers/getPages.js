import readPDFPages from "./readPDFPages";

export default async (url, pdfWorker, getState, update, done) => {
  console.time("# Render pdf in");

  const resp = await fetch(pdfWorker, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url })
  });

  const loaded = await readPDFPages(resp.body, getState, update, done);
  console.timeEnd("# Render pdf in");

  return loaded;
};
