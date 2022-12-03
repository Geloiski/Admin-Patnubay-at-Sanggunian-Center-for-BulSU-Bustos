

const style = {
  

    breadcrumbsTitle: {
        fontFamily: 'semibold',
        fontSize: '35px',
        color: '#fff',
    },

    breadcrumbsSubtitle: {
        fontFamily: 'poppins',
        color: '#fff',
        textAlign: 'center',
    },

    mainContainer: {
        width: {
            xs: '90%',
            sm: '90%',
            md: '90%',
            lg: '70%',
        },
        margin: 'auto',
        marginTop: '30px',
        marginBottom: '30px',

    },

    userContainer: {
        border: '1px solid #e6e6e6',
        backgroundColor: '#1A1A1A',
    },

    userInfoContainer: {
        padding: '15px',
    },

    infoName: {
        fontFamily: 'semibold',
        fontSize: '17px',
        textTransform: 'uppercase',
        color: '#fff',
    },

    infoAddress: {
        fontFamily: 'poppins',
        fontSize: '13px',
        color: '#BFBFBF',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
        width: '80%',
    },

    infoEmail: {
        fontFamily: 'poppins',
        fontSize: '13px',
        color: '#BFBFBF',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
        width: '80%',
    },

    infoContact: {
        fontFamily: 'poppins',
        fontSize: '13px',
        color: '#BFBFBF',
    },

    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },

    editButton: {
        boxShadow: 0,
        borderRadius: 0,
        fontFamily: 'poppins',
        backgroundColor: '#ad230e',
        padding: '8px',
        minWidth: '30px',

        '&:hover': {
            boxShadow: 0,
            backgroundColor: '#7d1a0b',
        },
    },

    icon: {
        fontSize: '15px',
    },

    orderContainer: {
        marginTop: '15px',
    },

    orderBox: {
        backgroundColor: '#fff',
        border: '1px solid #e6e6e6',
        marginBottom: '10px',
    },

    productImageGrid: {
        padding: '10px',
    },

    productDetails: {
        marginLeft: '10px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
    },

    productTitle: {
        fontFamily: 'semibold',
        color: '#ad230e',
    },

    productDescription: {
        width: '60%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
        fontFamily: 'poppins',
        fontSize: '14px',
        color: '#40403f',
    },

    priceBox: {
        display: 'flex',
        alignItems: 'center',
    },

    priceLabel: {
        fontFamily: 'semibold',
        fontSize: '14px',
        marginRight: '10px',
    },

    priceText: {
        fontFamily: 'poppins',
        fontSize: '14px',
    },

    statusContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginBottom: {
            xs: '15px',
            sm: '15px',
        },
    },

    statusPending: {
        fontFamily: 'poppins',
        backgroundColor: '#ad230e',
        color: '#fff',
        fontSize: '13px',
        padding: '5px',
    },

    statusProcessing: {
        fontFamily: 'poppins',
        backgroundColor: '#c46900',
        color: '#fff',
        fontSize: '13px',
        padding: '5px',
    },

    statusDelivery: {
        fontFamily: 'poppins',
        backgroundColor: '#20a103',
        color: '#fff',
        fontSize: '13px',
        padding: '5px',
    },

    titleOrder: {
        fontFamily: 'semibold',
        marginBottom: '10px',
    },

    boxModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: '90%',
            sm: '70%',
            md: '40%',
        },
        boxShadow: 24,
        bgcolor: '#fff',
    },

    modalContainer: {
        padding: '10px',
    },

    perItemModal: {
        marginBottom: '5px',
    },

    modalLabel: {
        fontFamily: 'poppins',
        fontSize: '14px',
        marginBottom: '5px',
    },

    textBoxModal: {
        '& fieldset': {
            borderColor: '#cccccc',
        },
        '&:hover fieldset': {
            borderColor: '#4f4f4f',
        },
        '&.Mui-focused fieldset': {
            border: '1px solid #ad230e',
        },

        fontFamily: 'Poppins',
        fontSize: '10px',
        width: '100%',
        borderRadius: 0,

        '& .MuiInputBase-input': {
            color: '#000',
            padding: '10px',
            backgroundColor: '#fff',
        },
        mb:1,
    },

    saveButton: {
        backgroundColor: '#ad230e',
        fontFamily: 'poppins',
        width: '100%',
        color: '#fff',
        textTransform: 'capitalize',
        borderRadius: 0,
        boxShadow: 0,

        '&:hover': {
            backgroundColor: '#7d1a0b',
            boxShadow: 0,
        },
    },

    uploadButton: {
        fontFamily: 'poppins',
        width: '100%',
        color: '#fff',
        backgroundColor: '#ad230e',
        textTransform: 'capitalize',
        borderRadius: 0,
        boxShadow: 0,

        '&:hover': {
            backgroundColor: '#7d1a0b',
            boxShadow: 0,
        },
    },
    logoutButton: {
        fontFamily: 'poppins',
        width: '100%',
        color: '#fff',
        backgroundColor: '#ad230e',
        textTransform: 'capitalize',
        borderRadius: 0,
        boxShadow: 0,

        '&:hover': {
            backgroundColor: 'red',
            boxShadow: 0,
        },
    },

    headerModal: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        marginBottom: '15px',
        backgroundColor: '#1A1A1A',
    },

    modalHeadText: {
        color: '#fff',
        fontFamily: 'poppins',
        fontSize: '14px',
    },

    modalIcon: {
        color: '#fff',
        marginRight: '10px',
    },
}
export default style;