document.getElementById('search').addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById('submit').click();
  }
});

const clearItems = function () {
  const toRemove = document.getElementsByClassName('item');

  for (let i = toRemove.length - 1; i >= 0; i -= 1) {
    const parent = toRemove[i].parentNode;
    parent.removeChild(toRemove[i]);
  }
};

const changeLayout = function () {
  const main = document.getElementById('mainContainer');
  main.style.gridRow = 1;
  main.style.flexDirection = 'row';
  main.style.justifyContent = 'center';

  /*
    document.querySelector('style').textContent +=
      '@media screen and (max-width: 410px) { #pageTitle { display: none; }';
  */

  const logo = document.getElementById('logo');
  logo.style.maxWidth = 'calc(50px + 5vh)';

  const title = document.getElementById('pageTitle');
  title.style.display = 'none';

  const search = document.getElementById('searchBox');
  search.style.marginBottom = '-25px';

  const random = document.getElementById('random');
  random.style.display = 'none';

  const items = document.getElementsByClassName('item');
  for (let i = 0; i < items.length; i += 1) {
    items[i].style.display = 'flex';
  }
};

const getString = function () {
  // retrieve value of input
  const search = document.getElementById('search').value;

  // remove invalid characters and leading/trailing whitespace
  let cleanString = search.replace(/([^A-Za-z0-9\s]+)/gi, '').trim();

  // replace remaining long amount of whitespace with nothing (max 1 whitespace)
  cleanString = cleanString.replace(/ +(?= )/g, '');

  // display edited string in search box
  document.getElementById('search').value = cleanString;

  // convert string to all lowercase and replace whitespace with '+' for api call
  cleanString = cleanString.replace(/\s/gi, '+').toLowerCase();

  return cleanString;
};

const apiCall = function (string) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${string}&srlimit=9&origin=*`;

  console.log(string);
  console.log(url);

  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = e => reject(Error(`Network Error: ${e}`));
    req.send();
  });
};

const generateElements = function (apiData) {
  const data = JSON.parse(apiData);
  const control = data.query.search.length;

  for (let i = 0; i < control; i += 1) {
    // elements for each item
    const item = document.createElement('div');
    const selector = document.createElement('div');
    const content = document.createElement('div');
    const heading = document.createElement('h1');
    const paragraph = document.createElement('p');
    const anchor = document.createElement('a');

    // class names for a few elements
    item.className = 'item';
    selector.className = 'selector';
    content.className = 'content';

    // create link for item
    let link = data.query.search[i].title;
    link = link.replace(/\s/gi, '_');
    anchor.href = `https://en.wikipedia.org/wiki/${link}`;
    anchor.target = '_blank';

    // add title to heading element
    let add = document.createTextNode(data.query.search[i].title);
    heading.innerHTML = add.textContent;

    // add snippet to paragraph element
    add = document.createTextNode(data.query.search[i].snippet);
    paragraph.innerHTML = add.textContent;

    // add children to correct parents
    content.appendChild(heading);
    content.appendChild(paragraph);
    anchor.appendChild(selector);
    anchor.appendChild(content);
    item.appendChild(anchor);

    // insert div item into html
    const body = document.getElementById('body');
    const bodyBottom = document.getElementById('bottom');
    body.insertBefore(item, bodyBottom);
  }

  console.log('length: ' + data.query.search.length);
  if (data.query.search.length === 0) {
    console.log('fix it dummy');
    const item = document.createElement('div');
    const content = document.createElement('div');
    const heading = document.createElement('h1');
    const paragraph = document.createElement('p');

    item.className = 'item';
    content.className = 'content';

    heading.innerHTML = 'No results';
    paragraph.innerHTML = 'Please try a new search!';

    content.appendChild(heading);
    content.appendChild(paragraph);
    item.appendChild(content);

    const body = document.getElementById('body');
    const bodyBottom = document.getElementById('bottom');
    body.insertBefore(item, bodyBottom);
  }

  changeLayout();
};

let test = '';

document.getElementById('submit').onclick = function () {
  const query = document.getElementById('search').value;

  // test if search query changed or is not blank
  if (document.getElementById('search').value !== '' && query !== test) {
    test = query;

    // clear any previous items
    clearItems();

    // get a clean string to call api with
    const cleanString = getString();

    // call api and store results
    apiCall(cleanString).then((data) => {
      generateElements(data);
    }).catch((err) => { alert(err); });
  }
};
