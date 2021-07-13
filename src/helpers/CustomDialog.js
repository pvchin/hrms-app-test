import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
export const CustomDialog = ({
  isOpen,
  handleClose,
  title,
  subtitle,
  children,
  showButton,
  isFullscreen,
  isFullwidth,
}) => {
  return (
    <>
      <Dialog
        fullWidth={isFullwidth ? true : false}
        fullScreen={isFullscreen ? true : false}
        maxWidth="md"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{subtitle}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          {showButton ? (
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
};

CustomDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.element.isRequired,
  showButton: PropTypes.bool.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  isFullwidth: PropTypes.bool.isRequired,
};
