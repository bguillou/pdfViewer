import { v4 } from "uuid";
const toObject = v => ({ id: v4(), url: `data:image${v}` });

export default (readableStream, getState, callBack, isDone) => {
  const reader = readableStream.getReader();
  let string = "";

  const readPage = async () => {
    const { value, done } = await reader.read();
    const newString = new TextDecoder("utf-8").decode(value);

    string = `${string}${newString}`;

    const urls = string.split("data:image").filter(Boolean);
    const { pages } = getState();

    if (urls.length > pages.length + 1 || done) {
      const diff = urls.length - pages.length;
      const start = urls.length - diff;

      const newPages = urls
        .slice(start, done ? urls.length : pages.length + 1)
        .map(toObject);
      if (callBack) callBack(newPages);
    }
    if (done) {
      if (isDone) isDone();
      return true;
    }

    return await readPage();
  };

  return readPage();
};
