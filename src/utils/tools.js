/* eslint-disable no-unreachable */
const url = "https://directus.please-leak.com";

export function parseToDirectusLink(link, quality) {
  //return parseToDirectusLinkOff(link);
  if (quality !== 1) {
    return url + "/assets/" + link + "?width=" + (quality ? quality : 250);
  } else {
    return url + "/assets/" + link;
  }
}

export function parseToDirectusLinkOff(link) {
  return url + "/assets/" + link + "?width=" + 1;
}

export function getSubscribe(plan) {
  if (plan.includes("Premium")) {
    return "premium";
  } else if (plan.includes("Vip")) {
    return "vip";
  } else {
    return "none";
  }
}

export function downloadFile(url, fileName) {
  fetch(url, { method: "get" })
    .then((res) => res.blob())
    .then((res) => {
      const aElement = document.createElement("a");
      aElement.setAttribute("download", fileName);
      const href = URL.createObjectURL(res);
      aElement.href = href;
      aElement.setAttribute("target", "_blank");
      aElement.click();
      URL.revokeObjectURL(href);
    });
}
