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
  userPicWrapper,
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
        (data) => fullscreenPopup.open(data),
        (cardInstance) => {
          const request = cardInstance._isLiked
            ? apiConnection.onDislike(cardInstance._id)
            : apiConnection.onLike(cardInstance._id);

          request
            .then((updatedCard) => {
              cardInstance.setLikeState(updatedCard.isLiked);
            })
            .catch((err) => console.log(err));
        }
      );

      return card.getElement();
    },
  },
  cardsContainerSelector
);

apiConnection
  .getInitialCards()
  .then((cards) => {
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
      const { nome: name, sobre: about } = formValues;
      return apiConnection
        .editUserInfo(name, about)
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

      return apiConnection
        .addCard(name, link)
        .then((cardData) => {
          cardsSection.addItem(cardData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );
});

userPicWrapper.addEventListener("click", () => {
  createPopupForm(
    {
      title: "Alterar foto de perfil",
      fields: [
        {
          selector: ".form__input-name",
          placeholder: "Link da imagem",
          type: "url",
          min: 2,
          max: 400,
        },
      ],
      hideFields: [".form__input-type"],
    },
    (formValues) => {
      const avatarUrl = formValues.nome;

      return apiConnection
        .updateAvatar(avatarUrl)
        .then((result) => {
          userInfo.setUserInfo({
            pic: result.avatar,
          });
        })
        .catch((err) => console.log(err));
    }
  );
});

renderFooter();
