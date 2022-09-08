const Notification = ({ message }) => {
    const alertStyle = {
        color: 'green',
        background: 'lightgreen',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if(message === null) {
        return null
    }

    return(
        <div style={alertStyle}>
            {message}
        </div>
    )
}

export default Notification