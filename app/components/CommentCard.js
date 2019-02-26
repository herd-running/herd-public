import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Rating from './Rating'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteGroupComment, deleteRunComment } from '../actions/comments'

class CommentCard extends Component {
  constructor(props) {
    super(props)
  }

  deleteAlert = (commentId) => {
    Alert.alert(
      'Confirm',
      'Delete Comment',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => this.handleDeleteComment(commentId) }
      ]
    )
  }

  handleDeleteComment = (commentId) => {
    if (this.props.groupId) {
      this.props.deleteGroupComment(this.props.groupId, commentId)
    }

    else if (this.props.runId) {
      this.props.deleteRunComment(this.props.runId, commentId)
    }
  }

  render = () => {
    return (
      <Card title={this.props.title} containerStyle={{ minWidth: '100%' }}>
        <Rating rating={this.props.rating} size={15} />
        <Text style={{ marginTop: 5 }}>{this.props.comment}</Text>
        <Text style={{ marginTop: 10 }}>{`- ${this.props.first_name} ${this.props.last_name[0]}.`}</Text>
        <View style={{ alignItems: 'flex-end' }}>
          {this.props.user === this.props.user_id &&
            <Button
              title='Delete'
              type='outline'
              onPress={() => this.deleteAlert(this.props.id)}
              buttonStyle={{ borderColor: 'white', width: 100 }}
              titleStyle={{ fontSize: 16, color: 'red' }}
            />
          }
        </View>
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deleteGroupComment,
    deleteRunComment
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(CommentCard)
