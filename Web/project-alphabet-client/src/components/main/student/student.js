import React, { Component } from 'react';
import SortableTree, { addNodeUnderParent, removeNodeAtPath,
getFlatDataFromTree,getTreeFromFlatData, } from 'react-sortable-tree';
import $ from 'jquery';
import Toggle from '../manage-skills/multi-toggle/toggle-student';

function loadSkillsFromServer() {
  console.log("Loading Skills...");
  let dbData = [];
  $.ajax({
    async: false,
    url: '/students/skills',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    dataType: 'json',
    cache: false,
    success: function(data) {
      //set the state with the newly loaded data so the display will update
      dbData = data;
      console.log("Load Skills Successful");
      //console.log(dbData);
    }.bind(this),
    error: function(xhr, status, err) {
      console.error('/students/skills', status, err.toString());
    }.bind(this)
  });
  return dbData;
}

function loadProgressFromServer() {
  console.log("Loading Progress...");
  let dbData = [];
  $.ajax({
    async: false,
    url: '/students/skill-progress',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    dataType: 'json',
    cache: false,
    success: function(data) {
      //set the state with the newly loaded data so the display will update
      dbData = data;
      console.log("Load Progress Successful");
      //console.log(dbData);
    }.bind(this),
    error: function(xhr, status, err) {
      console.error('/students/skill-progress', status, err.toString());
    }.bind(this)
  });
  return dbData;
}

const initialData = loadSkillsFromServer();
const progressData = loadProgressFromServer();

function search(skillID, progressData){
  var i;

  for(i = 0; i < progressData.length; i++) {

    if(progressData[i].Skill_Name === skillID) {

      return i;
    }

  }
  return -1;
}

console.log("Initial Data: " + JSON.stringify(initialData));

export default class StudentTree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      treeData: getTreeFromFlatData({
        flatData: initialData.map(node => ({ ...node, title: node.Skill_Name })),
        getKey: node => node.idSkill,
        getParentKey: node => node.Parent_Skill_ID,
        rootKey: 0,
      }),
      progress: progressData
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
      <div className = "tree">

        ↓treeData for this tree was generated from flat data similar to DB rows↓
        <div style={{ height: 1000 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            canDrag = {false}
            generateNodeProps = {({node, path}) => ({
              buttons: [
              //Add prop to set for parent_skill_id to the form.
              <Toggle id = {search(node.Skill_Name, this.state.progress)}/>
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
      </div>
    );
  }

}
