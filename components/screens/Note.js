import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, StatusBar, TextInput, StyleSheet, Dimensions, ScrollView } from "react-native";
import Color from "../color/Color";
import Card from "./card";
import { TouchableOpacity } from "react-native-gesture-handler";
import SubmitIcon from "../Icons/SubmitIcon";

const Note = ({navigation}) => {
  const [time,setTime] = useState('');
  const [total,setTotal] = useState([])


// get time
  // const getTime =() => {
  //   let day = new Date().getHours();

  //   if(day < 12){
  //       setTime("Morning")
  //   }
  //   else if(day >= 12 && day <7){
  //       setTime("Afternoon")
  //   }
  //   else if(day >= 8){
  //       setTime("Night")
  //   }
  // };

  // useEffect(()=>{getTime()},[getTime])
  

  //   Add total function

  const requestOptions = {
    method: 'POST', 
    mode: 'cors', 
    headers: { 'Content-Type': 'application/json' },
    body:  JSON.stringify({
      name:'Total Amount',
      amount : 0,
      categories:[]
        }),

    redirect: 'follow'
  }

  const addBtn = async()=> {
    await fetch('http://192.168.1.20:8181/expense',requestOptions)
    .then((res)=>res.json())
    .then((res)=>{
      setTotal(res)
      console.log('total',total)
      console.log('res',res)

    })
  
  }

    // add categories 
  
  const addCategories = async({category,index})=>{
    console.log('index',index)
    console.log('datass',category)

    const requestOptions = {
      method: 'POST', 
      mode: 'cors', 
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify(
            {
              id: index , name:'category',category:category?.categoryName,amount:category?.categoryAmount
            },
          ),
  
      redirect: 'follow'
    }
    await fetch('http://192.168.1.20:8181/expense',requestOptions)
    .then((res)=>res.json())
    .then((result)=>{
      setTotal(result)
      alert('success')
      console.log('result',result)
    })
    
  }
  
  // delete function 
  const deleteCategory = async({index,ind})=>{
    const requestOptions = {
      method: 'POST', 
      mode: 'cors', 
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify({ name: 'delete',totalIndex:index,DeleteIndex:ind}),
  
      redirect: 'follow'
    }
    await fetch('http://192.168.1.20:8181/expense',requestOptions)
    .then((res)=>res.json())
    .then((result)=>{
      setTotal(result)
      alert('delete success')
      console.log('result',result)
    })
  }


  const editeCategory = async(editCate)=>{

    console.log(editCate)
    const requestOptions = {
      method: 'POST', 
      mode: 'cors', 
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify({ name: 'edit',editCate:editCate}),
  
      redirect: 'follow'
    }
    await fetch('http://192.168.1.20:8181/expense',requestOptions)
    .then((res)=>res.json())
    .then((res)=>{
      setTotal(res)
      alert('edite success')
      console.log('result',res)
    })
  }


  // delete total items
  const delTotal = async(index)=>{
    const requestOptions = {
      method: 'POST', 
      mode: 'cors', 
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify({ name: 'deltotal',DeleteIndex:index}),
  
      redirect: 'follow'
    }
    await fetch('http://192.168.1.20:8181/expense',requestOptions)
    .then((res)=>res.json())
    .then((result)=>{
      setTotal(result)
      alert('delete success')
      console.log('result',result)
    })
  } 


    return (
      <>
    <StatusBar barStyle={'dark-content'} backgroundColor={Color.LIGHT} />
      <SubmitIcon style={styles.add} onPress={addBtn}  antIconName='pluscircleo' size={50} color={Color.PRIMARY} />
      
      <View style={styles.box}>
            <Text style={{textAlign:'center',fontSize:20,marginVertical:20}}>Hello Candyman {time}</Text>
            {/* <TextInput style={styles.ipText} placeholder="Searching........."/> */}
      </View>
      {
       total === '' &&
        <View style={[StyleSheet.absoluteFillObject,styles.container]}>
          <Text style={{color:'lightgray',fontSize:40}}>Empty Records</Text>
        </View>
        }

     <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,alignSelf:'center'}}>
     <ScrollView showsVerticalScrollIndicator={false} style={{marginVertical:30}}>
          {
            total.map((item,index)=>{
              return(
                <Card key={index} index={index} delTotal={delTotal} name={item?.name} amount={item?.amount} onPress={addCategories} deleteCategory={deleteCategory} editeCategory={editeCategory} categories={item?.categories}/>
              )
            })
          }
      </ScrollView>
     </View>

    </>
  );
};

export default Note;
const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
    ipText :{
        width,
        borderWidth:1,
        padding:5,
        paddingHorizontal:10,
        borderRadius:50,
        borderColor:'lightgray',
        alignSelf:'center'
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        zIndex: -1
    },
    add:{
        position:'absolute',
        right:40,
        bottom: 100,
        zIndex:9999
    }

})
