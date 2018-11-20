import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

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
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
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
                            style={{flex: 1}}
                            onPress={() => props.toggleModal()}
                            />
                      </View>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(comments) {
    const formComments = comments.comments;

    const renderCommentItem = ({item, index}) => {

        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
                    readOnly
                    type="star"
                    imageSize={10}
                    style={{flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 5}}
                    startingValue={+item.rating}/>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    }

    return (
        <Card title="Comments">
        <FlatList
            data={formComments}
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
               userRating: 1,
               author: '',
               comment: '',
               showModal: false
           }
      }

      ratingCompleted(rating) {
        console.log("Rating is: ", rating);
        this.setState({userRating: rating});
      }

      toggleModal() {
        this.setState({showModal: !this.state.showModal});
     }

     resetForm() {
         this.setState({
           userRating: 1,
           author: '',
           comment: '',
           showModal: false
         });
     }

     onShowModal() {
       this.toggleModal();
       this.resetForm();
     }

    handleComment(dishId, rating, author, comment) {
        this.toggleModal();
        this.resetForm();
        this.props.postComment(dishId, rating, author, comment)
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
                   toggleModal={() => this.toggleModal()}
                   />
                 <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
               <Modal
                   animationType={"slide"}
                   transparent={false}
                   visible={this.state.showModal}
                   onDismiss={ () => this.onShowModal() }
                   onRequestClose={ () => this.onShowModal() }
                   >
                   <View style={styles.modal}>
                       <Rating
                           showRating
                           type="star"
                           fractions={0}
                           startingValue={this.state.userRating}
                           imageSize={40}
                           style={{ paddingVertical: 10 }}
                           onFinishRating={(rating) => this.setState({userRating: rating})}
                           />
                       <Input
                           placeholder="Author"
                           name="author"
                           type="text"
                           leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                           onChangeText={(text) => this.setState({author: text})}
                           value={this.state.author}
                           />
                       <Input
                           placeholder="Comment"
                           name="comment"
                           type="text"
                           leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                           onChangeText={(text) => this.setState({comment: text})}
                           value={this.state.comment}
                           />
                         <View style={{marginTop: 20}}>
                           <Button
                             onPress={() => this.handleComment(dishId, this.state.userRating, this.state.author, this.state.comment)}
                             title="Submit"
                             color="#512DA8"
                             style={{marginTop: 10}}
                             accessibilityLabel="Post your comment"
                           />
                       </View>
                       <View style={{marginTop: 20}}>
                           <Button
                           onPress={() => this.onShowModal()}
                           title="Dismiss"
                           color="#888"
                           accessibilityLabel="Dismiss modal"
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
