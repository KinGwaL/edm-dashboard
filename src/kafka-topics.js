let defaultClickTopicName;
let defaultPageLoadTopicName;
let generalTopicName;

if(process.env.NODE_ENV == "development") {
  defaultClickTopicName = 'edm-ui-click-local'
  defaultPageLoadTopicName = 'edm-ui-pageload-local'
  generalTopicName = "citic-poc-general-response"
} else {
  defaultClickTopicName = 'citic-poc-transaction-request'
  defaultPageLoadTopicName = 'citic-poc-transaction-response'
  generalTopicName = "citic-poc-general-response"
}

export const CLICK_KAFKA_TOPIC     = process.env.REACT_APP_CLICK_KAFKA_TOPIC || defaultClickTopicName;
export const PAGE_LOAD_KAFKA_TOPIC = process.env.REACT_APP_PAGE_LOAD_KAFKA_TOPIC || defaultPageLoadTopicName;
export const GENERAL_TOPIC = generalTopicName;