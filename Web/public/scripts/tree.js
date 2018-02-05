import React, { Component } from 'react';
import SortableTree, { addNodeUnderParent, removeNodeAtPath,  
getFlatDataFromTree,getTreeFromFlatData, } from 'react-sortable-tree';
import ModalForm from './formshow/modal/modal';
import $ from 'jquery';
function loadSkillsFromServer() {
  console.log("Loading...");
  let dbData = [];
  $.ajax({
    async: false,
    url: '/api/skills',
    dataType: 'json',
    cache: false,
    success: function(data) {
      //set the state with the newly loaded data so the display will update
      dbData = data;
      //this.setState({initialData: data});
      console.log("Load Successful");
      console.log(dbData);
    }.bind(this),
    error: function(xhr, status, err) {
      console.error('/api/skills', status, err.toString());
    }.bind(this)
  });
  return dbData;
}

const initialData = loadSkillsFromServer();

export default class Tree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      treeData: getTreeFromFlatData({
        flatData: initialData.map(node => ({ ...node, title: node.Skill_Name })),
        getKey: node => node.idSkill, 
        getParentKey: node => node.Parent_Skill_ID, 
        rootKey: 0, 
      }),
    };
  }

  render() {
    const flatData = getFlatDataFromTree({
      treeData: this.state.treeData,
      getNodeKey: ({ node }) => node.idSkill,
      ignoreCollapsed: false,
    }).map(({ node, path }) => ({
      id: node.idSkill,
      name: node.Skill_Name,
      parent: path.length > 1 ? path[path.length - 2] : null,
    }));

    const getNodeKey = ({ treeIndex }) => treeIndex;
    return (
      <div>

        ↓treeData for this tree was generated from flat data similar to DB rows↓
        <div style={{ height: 1000 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            generateNodeProps = {({node, path}) => ({
              buttons: [
                <button bsStyle="primary" bsSize="small" onClick = {this.modal.handleShow}>
                  Add Skill
                </button>
              ]
            })}
          />
        </div>
        <hr />
        ↓This flat data is generated from the modified tree data↓
        <ul>
          {flatData.map(({ id, name, parent }) => (
            <li key={id}>
              id: {id}, name: {name}, parent: {parent || 'null'}
            </li>
          ))}
        </ul>
        <ModalForm ref = {(ref) => { this.modal = ref; }} />
      </div>
    );
  }
  
}