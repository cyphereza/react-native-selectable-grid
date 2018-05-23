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
|`maxPerRow`|number|Maximum boxes per row|2|
|`maxSelect`|number|Number of selectable boxes|1|
|`customRender`|function|Custom item (box) component|_None_|
|`unselectedStyle`|style|Style for unselected boxes|_None_|
|`selectedStyle`|style|Style for selected boxes|_None_|

### Custom Render
E.g:
```javascript
customRender={data => (
  <View>
    <Text style={{ color: 'red', fontSize: 35 }}>{data.a}</Text>
  </View>)}
```
