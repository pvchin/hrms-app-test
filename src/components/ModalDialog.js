import React from "react";
import Dialog from "@material-ui/core/Dialog";
import SigninForm from "./SigninForm";

const ModalDialog = ({ openDialog, handleCloseDialog }) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <SigninForm handleCloseDialog={handleCloseDialog} />
    </Dialog>
  );
};

export default ModalDialog;
