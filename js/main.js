const changeLayout = function () {
  const main = document.getElementById('mainContainer');
  main.style.gridRow = 1;
  main.style.flexDirection = 'row';
  main.style.justifyContent = 'center';

  /*
    document.querySelector('style').textContent +=
      '@media screen and (max-width: 410px) { #pageTitle { display: none; }';
  */

  const title = document.getElementById('pageTitle');
  title.style.display = 'none';

  const logo = document.getElementById('logo');
  logo.style.maxWidth = 'calc(50px + 5vh)';
  logo.style.marginBottom = '15%';

  const random = document.getElementById('random');
  random.style.display = 'none';
};

document.getElementById('submit').onclick = function () {
  changeLayout();
};
