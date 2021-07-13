import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
export const AlertDialog = ({
  isOpen,
  onConfirm,
  handleClose,
  title,
  subtitle,
  children,
}) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        onConfirm={onConfirm}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          <Typography variant="h5" component="h3">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{subtitle}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              onConfirm();
            }}
            color="primary"
          >
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AlertDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.element.isRequired,
};
