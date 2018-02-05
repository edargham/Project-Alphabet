import React, { Component } from 'react';
import SortableTree, { addNodeUnderParent, removeNodeAtPath,  getFlatDataFromTree,
    getTreeFromFlatData, } from 'react-sortable-tree';
import Tree from './tree';

class Load extends Component{
    
    constructor() {
        console.log("First");
        super();
        this.state = {
            dbData:[]
        };

    }

    loadSkillsFromServer() {
        console.log("Loading Data...");
        let ldData = [];
        $.ajax({
            url: '/api/skills',
            dataType: 'json',
            cache: false,
            success: function(data) {
                //set the state with the newly loaded data so the display will update
                this.setState({dbData: data});
                ldData = data;
                console.log("Loaded");
                console.log(this.state.dbData);
                console.log(ldData);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('/api/skills', status, err.toString());
            }.bind(this)
        });
        return ldData;
    }

    componentDidMount() {
        let data = [];
        //Once the component is fully loaded, we grab the skills
        data = this.loadSkillsFromServer.bind(this);
        //... and set an interval to continuously load new data:
        setInterval(this.loadSkillsFromServer.bind(this), this.props.pollInterval);
        return data;
    }

    render(){
        return (
            <Tree data = {this.loadSkillsFromServer.bind(this)}/>
        );
    }

}

export default Load;