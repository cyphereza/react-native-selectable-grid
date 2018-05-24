# react-native-selectable-grid

![untitled](https://user-images.githubusercontent.com/31456191/40407438-095c5a06-5e97-11e8-8892-9e91ffade2de.gif)

Customizeable selectable (none, one or more) grid.

### Installation
1. Run: `npm install react-native-selectable-grid --save`

### Usage (Example)
```javascript
import React, { Component } from 'react';
import { View } from 'react-native';
import SelectableGrid from 'react-native-selectable-grid'

const fakeData = [{ a: '1' }, { a: '2' }, { a: '3' }, { a: '4' }, { a: '5' }];

class App extends Component {
  render() {
    return (
      <View>
        <SelectableGrid
          data={fakeData}
        />
      </View>
    );
  }
}
```

### Properties
|Prop|Type|Description|Default|
|----|----|-----------|-------|
|`data`|array|Receives array of data to be displayed|By default receives array of objects with 'a' key|
|`maxPerRow`|number|Maximum boxes per row (all boxes in grid will have the same width and height)|2|
|`maxSelect`|number|Number of selectable boxes (0 = non-selectable, 1 = only one is selectable, 2 = only two are selectable, so on and so forth)|1|
|`unselectedRender`|function|Custom component for unselected item|_None_|
|`selectedRender`|function|Custom component for selected item|_None_|
|`unselectedStyle`|style|Style for unselected boxes|_None_|
|`selectedStyle`|style|Style for selected boxes|_None_|

### Custom Render
E.g:
```javascript
unselectedRender={data => (
  <View>
    <Text style={{ color: 'red', fontSize: 35 }}>{data.a}</Text>
  </View>
)}
...
selectedRender={data => (
  <View>
    <Text style={{ color: 'blue', fontSize: 35 }}>{data.a}</Text>
  </View>
)}
```

### Retrieving Selected Data
You can use `ref` to retrieve selected data via `selectedData()` function. Below is an example on how to use `ref`.

```javascript
import SelectableGrid from 'react-native-selectable-grid';
...
<SelectableGrid
  data={fakeData}
  ref={(ref) => {
    this.sbRef = ref;
  }}
/>
...
<Button onPress={() => alert(this.sbRef.selectedData())}>
  <Text children={'Retrieve data'}>
</Button>
```
