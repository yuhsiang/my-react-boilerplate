

const QUERY_LIST = '#main-container > div.r-list-container.action-bar-margin.bbs-screen  > .r-ent';
const QUERY_COUNT = '.nrec span';
const QUERY_LINK_TITLE = '.title a';
const QUERY_META_DATE = '.meta .date';
const QUERY_META_AUTHOR = '.meta .author';

const QUERY_PREV_LINK = '#action-bar-container > div > div.btn-group.btn-group-paging > a:nth-child(2)';
const QUERY_NEXT_LINK = '#action-bar-container > div > div.btn-group.btn-group-paging > a:nth-child(3)';

const listForEach = Array.prototype.forEach;

let id = 0;

const getNextId = () => {
  id += 1;
  return id;
};

class ListCrawler {
  constructor(html) {
    this.html = html;
  }

  parse() {
    let res = {
      nextLink: '',
      prevLink: '',
      list: [],
    };
    try {
      const parser = new DOMParser();
      const $dom = parser.parseFromString(this.html, 'text/html');
      const $list = $dom.querySelectorAll(QUERY_LIST);

      const list = generateListFromDOM($list);
      const prevLink = $dom.querySelector(QUERY_PREV_LINK).getAttribute('href');
      const nextLink = $dom.querySelector(QUERY_NEXT_LINK).getAttribute('href');

      res = {
        ...res,
        list,
        nextLink,
        prevLink,
      };
    } catch (e) {
      console.warn(e);
    }
    return res;
  }
}

const generateListFromDOM = ($dom) => {
  const list = [];
  listForEach.call($dom, ($el) => {
    try {
      const element = {
        id: getNextId(),
        count: $el.querySelector(QUERY_COUNT).innerText,
        title: $el.querySelector(QUERY_LINK_TITLE).innerText,
        link: $el.querySelector(QUERY_LINK_TITLE).getAttribute('href'),
        date: $el.querySelector(QUERY_META_DATE).innerText,
        author: $el.querySelector(QUERY_META_AUTHOR).innerText,
      };
      list.push(element);
    } catch (e) {
      console.warn(e);
    }
  });
  return list;
};

export default ListCrawler;

