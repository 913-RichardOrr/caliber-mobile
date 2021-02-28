import {StyleSheet} from 'react-native';

const catStyle = StyleSheet.create({
    tab: {
        backgroundColor:'#F26925',
    },
    header: {
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: '5%',
        marginTop: '5%',
        marginBottom: 50,
        color: '#474C55'
    },
    instruct: {
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: '700',
        color: '#474C55',
        fontStyle: 'italic',
        marginTop: -5,
        marginBottom:2

    },

    editBtn: {
        backgroundColor: '#72A4C2',
        margin: 2,
    },
    closeBtn: {
        backgroundColor: '#72A4C2',
        margin: 10,
        borderRadius: 20,
        alignSelf: 'center',
        width:'90%'

    },
    modalActionBtn: {
        backgroundColor: '#F26925',
        margin: 10,
        borderRadius: 20,
        alignSelf: 'center',
        width:'90%'
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 20,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        alignSelf: 'center'
    },
    modal: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 5,
        borderRadius: 10,
        borderColor: '#474C55',
        padding: 30,
        width: '90%',
        minHeight: 350,
        maxHeight:'60%' ,
        marginTop:'auto',
        marginBottom: 'auto',
        alignSelf: 'center',
        justifyContent:'center', 
    },
    modalTextInput: {
        alignSelf:'center',
        width:'90%',
        height:40,
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: '#B9B9BA',
        paddingLeft:10,
        paddingRight:10,
        fontSize: 16,
        borderColor: '#474C55',
        borderWidth:2,
        borderRadius: 4
    },
    addBtn: {
        borderColor:'#F26925',
        width:'95%',
        height: 30,  
        borderRadius: 10,
        backgroundColor: '#F26925',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom:5

        
    },
    offText: {
        color: '#B9B9BA',
    },
    text: {
        color:'#000',
        fontSize: 20,
        justifyContent: 'center',
        marginTop: 7,
        marginLeft: 15
    },
    addCatText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        alignSelf:'center'
    }, 
    inputBar: {
        backgroundColor:'white',
        color: '#474C55',
        marginRight: '2.5%',
        borderRadius: 5,
        paddingLeft:10,
        paddingRight:10,
    },
    inputContainer: {
        backgroundColor: '#72A4C2',
        borderRadius: 25,
        color: 'white',
        alignItems: 'center',
    },
    searchContainer: {
        backgroundColor:'white',
        borderWidth: 0,
        borderBottomColor: 'white',
        borderTopColor: 'white',
        
    }, 
    sectionHeaderContainer: {
        backgroundColor: '#B9B9BA',
    },
    sectionHeaderLabel: {
        color: '#474C55',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 15,
        padding: 2
    },
})

export default catStyle;