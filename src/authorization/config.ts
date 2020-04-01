const CLIENT_ID: string = "4d305e8a665a43b59a5e7f5f71e265df";
const CLIENT_SECRET: string = "fc67cf47ac024e2cb3a703b27e2bdd71";
const REDIRECT_URI: string = "http://localhost:3000/";
const SCOPES: string = "user-read-email";

export const URL: string = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;

export const getCodeFromUrl = () => {
  const websiteHref = window.location.href;

  if (websiteHref.includes("code")) {
    const codeToGetAccess = websiteHref.slice(
      websiteHref.indexOf("=") + 1,
      websiteHref.length
    );
    return codeToGetAccess;
  }
  return "";
};

export const getOptionsToConnect = () => {
  const codeToGetAccess = getCodeFromUrl();

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`
  );

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("code", codeToGetAccess);
  urlencoded.append("redirect_uri", REDIRECT_URI);

  const fetchOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
  };

  return {
    headers: myHeaders,
    urlencoded: urlencoded,
    fetchOptions: fetchOptions,
    codeToGetAccess: codeToGetAccess
  };
};
