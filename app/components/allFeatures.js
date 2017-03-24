const ReactDataGrid = require('react-data-grid');
const React = require('react');
// const FakeObjectDataStore = require('./FakeObjectDataStore');
const {
  Editors:
    { AutoComplete: AutoCompleteEditor, DropDownEditor },
  Toolbar,
  Menu:
    { ContextMenu, MenuItem },
  Formatters:
    { ImageFormatter }} = require('react-data-grid-addons');
const faker = require('faker');
const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];
const operationTypes = ['Operation 1', 'Operation 2', 'Operation 3', 'Operation 4', 'Operation 5', 'Operation 6']
const DeleteFormatter = (props) => {
  return <button onClick={props.value}>Delete</button>
}
const Immutable = require('immutable');
const columns = [
  {
    key: 'id',
    name: 'Line Number',
    width: 140,
    resizable: true
  },
  {
    key: 'name',
    name: 'Name',
    width: 150,
    resizeable: true,
    editable:true
  },
  {
    key: 'operation',
    name: 'Operation Type',
    editor: <DropDownEditor options={operationTypes} />,
    width:200, 
    resizeable: true,
    editable:true
  },
  {
    key: 'width',
    name: 'Width',
    editable: true,
    width: 200,
    resizable: true
  },
  {
    key: 'height',
    name: 'Height',
    editable: true,
    width: 200,
    resizable: true
  },
  {
    key: 'count',
    name: 'Count',
    editable: true,
    width: 200,
    resizable: true
  },
  {
    key: 'notes',
    name: 'notes',
    editable: true,
    width: 180,
    resizable: true
  },
  {
    key: 'delete',
    name: 'Delete',
    width: 70,
    formatter: DeleteFormatter
  }
];

const MyContextMenu = React.createClass({
  propTypes: {
    rowIdx: React.PropTypes.number.isRequired,
    idx: React.PropTypes.number.isRequired
  },

    onItemClick() {
  },

  render() {
    return (
      <ContextMenu>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onItemClick}>{this.props.rowIdx},{this.props.idx}</MenuItem>
      </ContextMenu>
    );
  }
});

const Component = React.createClass({
  getInitialState() {
    const fakeRows = [];
    return { rows: Immutable.fromJS(fakeRows)};
  },

  handleGridRowsUpdated(e) {
    const { fromRow, toRow, updated } = e;
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      rows = rows.update(i, r => r.merge(updated));
    }

    if (this.props.handleCellDrag) {
      this.props.handleCellDrag(e);
    }

    this.setState({ rows });
  },

  handleAddRow({ newRowIndex }) {
    let lastElement = this.state.rows.get(-1);
    let lastId = lastElement ? lastElement.get('id') : 0
    console.log(lastElement, lastId)
    let newId = lastId + 1;
    const newRow = {
      id: newId,
      delete: () => {
        let index = newId;
        return this.handleDeleteRow(index)
      },
    };

    let rows = this.state.rows.slice();
    rows = rows.push(Immutable.fromJS(newRow));
    this.setState({ rows });
  },

  handleDeleteRow( rowIndex ) {
    console.log('this getting called', rowIndex)
    let rows = this.state.rows.filter( r => r.get('id')!== rowIndex);
    this.setState({ rows }) 
  },

  getRowAt(index) {
    if (index < 0 || index > this.getSize()) {
      return undefined;
    }
    return this.state.rows.get(index);
  },

  getSize() {
    return this.state.rows.size;
  },


  render() {
    return (
      <div>
      <ReactDataGrid
        contextMenu={<MyContextMenu />}
        ref="reactDataGrid"
        enableCellSelect={true}
        columns={columns}
        rowGetter={this.getRowAt}
        rowsCount={this.getSize()}
        onGridRowsUpdated={this.handleGridRowsUpdated}
        toolbar={<Toolbar onAddRow={this.handleAddRow} onToggleFilter={()=>{}} numberOfRows={this.getSize()}/>}
        rowHeight={50}
        minHeight={600}
        handleDeleteRow = { this.handleDeleteRow } />
      <button value="Submit" onClick={()=> this.state.rows.map(r =>console.log(r.get('id'), r.get('height'),r.get('width'),r.get('operation')))}>Submit</button>
      </div>
      );
  }
});

module.exports = Component;

// module.exports.Component = Component;