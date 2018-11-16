import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Rating, Input   } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {
    const dish = props.dish;
        if (dish != null) {
            return(
                <Card
                  featuredTitle={dish.name}
                  image={{uri: baseUrl + dish.image}}
                  >
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={ styles.cardRow}>
                        <Icon
                          raised
                          reverse
                          name={ props.favorite ? 'heart' : 'heart-o'}
                          type='font-awesome'
                          color='#f50'
                          style={{flex: 1}}
                          onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                          />
                          <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            style={ styles.cardItem }
                            onPress={() => props.onShowModal()}
                            />
                      </View>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {

        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
                    type="star"
                    fractions={0}
                    startingValue={+item.rating}/>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    }

    return (
        <Card title="Comments">
        <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component {

      constructor(props) {
          super(props);

          this.state = {
                 rating: 1,
                 author: '',
                 comment: '',
                 showModal: false
             }
      }

      toggleModal() {
        this.setState({showModal: !this.state.showModal});
     }

     handleSubmition() {
         console.log(JSON.stringify(this.state));
         this.toggleModal();
     }

     resetForm() {

         this.setState({
           rating: 1,
           author: '',
           comment: '',
           showModal: false
         });
     }

     onShowModal() {
       this.toggleModal();

     }

    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }


    static navigationOptions = {
        title: 'Dish Details'
    };

    render(){
        const dishId = this.props.navigation.getParam('dishId', '');

        return(
          <ScrollView>
               <RenderDish dish={this.props.dishes.dishes[+dishId]}
                   favorite={this.props.favorites.some(el => el === dishId)}
                   onPress={() => this.markFavorite(dishId)}
                   onShowModal={() => this.onShowModal()}
                   />
               <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                 <Modal animationType = {"slide"} transparent = {false}
                     visible = {this.state.showModal}
                     onDismiss = {() => {this.toggleModal();  this.resetForm()}}
                     onRequestClose = {() => {this.toggleModal(); this.resetForm()}}
                     >
                     <View >
                       <View style={{margin: 10}}>
                       <Rating
                              showRating
                              type="star"
                              fractions={0}
                              ratingTextColor="#f1c40f"
                              ratingColor='#f1c40f'
                              ratingBackgroundColor='#f1c40f'
                              startingValue={this.rating}
                            />
                          </View>
                      <View style={{margin: 10}}>
                         <Button
                             onPress = {() =>{this.toggleModal(); this.resetForm()}}
                             color="#512DA8"
                             title="SUBMIT"
                             />
                      </View>
                   </View>
                 </Modal>

           </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
      justifyContent: 'center',
      margin: 20
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: '#512DA8',
      textAlign: 'center',
      color: 'white',
      marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
