const faker = require('faker');
const ReactDataGrid = require('react-data-grid');
const React = require('react');
const { Editors, Toolbar, Formatters,
  Menu: { ContextMenu, MenuItem } } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { ImageFormatter } = Formatters;

const operationTypes = ['Operation 1', 'Operation 2', 'Operation 3', 'Operation 4', 'Operation 5', 'Operation 6'];
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


const DeleteFormatter = (props) => <button onClick={props.value}> Delete </button>

const Example = React.createClass({
  getInitialState() {
    return { rows: [] };
  },

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = React.addons.update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  },

  handleAddRow({ newRowIndex }) {
    const newRow = {
      value: newRowIndex
    };

    let rows = this.state.rows.slice();
    rows = rows.push(newRow);
    this.setState({ rows });
  },

  getRowAt(index) {
    if (index < 0 || index > this.getSize()) {
      return undefined;
    }

    return this.state.rows[index];
  },

  getSize() {
    return this.state.rows.length;
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

module.exports = Example;