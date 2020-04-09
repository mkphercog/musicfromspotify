export const URL: string = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${process.env.REACT_APP_SCOPES}`;

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
    `Basic ${btoa(
      process.env.REACT_APP_CLIENT_ID +
        ":" +
        process.env.REACT_APP_CLIENT_SECRET
    )}`
  );

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("code", codeToGetAccess);
  urlencoded.append("redirect_uri", String(process.env.REACT_APP_REDIRECT_URI));

  const fetchOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return {
    headers: myHeaders,
    urlencoded: urlencoded,
    fetchOptions: fetchOptions,
    codeToGetAccess: codeToGetAccess,
  };
};

export const refreshAccessToken = (
  refresh_token: string,
  dispatch: Function,
  setAccessTokens: Function
) => {
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "refresh_token");
  urlencoded.append("refresh_token", refresh_token);

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Basic ${btoa(
      process.env.REACT_APP_CLIENT_ID +
        ":" +
        process.env.REACT_APP_CLIENT_SECRET
    )}`
  );

  fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error();
    })
    .then((res) => {
      dispatch(setAccessTokens(res.access_token, refresh_token));
    })
    .catch((err) => console.log(err));
};
