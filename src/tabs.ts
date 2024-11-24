import { displayImageFromBase64 } from "./utils/images";
console.log("hello");

const closeTab = (id: number) => {
  browser.tabs.remove(id);
};

async function listTabs() {
  const tabs = await browser.tabs.query({});
  const tabEl = document.querySelector("#tabs");
  console.log(tabs);

  for (let i of tabs) {
    console.log(i);
    const onCaptured = (imageUri: string) => {
      const liEl = document.createElement("li");
      const imgEl = document.createElement("img");
      const closeButton = document.createElement("button");
      const innerDiv = document.createElement("div");
      closeButton.addEventListener("click", () => {
        if (i.id) {
          closeTab(i.id);
        }
      });
      closeButton.innerHTML = "c";
      closeButton.style.backgroundColor = "red";
      liEl.innerText = i.title || "";
      const base64 = imageUri.split(",")[1];
      const blob = displayImageFromBase64(base64, "image/png");
      imgEl.src = blob;
      imgEl.height = 150;
      imgEl.width = 200;
      innerDiv?.appendChild(liEl);
      innerDiv.appendChild(closeButton);
      tabEl?.appendChild(innerDiv);
      tabEl?.appendChild(imgEl);

      return blob;
    };

    browser.tabs
      .captureTab(i.id || 1)
      .then(onCaptured.bind(window), () => "something went wrong");
    // console.log(captured, error);
    // imgEl.src =
  }

  console.log(tabs);
}
console.log("does this show");
document.addEventListener("DOMContentLoaded", listTabs);
