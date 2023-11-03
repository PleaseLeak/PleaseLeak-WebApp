const url = "https://directus.please-leak.com";

export async function getModels() {
  let data = await fetch(url + "/items/models?limit=300").then((res) => {
    // inverse le tableau
    return res.json().then((data) => {
      return data;
    });
  });
  return data;
}

export async function getAssPictures() {
  let data = await fetch(url + "/items/ass_pictures?limit=300").then((res) => {
    // inverse le tableau
    return res.json().then((data) => {
      return data;
    });
  });
  return data;
}

export async function getPussyPictures() {
  let data = await fetch(url + "/items/pussy_pictures?limit=300").then(
    (res) => {
      // inverse le tableau
      return res.json().then((data) => {
        return data;
      });
    }
  );
  return data;
}

export async function getBoobsPictures() {
  let data = await fetch(url + "/items/boobs_pictures?limit=300").then(
    (res) => {
      // inverse le tableau
      return res.json().then((data) => {
        return data;
      });
    }
  );
  return data;
}

export async function getAllVideos() {
  let data = await fetch(url + "/items/videos?limit=300").then((res) => {
    // inverse le tableau
    return res.json().then((data) => {
      return data;
    });
  });
  return data;
}

export async function getCreateAiImage(body) {
  console.log(body);
  let data = await fetch("https://ai-secret.please-leak.com/createImage/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    // inverse le tableau
    return res.json().then((data) => {
      return data;
    });
  });
  return data;
}

export async function getStatusAiImage(aiImageId) {
  let data = await fetch(
    "https://ai-secret.please-leak.com/getImage/" + aiImageId
  ).then((res) => {
    // inverse le tableau
    return res.json().then((data) => {
      return data;
    });
  });
  return data;
}

export async function getGalleryImage() {
  let data = await fetch("https://ai-secret.please-leak.com/browse/200").then(
    (res) => {
      // inverse le tableau
      return res.json().then((data) => {
        return data;
      });
    }
  );
  return data;
}
