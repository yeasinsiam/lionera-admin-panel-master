const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cname +
    "=" +
    cvalue +
    ";" +
    "SameSite=None;" +
    "Secure" +
    ";" +
    expires +
    ";path=/";
};

const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const deleteCookie = (name) => {
  const cookie = getCookie(name);
  if (cookie !== "") {
    document.cookie = `${name}= ; SameSite=None; Secure; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
  } else {
    return;
  }
};

const checkCookie = () => {
  let user = getCookie("username");
  if (user !== "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user !== "" && user != null) {
      setCookie("username", user, 365);
    }
  }
};

const setSession = (sname, svalue) => {};

const getSession = (sname) => {};

export {
  setCookie,
  getCookie,
  checkCookie,
  deleteCookie,
  setSession,
  getSession,
};
