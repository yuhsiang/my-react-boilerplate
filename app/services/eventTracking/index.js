
const getGtag = () => {
  if (typeof gtag === 'function') {
    return gtag; /* eslint no-undef:0 */
  }
  return () => { };
};

/**
 * Defined Your Event Tracking category and action here
 *
 */
export class InsightDetailEvent {
  static category = 'blabla';
  static action = {
    download: 'download',
    language: 'language',
    metric_toggle: 'metric_toggle',
    diff_analysis: 'diff_analysis',
    filter: 'filter',
    sort: 'sort',
    layer: 'graph_layer',
    dimension_change: 'dimension_change',
  }
}

/**
 *
 * @param {InsightDetailEvent.action[key]} action
 * @param {InsightDetailEvent.category} category
 * @param {string} label
 */
const eventTracking = (action, category, label) => {
  const googleTag = getGtag();
  let res = {};
  if (!action) {
    return;
  }
  if (category) {
    res = {
      ...res,
      event_category: category,
    };
  }
  if (label) {
    res = {
      ...res,
      event_label: label,
    };
  }
  googleTag('event', action, res);
};

export default eventTracking;
