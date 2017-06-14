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
  /*eslint-disable*/
  const fakeAPI = {
        "batchcomplete": "",
        "continue": {
            "sroffset": 9,
            "continue": "-||"
        },
        "query": {
            "searchinfo": {
                "totalhits": 19017
            },
            "search": [
                {
                    "ns": 0,
                    "title": "Bill Gates",
                    "size": 90543,
                    "wordcount": 8870,
                    "snippet": "In 1975, <span class=\"searchmatch\">Gates</span> and Paul Allen co-founded Microsoft, which became the world's largest PC software company. During his career at Microsoft, <span class=\"searchmatch\">Gates</span> held the",
                    "timestamp": "2017-06-12T04:31:01Z"
                },
                {
                    "ns": 0,
                    "title": "Bill & Melinda Gates Foundation",
                    "size": 97928,
                    "wordcount": 9215,
                    "snippet": "<span class=\"searchmatch\">Bill</span> &amp; Melinda <span class=\"searchmatch\">Gates</span> Foundation (or the <span class=\"searchmatch\">Gates</span> Foundation, abbreviated as BMGF) is a private foundation founded by <span class=\"searchmatch\">Bill</span> and Melinda <span class=\"searchmatch\">Gates</span>. It was launched",
                    "timestamp": "2017-06-01T02:08:06Z"
                },
                {
                    "ns": 0,
                    "title": "Bill Gates's house",
                    "size": 5453,
                    "wordcount": 382,
                    "snippet": "Xanadu 2.0 is a mansion owned by <span class=\"searchmatch\">Bill</span> <span class=\"searchmatch\">Gates</span> that overlooks Lake Washington in Medina, Washington. The 66,000-square-foot (6,100 m2) mansion is noted for",
                    "timestamp": "2017-06-05T03:32:01Z"
                },
                {
                    "ns": 0,
                    "title": "Bill Gates (frontiersman)",
                    "size": 1533,
                    "wordcount": 186,
                    "snippet": "&quot;Swiftwater&quot; <span class=\"searchmatch\">Bill</span> <span class=\"searchmatch\">Gates</span> (died 1935) was an American frontiersman and fortune hunter, and a fixture in stories of the Klondike Gold Rush. He made and lost",
                    "timestamp": "2016-10-29T10:50:43Z"
                },
                {
                    "ns": 0,
                    "title": "William H. Gates Sr.",
                    "size": 8766,
                    "wordcount": 856,
                    "snippet": "William Henry &quot;<span class=\"searchmatch\">Bill</span>&quot; <span class=\"searchmatch\">Gates</span> (born William Henry <span class=\"searchmatch\">Gates</span> II; November 30, 1925), also known publicly as <span class=\"searchmatch\">Bill</span> <span class=\"searchmatch\">Gates</span> Sr. is a retired American attorney and",
                    "timestamp": "2017-05-31T19:07:39Z"
                },
                {
                    "ns": 0,
                    "title": "Bill Gates' flower fly",
                    "size": 2230,
                    "wordcount": 153,
                    "snippet": "<span class=\"searchmatch\">Bill</span> <span class=\"searchmatch\">Gates</span>' flower fly (Eristalis gatesi) is a flower fly found only in Costa Rican high montane cloud forests and named after <span class=\"searchmatch\">Bill</span> <span class=\"searchmatch\">Gates</span>. Another fly",
                    "timestamp": "2017-04-15T08:11:01Z"
                },
                {
                    "ns": 0,
                    "title": "Melinda Gates",
                    "size": 17585,
                    "wordcount": 1546,
                    "snippet": "Microsoft Bob, Encarta, and Expedia. She met <span class=\"searchmatch\">Bill</span> <span class=\"searchmatch\">Gates</span> while working at Microsoft. In 1994, she married <span class=\"searchmatch\">Gates</span> in a private ceremony held in Lanai, Hawaii",
                    "timestamp": "2017-05-31T15:36:06Z"
                },
                {
                    "ns": 0,
                    "title": "Bill Gates (disambiguation)",
                    "size": 1153,
                    "wordcount": 157,
                    "snippet": "<span class=\"searchmatch\">Bill</span> <span class=\"searchmatch\">Gates</span> (born 1955) is co-founder of Microsoft Corporation. <span class=\"searchmatch\">Bill</span> <span class=\"searchmatch\">Gates</span> or William <span class=\"searchmatch\">Gates</span> may also refer to: William H. <span class=\"searchmatch\">Gates</span>, Sr. (born 1925), philanthropist",
                    "timestamp": "2017-03-26T08:55:22Z"
                },
                {
                    "ns": 0,
                    "title": "Barbarians Led by Bill Gates",
                    "size": 2393,
                    "wordcount": 173,
                    "snippet": "Barbarians Led by <span class=\"searchmatch\">Bill</span> <span class=\"searchmatch\">Gates</span>: Microsoft from the Inside is a book that was jointly written by Jennifer Edstrom and Marlin Eller, an American programmer",
                    "timestamp": "2016-08-08T11:54:18Z"
                }
            ]
        }
    };
    /*eslint-enable*/

  return fakeAPI;
};

const generateElements = function (data) {
  const control = data.query.search.length;

  for (let i = 0; i < control; i += 1) {
    const item = document.createElement('div');
    const selector = document.createElement('div');
    const content = document.createElement('div');
    const heading = document.createElement('h1');
    const paragraph = document.createElement('p');

    item.className = 'item';
    selector.className = 'selector';
    content.className = 'content';

    let add = document.createTextNode(data.query.search[i].title);
    heading.innerHTML = add.textContent;

    add = document.createTextNode(data.query.search[i].snippet);
    paragraph.innerHTML = add.textContent;

    content.appendChild(heading);
    content.appendChild(paragraph);
    item.appendChild(selector);
    item.appendChild(content);

    const body = document.getElementById('body');
    const bodyBottom = document.getElementById('bottom');
    body.insertBefore(item, bodyBottom);
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

document.getElementById('submit').onclick = function () {
  // clear any previous items
  clearItems();

  // get a clean string to call api with
  const cleanString = getString();

  // call api and store results
  const fakeAPI = apiCall(cleanString);

  // generate elements
  generateElements(fakeAPI);

  // change layout to create room for search results
  changeLayout();
};
