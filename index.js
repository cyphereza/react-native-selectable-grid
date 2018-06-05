import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const renderBox = (item = { label: 'something' }) => (
  <Text style={[{ color: 'white', fontSize: 20 }]}>{item.label}</Text>
);

class SelectableGrid extends Component {
  state = {
    selectedItem: -1,
    itemsArray: [],
    height: 0,
  };

  getIndex = (value, arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1; // to handle the case where the value doesn't exist
  };

  selectedData = () => {
    const { data, maxSelect } = this.props;
    const { itemsArray, selectedItem } = this.state;

    if (maxSelect === 1) {
      return data[selectedItem];
    } else if (maxSelect > 1) {
      const selectedDataArray = [];

      for (let i = 0; i < itemsArray.length; i += 1) {
        selectedDataArray.push(data[itemsArray[i]]);
      }

      return selectedDataArray;
    }
  };

  handleSelectItem = (keyValue) => {
    const { maxSelect, onSelect } = this.props;
    const { selectedItem, itemsArray } = this.state;

    if (maxSelect === 1) {
      this.setState({
        selectedItem: selectedItem === keyValue ? -1 : keyValue,
      });
      onSelect(selectedItem === keyValue ? -1 : keyValue);
    } else if (maxSelect > 1) {
      const newItemsArray = itemsArray;

      // Check if keyValue already exist in array
      const itemIndex =
        newItemsArray.length > 0 ? this.getIndex(keyValue, newItemsArray) : -1;

      // If item found in array
      if (itemIndex > -1) {
        newItemsArray.splice(itemIndex, 1);
      } else if (itemsArray.length < maxSelect) {
        newItemsArray.push(keyValue);
      }

      this.setState({ itemsArray: newItemsArray });
      onSelect(newItemsArray);
    }
  };

  render() {
    const {
      data,
      maxPerRow,
      unselectedRender,
      selectedRender,
      selectedStyle,
      unselectedStyle,
      height,
    } = this.props;
    const { selectedItem, itemsArray } = this.state;

    const content = [];
    for (let i = 0, counter = 0; i < data.length / maxPerRow; i++) {
      const row = [];
      for (let k = 0; k < maxPerRow; k++) {
        const keyValue = counter;
        if (counter < data.length) {
          row.push(
            <TouchableOpacity
              style={[
                styles.contentBox,
                unselectedStyle,
                (selectedItem === keyValue || itemsArray.includes(keyValue)) &&
                  selectedStyle,
                height == null ? { aspectRatio: 1 } : { height },
                {
                  flex: 1,
                },
              ]}
              onPress={() => this.handleSelectItem(keyValue)}
            >
              {selectedItem === keyValue || itemsArray.includes(keyValue)
                ? selectedRender(data[keyValue])
                : unselectedRender(data[keyValue])}
            </TouchableOpacity>,
          );
        } else {
          row.push(
            <View style={{ flex: 1, backgroundColor: 'transparent' }} />,
          );
        }
        counter++;
      }
      content.push(
        <View style={{ flexDirection: 'row', width: '100%', height: 100 }}>
          {row}
        </View>,
      );
    }

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{content}</View>
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
  onSelect: PropTypes.func,
  height: PropTypes.number,
};

SelectableGrid.defaultProps = {
  maxPerRow: 2,
  maxSelect: 1,
  unselectedRender: renderBox,
  selectedRender: renderBox,
  unselectedStyle: {},
  selectedStyle: styles.contentBoxSelected,
  height: null,
  onSelect: () => null,
};

export default SelectableGrid;
