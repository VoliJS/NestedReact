import React from 'nestedreact'
import { define } from 'nestedtypes'
import { Input } from 'valuelink/tags.jsx'

@define
class AddTodo extends React.Component {
    static props = {
        onEnter : Function.value( function(){} )
    }

    static state = {
        desc : String
    }

    render(){
        return (
            <header className="header">
                <h1>todos</h1>

                <Input className="new-todo" placeholder="What needs to be done?" autoFocus
                       valueLink={ this.state.getLink( 'desc' ) }
                       onKeyDown={ e => this.onKeyDown( e ) }
                />
            </header>
        );
    }

    onKeyDown( { keyCode } ){
        if( keyCode === 13 ){
            let { state, props } = this;

            state.desc && props.onEnter( state.desc );
            state.desc = "";
        }
    }
}

export default AddTodo;
