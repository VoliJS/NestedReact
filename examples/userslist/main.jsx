import './main.css'
import ReactDOM from 'react-dom'

import React from 'nestedreact'
import { Model } from 'nestedtypes'

import Modal from 'react-modal'
import {Input, isRequired, isEmail } from 'tags'

const User = Model.extend({
    attributes : {
        name : String.has
                    .check( isRequired )
                    .check( x => x.indexOf( ' ' ) < 0, 'Spaces are not allowed' ),

        email : String.has
                      .check( isRequired )
                      .check( isEmail ),

        isActive : true
    }
});

export const UsersList = React.createClass( {
    state : {
        users   : User.Collection, // No comments required, isn't it?
        editing : User.from( 'users' ), // User from user collection, which is being edited.
        adding  : User.value( null ) // New user, which is being added.
    },

    render(){
        const { state } = this;

        return (
            <div>
                <button onClick={ () => state.adding = new User() }>
                    Add User
                </button>

                <Header/>

                { state.users.map( user => (
                    <UserRow key={ user.cid }
                             user={ user }
                             onEdit={ () => state.editing = user }
                    />
                ) )}

                <Modal isOpen={ state.adding }>
                    <EditUser user={ state.adding }
                              onClose={ this.addUser }/>
                </Modal>

                <Modal isOpen={ state.editing }>
                    <EditUser user={ state.editing }
                              onClose={ () => state.editing = null }/>
                </Modal>
            </div>
        );
    },

    addUser( user ){
        if( user ){
            const { state } = this;
            state.users.add( user );
            state.adding = null;
        }
    }
} );

const Header = () =>(
    <div className="users-row">
        <div>Name</div>
        <div>Email</div>
        <div>Is Active</div>
        <div/>
    </div>
);

const UserRow = ( { user, onEdit } ) =>(
    <div className="users-row" onDoubleClick={ onEdit }>
        <div>{ user.name }</div>
        <div>{ user.email }</div>
        <div onClick={ () => user.isActive = !user.isActive }>
            { user.isActive ? 'Yes' : 'No' }</div>
        <div>
            <button onClick={ onEdit }>Edit</button>
            <button onClick={ () => user.remove() }>X</button>
        </div>
    </div>
);

const EditUser = React.createClass( {
    props : {
        user    : User
        onClose : Function
    },

    state : {
        user : User
    },

    componentWillMount(){
        this.state.user = this.props.user.clone();
    },

    onSubmit( e ){
        e.preventDefault();

        const { user, onClose } = this.props;

        user.set( this.state.user.attributes );
        onClose( user );
    },

    onCancel(){
        this.props.onClose();
    },

    render(){
        const linked = this.state.linkAll( 'name', 'email', 'isActive' );

        return (
            <form onSubmit={ this.onSubmit }>
                <label>
                    Name: <ValidatedInput type="text" valueLink={ linked.name }/>
                </label>

                <label>
                    Email: <ValidatedInput type="text" valueLink={ linked.email }/>
                </label>

                <label>
                    Is active: <Input type="checkbox" checkedLink={ linked.isActive }/>
                </label>

                <button type="submit" disabled={ linked.name.error || linked.email.error }>
                    Save
                </button>
                <button type="button" onClick={ this.onCancel }>
                    Cancel
                </button>
            </form>
        );
    }
} );

const ValidatedInput = ( props ) => (
    <div>
        <Input { ...props } />
        <div className="validation-error">
            { props.valueLink.error || '' }
        </div>
    </div>
);

ReactDOM.render( <UsersList />, document.getElementById( 'app-mount-root' ) );
