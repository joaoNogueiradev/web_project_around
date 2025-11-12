export const overlay = document.querySelector(".overlay");

function onEsc(e) {
  if (e.key === "Escape" && overlay.classList.contains("overlay_active")) {
    closeOverlay();
  }
}

function onOverlayClick(e) {
  if (
    e.target === overlay ||
    e.target.closest(".fullscreen__delete-button") ||
    e.target.closest(".form__close-button")
  ) {
    closeOverlay();
  }
}

export function openOverlay(contentNode) {
  overlay.innerHTML = "";
  if (contentNode) overlay.append(contentNode);
  overlay.classList.add("overlay_active");
  document.addEventListener("keydown", onEsc);
  overlay.addEventListener("click", onOverlayClick);
}

export function closeOverlay() {
  overlay.classList.remove("overlay_active");
  overlay.innerHTML = "";
  document.removeEventListener("keydown", onEsc);
  overlay.removeEventListener("click", onOverlayClick);
}

export function renderFooter() {
  const footerParagraph = document.querySelector(".footer__text");

  footerParagraph.innerHTML = `&copy; ${new Date().getFullYear()} Around The U.S.`;
}

export function showFullscreenImage() {
  document.querySelector(".cards").addEventListener("click", (e) => {
    if (e.target.closest(".card__image")) {
      const clickedCard = e.target.closest(".card");
      const image = clickedCard.querySelector(".card__image").src;
      const name = clickedCard.querySelector(
        ".card__text-paragraph"
      ).textContent;

      const fullscreenImage = document
        .querySelector(".fullscreen__template")
        .content.cloneNode(true);

      fullscreenImage.querySelector(".fullscreen__image").src = image;
      fullscreenImage.querySelector(".fullscreen__image").alt = name;
      fullscreenImage.querySelector(".fullscreen__name").textContent = name;

      overlay.innerHTML = "";
      overlay.append(fullscreenImage);
      openOverlay();
    }
  });
}

export function enableFullscreenOn(container) {
  container.addEventListener("click", (e) => {
    const img = e.target.closest(".card__image");
    if (!img) return;

    const card = e.target.closest(".card");
    const name = card.querySelector(".card__text-paragraph").textContent;

    const fullscreen = document
      .querySelector(".fullscreen__template")
      .content.cloneNode(true);

    fullscreen.querySelector(".fullscreen__image").src = img.src;
    fullscreen.querySelector(".fullscreen__image").alt = name;
    fullscreen.querySelector(".fullscreen__name").textContent = name;

    openOverlay(fullscreen);
  });
}