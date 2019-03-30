const QUERY_AUTHOR = '#main-content > div:nth-child(1) > span.article-meta-value';
const QUERY_TITLE = '#main-content > div:nth-child(3) > span.article-meta-value';
const QUERY_DATE = '#main-content > div:nth-child(4) > span.article-meta-value';
const QUERY_MAIN_CONTENT = '#main-content';

const imageRegex = new RegExp(/(http[s?]:\/\/.*\.(jpg|png|gif|jpeg)$)/gm);

class DetailCrawler {
  constructor(html) {
    this.html = html;
  }

  parse = () => {
    let res = {
      title: '',
      author: '',
      date: '',
      content: '',
    };
    try {
      const parser = new DOMParser();
      const $dom = parser.parseFromString(this.html, 'text/html');
      const content = $dom.querySelector(QUERY_MAIN_CONTENT).textContent;

      res = {
        title: $dom.querySelector(QUERY_TITLE).textContent,
        author: $dom.querySelector(QUERY_AUTHOR).textContent,
        date: $dom.querySelector(QUERY_DATE).textContent,
        content,
        imageList: content.match(imageRegex),
      };
    } catch (e) {
      console.warn(e);
    }
    return res;
  }
}

export default DetailCrawler;
