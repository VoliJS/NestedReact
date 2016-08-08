import './styles.css'
import React, { define } from 'nestedreact'
import ReactDOM from 'react-dom'
import { Checkbox, Input } from 'valuelink/tags'
import { ChecklistItem } from './model'

let _renders = 0;

@define
class App extends React.Component {
    static state = {
        items : ChecklistItem.Collection
    }

    render(){
        const { items } = this.state;

        return (
            <div>
                <div>Renders count: { _renders++ }
                    <button onClick={ () => items.add({}) }>
                        Add children
                    </button>
                </div>
                <List items={ items } />
            </div>
        );
    }
}

const List = ({ items }) => (
    <div className='children'>
        { items.map( item => (
            <Item key={ item.cid } model={ item } />
        ))}
    </div>
);

const Item = ({ model }) => {
    const links = model.linkAll( 'checked', 'name' );
    
    return (
        <div className='checklist'>
            <div className='header'>
                <Checkbox checkedLink={ links.checked }/>
                <Input valueLink={ links.name } />
                <button onClick={ () => model.remove() }>
                    Delete
                </button>
                <button onClick={ () => model.subitems.add({}) }>
                    Add children
                </button>
            </div>
            <List items={ model.subitems } />
        </div>
    );
}

ReactDOM.render( <App />, document.getElementById( 'app-mount-root' ) );