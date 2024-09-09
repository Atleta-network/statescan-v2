const paramsKeyConvert = (str = "") =>
  str.replace(/[A-Z]/g, ([s]) => `_${s.toLowerCase()}`);

class Api {
  endpoint = null;
  withOrigin = false;

  constructor({ path, withOrigin }) {
    this.endpoint = path;
    this.withOrigin = withOrigin;
  }

  __getURL(path) {
    if (this.withOrigin) {
      return new URL(path, this.endpoint);
    }

    if (URL.canParse(path)) {
      return new URL(path);
    }

    return new URL(
      `.${path}`,
      new URL(this.endpoint.endsWith('/') ? this.endpoint : `${this.endpoint}/`, window.location.origin).href
    );
  } 

  fetch = (path, params = {}, options) => {
    const url = this.__getURL(path);
    for (const key of Object.keys(params)) {
      url.searchParams.set(paramsKeyConvert(key), params[key]);
    }

    return new Promise((resolve, reject) =>
      fetch(url, options)
        .then((resp) =>
          resp.status !== 200
            ? reject({ error: { status: resp.status } })
            : resp.json().then((result) => resolve({ result })),
        )
        .catch((e) => {
          if (e.message === "The user aborted a request.") {
            reject(e);
          } else {
            resolve({
              error: {
                status: 500,
                message: "can not parse response as JSON",
                data: null,
              },
            });
          }
        }),
    );
  };

  post = async (path, body = null) => {
    return await this.fetch(
      path,
      {},
      {
        method: "POST",
        credentials: "same-origin",
        body: body ? JSON.stringify(body) : null,
        headers: { "Content-Type": "application/json" },
      },
    );
  };
}

const tryParseToUrl = path => {
  if (URL.canParse(path)) {
    return {
      path: new URL(path).href,
      withOrigin: true,
    };
  }

  return {
    path,
    withOrigin: false,
  };
} 

const api = new Api(tryParseToUrl(process.env.REACT_APP_PUBLIC_API_END_POINT));

export default api;
