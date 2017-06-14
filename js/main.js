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
  changeLayout();
};
