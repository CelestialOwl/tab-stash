import { displayImageFromBase64 } from "./utils/images";

async function listTabs() {
  const tabs = await browser.tabs.query({});
  const tabEl = document.querySelector("#tabs");
  console.log(tabs);

  for (let i of tabs) {
    const liEl = document.createElement("li");
    liEl.innerText = i.title || "";

    const onCaptured = (imageUri: string) => {
      const base64 = imageUri.split(",")[1];
      const blob = displayImageFromBase64(base64, "image/png");
      const imgEl = document.createElement("img");
      imgEl.src = blob;
      imgEl.height = 300;
      imgEl.width = 300;
      tabEl?.appendChild(imgEl);
      return blob;
    };

    browser.tabs
      .captureTab(i.id || 1)
      .then(onCaptured, () => "something went wrong");
    // console.log(captured, error);
    // imgEl.src =

    tabEl?.appendChild(liEl);
  }

  console.log(tabs);
}
console.log("does this show");
document.addEventListener("DOMContentLoaded", listTabs);
