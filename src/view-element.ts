import React, { define, Component } from './react-mvx'
import ReactDOM from 'react-dom'
import { tools } from 'type-r'

const { notEqual } = tools;

export interface BackboneViewProps{
    View : any
    options : object
    className? : string
}

export default class BackboneView extends Component< BackboneViewProps, null >{
    shouldComponentUpdate( next ){
        var props = this.props;
        return next.View !== props.View || notEqual( next.options, props.options );
    }

    view : any

    hasUnsavedChanges(){
        var view = this.view;

        return view && (
            typeof view.hasUnsavedChanges === 'function' ? view.hasUnsavedChanges() : view.hasUnsavedChanges
        );
    }

    root : any;
    saveRef = element => {
        this.root = element;
    }

    render(){
        return React.createElement( 'div', {
            ref       : this.saveRef,
            className : this.props.className
        } );
    }

    componentDidMount(){
        this._mountView();
    }

    componentDidUpdate(){
        this._dispose();
        this._mountView();
    }

    componentWillUnmount(){
        this._dispose();
    }

    _mountView(){
        var el = this.root,
            p  = this.props;

        var view = this.view = p.options ? new p.View( p.options ) : new p.View();

        el.appendChild( view.el );
        view.render();
    }

    _dispose(){
        var view = this.view;
        if( view ){
            if( view.dispose ){
                view.dispose();
            }
            else{
                view.stopListening();
                view.off();
            }

            this.root.innerHTML = "";
            this.view  = null;
        }
    }
}