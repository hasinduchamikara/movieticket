import { styled } from '@mui/material/styles';
import {
  Dialog as MaterialDialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(MaterialDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Dialog = ({ title, open=false, onCose, children }) => {

  return (
    <BootstrapDialog open={open} onClose={onCose}>
      <BootstrapDialogTitle onClose={onCose}>{title}</BootstrapDialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </BootstrapDialog>
  );
};

export default Dialog;
