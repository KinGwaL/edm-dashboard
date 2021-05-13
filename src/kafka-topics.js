let defaultClickTopicName;
let defaultPageLoadTopicName;

if(process.env.NODE_ENV == "development") {
  defaultClickTopicName = 'edm-ui-click-local'
  defaultPageLoadTopicName = 'edm-ui-pageload-local'
} else {
  defaultClickTopicName = 'citic-poc-transaction-request'
  defaultPageLoadTopicName = 'citic-poc-transaction-response'
}

export const CLICK_KAFKA_TOPIC     = process.env.REACT_APP_CLICK_KAFKA_TOPIC || defaultClickTopicName;
export const PAGE_LOAD_KAFKA_TOPIC = process.env.REACT_APP_PAGE_LOAD_KAFKA_TOPIC || defaultPageLoadTopicName;
