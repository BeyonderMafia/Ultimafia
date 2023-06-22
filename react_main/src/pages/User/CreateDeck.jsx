import React, { useContext, useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { SiteInfoContext, UserContext } from "../../Contexts";
import Form, { useForm } from "../../components/Form";
import axios from "axios";
import { useErrorAlert } from "../../components/Alerts";
import LoadingPage from "../Loading";
import {
  tempParseProfilesToWords,
  tempParseWordsToProfiles,
} from "../../components/Deck";

export default function CreateDeck() {
  const user = useContext(UserContext);

  const [formFields, updateFormFields, resetFormFields] = useForm([
    {
      label: "Deck Name",
      ref: "name",
      type: "text",
    },
    {
      label: "Deck Words",
      ref: "words",
      type: "text",
      textStyle: "large",
    },
  ]);

  function onCreateDeck(editing) {
    axios
      .post("/deck/create", {
        name: formFields[0].value,
        profiles: tempParseWordsToProfiles(formFields[1].value),
        editing: editing,
        id: params.get("edit"),
      })
      .then(() => {
        siteInfo.showAlert(
          `${editing ? "Edited" : "Created"} deck '${formFields[0].value}'`,
          "success"
        );
      })
      .catch(errorAlert);
  }

  const errorAlert = useErrorAlert();
  const [editing, setEditing] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const siteInfo = useContext(SiteInfoContext);

  useEffect(() => {
    document.title = "Create Anonymous Deck | UltiMafia";
  }, []);

  useEffect(() => {
    if (params.get("edit")) {
      axios
        .get(`/setup/${params.get("edit")}`)
        .then((res) => {
          var deck = res.data;

          setEditing(true);

          let words = tempParseProfilesToWords(deck.profiles);
          deck.words = words;

          var formFieldChanges = [];

          for (let field of formFields) {
            if (deck[field.ref]) {
              let value = deck[field.ref];

              formFieldChanges.push({
                ref: field.ref,
                prop: "value",
                value: value,
              });
            }
          }

          updateFormFields(formFieldChanges);
        })
        .catch(errorAlert);
    }
  }, []);

  if (editing && !params.get("edit")) {
    resetFormFields();
  }

  if (params.get("edit") && !editing) return <LoadingPage />;

  return (
    <div className="span-panel main create-deck">
      {user.loggedIn && (
        <div className="creation-options">
          <Form
            fields={formFields}
            onChange={updateFormFields}
            submitText={editing ? "Edit" : "Create"}
            onSubmit={() => onCreateDeck(editing)}
          />
        </div>
      )}
    </div>
  );
}
