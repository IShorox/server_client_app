import React from 'react';
import ReactDOM from 'react-dom';
import {TextFilter} from 'react-text-filter';
import {getPost} from '../fetch_post';


class Item extends React.Component {

  render() {
    return (<li>
                <div className='post'>
                    Comment id: {this.props.item.id} <br/> <br/>
                    Comment body: <br/> {this.props.item.body}
               </div>
            </li>);
  }
}


class List extends React.Component {

  render() {
    const Items = this.props.items.map(item => <Item key={item.id} item={item} />);

    return <ul>{Items}</ul>;
  }
}


const postFilter = filter => post => post.body.toLowerCase().indexOf(filter.toLowerCase()) !== -1;


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            posts: [],
            postId: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        var result = getPost(this.state.postId);
        event.preventDefault();
        this.setState({posts: result});
      }

    handleChange(event) {
        this.setState({postId: event.target.value});
    }

  render() {
    const filteredPosts = this.state.filter ?
        this.state.posts.filter(postFilter(this.state.filter)) :
        this.state.posts.slice(0);

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <label>
                Post Id:
             <input type="number" name="post_id" required onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Get Comments" />
        </form>
        <TextFilter onFilter={({target: {value: filter}}) => this.setState({filter})} />
        <List items={filteredPosts} />
      </div>
    );
  }
}

export default Main;