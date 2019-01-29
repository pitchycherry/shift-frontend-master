const compileUrl = (url, params) => {
  const resultArr = [];
  const options = Object.assign({}, params);

  const pathArr = url.split("/");

  pathArr.forEach(item => {
    if (item[0] === ":") {
      if (item[item.length - 1] === "?") {
        const key = item.substring(1, item.length - 1);
        if (options[key]) {
          resultArr.push(options[key]);
          delete options[key];
        }
      } else {
        const key = item.substring(1);
        if (options[key]) {
          resultArr.push(options[key]);
          delete options[key];
        } else {
          console.error(new Error("can not find parameter"));
        }
      }
    } else {
      resultArr.push(item);
    }
  });

  let resultString = resultArr.join("/");

  Object.keys(options).forEach((key, index) => {
    resultString += `${index === 0 ? "?" : "&"}${key}=${options[key]}`;
  });

  return resultString;
};

/**
 * @param  {string} options  [description]
 * @param  {Object} queryOptions [description]
 * @param  {Object|undefined} body         [description]
 * @return {Promise}              [description]
 */
const createRequest = (options, queryOptions, body) => {
  const requestUrl = compileUrl(options.path, queryOptions);

  return fetch(requestUrl, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    method: options.method || "GET",
    body: body ? JSON.stringify(body) : undefined
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw response.status;
    }
  });
};

const toggleClass = (element, className, needAdd) => {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }

  if (element) {
    element.classList.toggle(
      className,
      typeof needAdd !== "undefined" ? needAdd : undefined
    );
  }
};

const getFieldValue = element => {
  if (element.tagName === "SELECT" && element.multiple) {
    const values = [];

    Array.from(element.selectedOptions).forEach(option => {
      values.push(option.value);
    });

    return values;
  }

  switch (element.getAttribute("type")) {
    case "radio":
      if (element.checked) {
        return element.value;
      }
      break;
    case "checkbox":
      return element.checked;
    default:
      return element.value;
  }
};

const FIELD_SELECTORS = "input, textarea, select, radio";
const getFieldData = formElement => {
  const elements = formElement.querySelectorAll(FIELD_SELECTORS);
  const result = {};

  elements.forEach(element => {
    result[element.name] = getFieldValue(element);
  });

  return result;
};
