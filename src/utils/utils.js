export default function renderFooter() {
  const footerParagraph = document.querySelector(".footer__text");

  footerParagraph.innerHTML = `&copy; ${new Date().getFullYear()} Around The U.S.`;
}
