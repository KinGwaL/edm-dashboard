let defaultClickTopicName;
let defaultPageLoadTopicName;
let generalTopicName;
let directTopicName;

if(process.env.NODE_ENV == "development") {
  defaultClickTopicName = 'edm-ui-click-local'
  defaultPageLoadTopicName = 'edm-ui-pageload-local'
  generalTopicName = "citic-poc-general-response"
  directTopicName = "citic-poc-mobile-action";
} else {
  defaultClickTopicName = 'citic-poc-transaction-request'
  defaultPageLoadTopicName = 'citic-poc-transaction-response'
  generalTopicName = "citic-poc-general-response"
  directTopicName = "citic-poc-mobile-action";
}

export const CLICK_KAFKA_TOPIC     = process.env.REACT_APP_CLICK_KAFKA_TOPIC || defaultClickTopicName;
export const PAGE_LOAD_KAFKA_TOPIC = process.env.REACT_APP_PAGE_LOAD_KAFKA_TOPIC || defaultPageLoadTopicName;
export const GENERAL_TOPIC = generalTopicName;
export const DIRECT_ACTION_TOPIC = directTopicName;