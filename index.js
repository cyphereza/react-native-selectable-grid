import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const renderBox = (item = { a: 'something' }) => (
  <Text style={[{ color: 'white', fontSize: 20 }]}>{item.a}</Text>
);


class SelectableGrid extends Component {
  state = {
    selectedItem: -1,
    itemsArray: [],
    width: 0,
    height: 0,
  };

  onPageLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({ width, height });
  };

  getIndex = (value, arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1; // to handle the case where the value doesn't exist
  }

  selectedData = () => {
    const { data, maxSelect } = this.props;

    if (maxSelect === 1) {
      return data[this.state.selectedItem];
    } else if (maxSelect > 1) {
      const selectedDataArray = [];

      for (let i = 0; i < this.state.itemsArray.length; i += 1) {
        selectedDataArray.push(data[this.state.itemsArray[i]]);
      }

      return selectedDataArray;
    }
  };

  calculateBoxWidth = maxPerRow => (this.state.width / maxPerRow);

  handleSelectItem = (keyValue) => {
    const { maxSelect } = this.props;

    if (maxSelect === 1) {
      if (this.state.selectedItem === keyValue) {
        this.setState({ selectedItem: -1 });
      } else {
        this.setState({ selectedItem: keyValue });
      }
    } else if (maxSelect > 1) {
      const newItemsArray = this.state.itemsArray;

      // Check if keyValue already exist in array
      const itemIndex = newItemsArray.length > 0 ? this.getIndex(keyValue, newItemsArray) : -1;

      // If item found in array
      if (itemIndex > -1) {
        newItemsArray.splice(itemIndex, 1);
      } else if (this.state.itemsArray.length < maxSelect) {
        newItemsArray.push(keyValue);
      }

      this.setState({ itemsArray: newItemsArray });
    }
  }

  render() {
    const { data, maxPerRow, unselectedRender, selectedRender, selectedStyle, unselectedStyle } = this.props;
    const boxWidth = this.calculateBoxWidth(maxPerRow);
    let counter = 0;

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} onLayout={this.onPageLayout}>
        {data.map((i) => {
          const keyValue = counter;
          counter += 1;

          return (
            <TouchableOpacity style={[styles.contentBox, unselectedStyle, (this.state.selectedItem === keyValue || this.state.itemsArray.includes(keyValue)) && selectedStyle, { height: boxWidth, width: boxWidth }]} key={keyValue} onPress={() => this.handleSelectItem(keyValue)}>
              {(this.state.selectedItem === keyValue || this.state.itemsArray.includes(keyValue)) ? selectedRender(i) : unselectedRender(i)}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#adadad',
  },
  contentBoxSelected: {
    backgroundColor: '#ff6600',
  },
});

SelectableGrid.propTypes = {
  data: PropTypes.array.isRequired,
  maxPerRow: PropTypes.number,
  maxSelect: PropTypes.number,
  unselectedRender: PropTypes.func,
  selectedRender: PropTypes.func,
  unselectedStyle: PropTypes.any,
  selectedStyle: PropTypes.any,
};

SelectableGrid.defaultProps = {
  maxPerRow: 2,
  maxSelect: 1,
  unselectedRender: renderBox,
  selectedRender: renderBox,
  unselectedStyle: {},
  selectedStyle: styles.contentBoxSelected,
};

export default SelectableGrid;
