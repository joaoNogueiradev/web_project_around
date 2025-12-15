import Card from "../src/components/Card.js";
import Section from "../src/components/Section.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import renderFooter from "../src/utils/utils.js";
import UserInfo from "../src/components/UserInfo.js";
import API from "../src/components/Api.js";

import {
  editUserButton,
  addPlaceButton,
  cardsContainerSelector,
  cardTemplateSelector,
  fullscreenTemplateSelector,
  userSelectors,
  validationConfig,
  overlaySelector,
  userPic,
} from "../src/utils/constants.js";
import PopupWithConfirmation from "../src/components/PopupWithConfirmation.js";

const apiConnection = new API(
  "https://around-api.pt-br.tripleten-services.com/v1",
  {
    authorization: "de8e7ffa-aeef-4255-b868-e53b98b41157",
  }
);

const cardsSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = new Card(
        item,
        cardTemplateSelector,
        (cardInstance) => {
          cardToDelete = cardInstance;
          confirmationPopup.open();
        },
        (data) => fullscreenPopup.open(data)
      );

      return card.getElement();
    },
  },
  cardsContainerSelector
);

apiConnection
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    cardsSection.setItems(cards);
    cardsSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

let cardToDelete = null;

const fullscreenPopup = new PopupWithImage(
  overlaySelector,
  fullscreenTemplateSelector
);

const confirmationPopup = new PopupWithConfirmation(overlaySelector, () => {
  if (!cardToDelete) return;

  apiConnection
    .removeCard(cardToDelete._id)
    .then(() => {
      cardToDelete.remove();
      cardToDelete = null;
    })
    .catch((err) => console.log(err));
});

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
  aboutSelector: userSelectors.aboutSelector,
  picSelector: userSelectors.picSelector,
});

apiConnection
  .getUserInfo()
  .then((result) => {
    userInfo.setUserInfo({
      name: result.name,
      about: result.about,
      pic: result.avatar,
    });
  })
  .catch((err) => {
    console.log(`${err} Erro ao buscar os dados do usuário`);
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
          value: currentUser.about,
        },
      ],
    },
    (formValues) => {
      const { nome, sobre } = formValues;
      apiConnection
        .editUserInfo(nome, sobre)
        .then((result) => {
          userInfo.setUserInfo({
            name: result.name,
            about: result.about,
          });
        })
        .catch((err) => {
          console.log(`${err} Erro ao buscar os dados do usuário`);
        });
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

      apiConnection
        .addCard(name, link)
        .then((cardData) => {
          const cardElement = new Card(
            { name: cardData.name, link: cardData.link },
            cardTemplateSelector,
            (name) => console.log("Deletar:", name),
            (data) => fullscreenPopup.open(data)
          ).getElement();

          cardsSection.addItem(cardElement);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );
});

userPic.addEventListener("click", () => {});

renderFooter();
