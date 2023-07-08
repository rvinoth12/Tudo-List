import { Alert, Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
// import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SubmitIcon from '../Icons/SubmitIcon';

const Card = ({name,amount,categories,onPress,index,deleteCategory,editeCategory,delTotal}) => {

  const [accord,setAccord] = useState(false);
  const [modal,setModal] = useState(false);
  const [editModal,setEditModal] = useState(false);
  const [category,setCategory] = useState({categoryName:'',categoryAmount:''});
  const [editCategory,setEditCategory] = useState({categoryName:'',categoryAmount:'',ind:null,cateIndex:null});

  // const regAmount = /^[0-9]$/

  const addCate =()=>{
    if(category.categoryName !=='' && category.categoryAmount !==''){
          onPress({category,index})
          setModal(false)
        }

        setCategory({categoryName : '' ,categoryAmount: ''})        
        
        
  }

  // delete items
  const deletIndex = (ind)=>{
    Alert.alert(
      'Discard Details',
      'Are you sure you want to delete this?',
      [
        {text:'No',style:'cancel', onPress:()=>{}},
        {text:'Yes',style:'destructive',onPress:()=>deleteCategory({index,ind})},
      ]
    )
    
  }

  // delete total item function
  const delTol = (index)=>{

    Alert.alert(
      'Discard Details',
      'Are you sure you want to delete this?',
      [
        {text:'No',style:'cancel', onPress:()=>{}},
        {text:'Yes',style:'destructive',onPress:()=>delTotal(index)},
      ]
    )
    

  } 

  // edite function
  const edite = (ind,index)=>{
    // alert(ind)
    setEditCategory({...editCategory,ind:ind,cateIndex:index})
    setEditModal(true)

  }

  const editCate = (ind)=>{
    if(editCategory.categoryName !=='' && editCategory.categoryAmount !=='' ){
      editeCategory(editCategory)
      setEditModal(false)
    }
  }



  //regex 


  return (
    <View style={{marginVertical:'3%',paddingHorizontal:"10%" }}>

      <TouchableOpacity onLongPress={delTol.bind(this,index)} onPress={()=>setAccord(!accord)} style={[styles.flex,{backgroundColor:'white',shadowColor:'black', elevation:8,padding:20,borderRadius:20,borderBottomStartRadius:0}]}>
          <Text  style={{fontSize:20}}>{name}</Text>
        <View style={[styles.flex,{gap:40}]}>
          <Text style={{fontSize:20}}>{amount}</Text>
          <SubmitIcon antIconName='down' size={20} color={'black'} />
        </View>
      </TouchableOpacity>

      {
      accord &&  
      <View style={[styles.box]}>
        <TouchableOpacity  style={{backgroundColor:'navy',justifyContent:'flex-end'}}>
            <Text style={{padding:10,color:'white'}} onPress={()=>setModal(true)} >Add</Text>
        </TouchableOpacity>
 
      {
          categories.length == 0 &&
          <Text style={{textAlign:'center',padding:20,}}>No categories</Text> 
      }
      
      {
        categories?.map((items,ind)=>{
          return(


              <View key={ind} style={[styles.flex,styles.boxShadow,{shadowColor:'black', elevation:10}]}>
                
                <Text style={{fontSize:16}}>{items?.category}</Text>
                <View style={[styles.flex,{gap:15}]}>
                <Text style={{fontSize:16}}>{items?.amount}</Text>
                  <TouchableOpacity >
                    <SubmitIcon onPress={edite.bind(this,ind,index)} antIconName='edit' size={20} color='green'  />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <SubmitIcon onPress={deletIndex.bind(this,ind)} antIconName='delete' size={20} color='red'  />
                  </TouchableOpacity>
                </View>

              </View>
         
          )
        })
      }
      </View>
     }
      {/* ************* Add categories modal ************** */}
     <Modal animationType='slide' visible={modal} transparent={true} >
      <View style={[styles.container,{backgroundColor:'rgba(0,0,0,0.5)',}]}>
        <View style={[styles.boxShadow,{alignItems:'center',justifyContent:'center',width:'80%', height:400,gap:40}]}>
          <Text style={{color:'green',fontSize:20}}>ADD CATEGORY</Text>
          <View style={[{width:'70%',backgroundColor:'white',paddingVertical:5,borderBottomWidth:1,borderColor:'lightgray'}]}>
            <TextInput placeholder='Select categories' onChangeText={(e)=>setCategory({...category,categoryName:e})} style={{fontSize:20,textAlign:'center'}} />
          </View>

          <View style={[styles.flex,{width:'70%',justifyContent:'flex-start',borderBottomWidth:1,borderColor:'lightgray',paddingVertical:5,gap:10}]}>
            <Text style={{fontSize:30}} >&#8377;</Text>
            <TextInput keyboardType='number-pad' style={{fontSize:30,textAlign:'center'}} onChangeText={(e)=>setCategory({...category,categoryAmount:e})}  placeholder='Enter Amount' />
          </View>

          <TouchableOpacity style={{backgroundColor:'blue',borderRadius:20,justifyContent:"center",width:Dimensions.get('window').width -200,height:40,}}>
            <Text style={{color:'white',textAlign:'center'}}  onPress={addCate} >ADD</Text>
          </TouchableOpacity>
          

        <SubmitIcon antIconName="close" onPress={()=>setModal(false)} color={'red'} style={{position:'absolute',top:20,right:20}}/>
        </View>
      </View>
      
     </Modal>


     {/* *************** Edite categories */}

     <Modal animationType='slide' visible={editModal} transparent={true} >
      <View style={[styles.container,{backgroundColor:'rgba(0,0,0,0.5)',}]}>
        <View style={[styles.boxShadow,{alignItems:'center',justifyContent:'center',width:'80%', height:400,gap:40}]}>
      <Text style={{color:'red',fontSize:20}}>EDIT CATEGORY</Text>
          <View style={[{width:'70%',backgroundColor:'white',paddingVertical:5,borderBottomWidth:1,borderColor:'lightgray'}]}>
            <TextInput placeholder='Select categories' onChangeText={(e)=>setEditCategory({...editCategory,categoryName:e})} style={{fontSize:20,textAlign:'center'}} />
          </View>

          <View style={[styles.flex,{width:'70%',justifyContent:'flex-start',borderBottomWidth:1,borderColor:'lightgray',paddingVertical:5,gap:10}]}>
            <Text style={{fontSize:30}} >&#8377;</Text>
            <TextInput keyboardType='number-pad' style={{fontSize:30,textAlign:'center'}} onChangeText={(e)=>setEditCategory({...editCategory,categoryAmount:e})}  placeholder='Enter Amount' />
          </View>

          <TouchableOpacity style={{backgroundColor:'blue',borderRadius:20,justifyContent:"center",width:Dimensions.get('window').width -200,height:40,}}>
            <Text style={{color:'white',textAlign:'center'}}  onPress={editCate} >ADD</Text>
          </TouchableOpacity>
          

        <SubmitIcon antIconName="close" onPress={()=>setEditModal(false)} color={'red'} style={{position:'absolute',top:20,right:20}}/>
        </View>
      </View>
      
     </Modal>

    </View>
  )
}

export default Card;


const styles = StyleSheet.create({
    box:{
      backgroundColor:'rgba(230,230,230,1)',
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
      top:-9,
      alignItems:'center',
      width:'100%'
     
    },
    boxShadow:{
      width:'90%',
      borderRadius:13,
      backgroundColor:'white',
      padding:20,
      marginVertical:10,
      
     
    },
    flex:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    },
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    }
})