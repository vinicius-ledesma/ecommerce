import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    button: {
        height: '30px',
        outline: 'none',
        background: '#999',
        borderRadius: '5px',
        marginTop: '10px',
        border: '1px solid #888',
    },
    errorSpan: {
        color: 'red',
    },
    messageSpan: {
        color: 'black',
        fontWeight: 'bold',
        padding: '5px',
        fontSize: '30px',
    },
  }));

export default useStyles;
