import React, { useState, useEffect } from "react";

import Questions from '../questions';
import Modal from '../modal';

import service from './service';




function FormModal(props) {

    return (
        <Modal
          mode={props.mode}
          openDialog={props.openDialog}
          onClose={() => {
            props.setOpenDialog(false);
            props.onSelectedForm(undefined);
            onSelectedQuestion(undefined);
          }}
          title={
            props.state.selectedForm ? "Edita tu formulario" : "Crea tu formulario"
          }
          description={props.state.selectedForm ? "Estás editando" : "Estás creando"}
          onAccept={(form) => {
            props.setOpenDialog(false);
            props.state.forms.find((form) => form.id === props.state.selectedForm.id)
              ? onUpdateForm(form)
              : onCreateForm(form);
          }}
          onUpdateForm={onUpdateForm}
          onCreateForm={onCreateForm}
          onSelectedForm={props.onSelectedForm}
          state={props.state}
        >
          <Questions
            state={props.state}
            onAddedQuestion={onAddedQuestion}
            onSelectedQuestion={onSelectedQuestion}
            onDeleteQuestion={onDeleteQuestion}
            onUpdateQuestion={onUpdateQuestion}
          />
        </Modal>
    );


  function onSelectedQuestion(question) {
    return service.onSelectedQuestion({ state: props.state, question }).then(props.setState);
  }

  function onAddedQuestion(question) {
    return service.onAddedQuestion({ state: props.state, question }).then(props.setState);
  }

  function onDeleteQuestion(id) {
    return service.onDeleteQuestion({ state: props.state, id }).then(props.setState);
  }

  function onUpdateQuestion(question, qType) {
    return service.onUpdateQuestion({ state: props.state, question, qType }).then(props.setState);
  }

  async function onCreateForm(form) {
    props.setLoading(true);
    const result = await service.onCreateForm({ state: props.state, form });

    if(result) {
      Object.assign({}, props.state, {
        selectedForm: undefined,
        selectedQuestion: undefined,
      });
      location.reload();
    } else {
      window.alert("Form couldn't be created, please check and try again.");
      props.setLoading(false);
    }
    // return service.onCreateForm({ state, form }).then(setState);
  }

  async function onUpdateForm(form) {
    props.setLoading(true);
    const result = await service.onUpdateForm({ state: props.state, form });

    if(result) {
      location.reload();
    } else {
      window.alert("Form couldn't be updated, please check and try again.");
      props.setLoading(false);
    }
    // return service.onUpdateForm({ state, form }).then(setState);
  }

};

export default FormModal;