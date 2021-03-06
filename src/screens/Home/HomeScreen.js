import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Alert, Button } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { convertObToArr, getCategoryName, setAutoId } from '../../data/MockDataAPI';
import { connect } from 'react-redux';
import { setData } from '../../store/shop/products';
import App from '../../API/firebaseConfig';


const mapStateToProps=(state)=>{
  return {
    productsKeyInHome:state.products
  }
}

export default connect(mapStateToProps, {setData})(class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    
    headerRight: (
      
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state={data:null}
  }
  

  componentDidMount(){

    this.props.setData();
    //setAutoId('products')
  }
  
  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderProducts = ({ item }) => {
    item=Object.values(item)[0];
    return (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  )};

  render() {
    console.log('productsKeyInHome in home: ',this.props.productsKeyInHome);
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={2}
          data={ convertObToArr(this.props.productsKeyInHome)}
          renderItem={this.renderProducts}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
    );
  }
})
