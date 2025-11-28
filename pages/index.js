import Card from "../src/components/Card.js";
import Section from "../src/components/Section.js";
import Popup from "../src/components/Popup.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import renderFooter from "../src/utils/utils.js";
import UserInfo from "../src/components/UserInfo.js";

import {
  editUserButton,
  addPlaceButton,
  cardsContainerSelector,
  cardTemplateSelector,
  fullscreenTemplateSelector,
  userSelectors,
  validationConfig,
  initialCards,
  overlaySelector,
} from "../src/utils/constants.js";

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      return new Card(
        item,
        cardTemplateSelector,
        (name) => console.log("Deletar:", name),
        (data) => fullscreenPopup.open(data)
      ).getElement();
    },
  },
  cardsContainerSelector
);

const fullscreenPopup = new PopupWithImage(
  overlaySelector,
  fullscreenTemplateSelector
);

const overlay = new Popup(overlaySelector);

function createPopupForm(formConfig, handleSubmit) {
  const popup = new PopupWithForm(
    overlaySelector,
    formConfig,
    handleSubmit,
    validationConfig
  );
  popup.open();
}

const userInfo = new UserInfo({
  nameSelector: userSelectors.nameSelector,
  jobSelector: userSelectors.jobSelector,
});

editUserButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  createPopupForm(
    {
      title: "Editar perfil",
      fields: [
        {
          selector: ".form__input-name",
          min: 2,
          max: 40,
          value: currentUser.name,
        },
        {
          selector: ".form__input-type",
          min: 2,
          max: 200,
          value: currentUser.job,
        },
      ],
    },
    (formValues) => {
      const { nome, sobre } = formValues;
      userInfo.setUserInfo({ name: nome, job: sobre });
    }
  );
});

addPlaceButton.addEventListener("click", () => {
  createPopupForm(
    {
      title: "Novo Lugar",
      fields: [
        {
          selector: ".form__input-name",
          placeholder: "Título",
          min: 2,
          max: 30,
        },
        { selector: ".form__input-type", placeholder: "Imagem", type: "url" },
      ],
    },
    (formValues) => {
      const { nome: name, sobre: link } = formValues;

      const cardElement = new Card(
        { name, link },
        cardTemplateSelector,
        (name) => console.log("Deletar:", name),
        () => overlay.open()
      ).getElement();

      cardsSection.addItem(cardElement);
    }
  );
});

cardsSection.renderItems();
renderFooter();
