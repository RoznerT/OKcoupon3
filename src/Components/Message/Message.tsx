import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import ErrorModel from "../../Model/MsgModel";
import CloseIcon from '@mui/icons-material/Close';

interface ErrorProps{
    isError:boolean;
    error: ErrorModel | undefined;
    onClickHandle : () => void;
}

function Message(props:ErrorProps): JSX.Element {
  
    return ( 
    <Box sx={{width:"40%" ,height: "80%", position:"fixed" , bottom:"0" , mb:"2%" ,left:0}}>
    <Snackbar open={props.isError} autoHideDuration={5000} onClose={props.onClickHandle}>
    <Alert 
    severity="error"
    action={
        <IconButton
    aria-label="close"
      color="inherit"
      size="medium"
      onClick={props.onClickHandle}
      >
        <CloseIcon fontSize="inherit"/>
      </IconButton>
      
    } sx={{mb:5, width: 800, height: 100, border: 2,
    borderColor: "red", }}>
        <h3>
        Http Status: {props.error?.status} , &nbsp;
        {props.error?.error} &nbsp;
        {props.error?.description}
        </h3>
    </Alert>
    </Snackbar>
    </Box>
     );
}

export default Message;
