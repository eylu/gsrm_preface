const getHost = () => {
  switch (process.env.RAILS_ENV) {
    case "staging":
      return "";
      break;
    case "production":
      return "";
      break;
    default:
      return "http://localhost:5000";
  }
};

const host = getHost();
const api = "/api/v1/";


export function quotesListAPI() {
  return "/somepath/quotes";
  // return host + api + "users";
}

